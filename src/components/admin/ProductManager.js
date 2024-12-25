import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  Text,
  Button,
  Input,
  Flex,
  Spacer
} from '../common';
import styled from 'styled-components';

const ImagePreview = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Erreur lors de la récupération des produits');
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) formDataToSend.append(key, value);
      });

      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : '/api/products';
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend
      });

      if (!response.ok) throw new Error('Erreur lors de la sauvegarde du produit');

      await fetchProducts();
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: null
    });
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression du produit');

      await fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      image: null
    });
  };

  if (loading) return <Text>Chargement...</Text>;
  if (error) return <Text color="error">{error}</Text>;

  return (
    <Container>
      <Spacer size="xl" />
      <Text variant="h2" align="center">Gestion des Produits</Text>
      <Spacer size="xl" />

      <Card padding="large">
        <form onSubmit={handleSubmit}>
          <Grid columns={2} gap="medium">
            <Grid.Item span={2}>
              <Input
                label="Nom du produit"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid.Item>

            <Grid.Item span={2}>
              <Input
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                as="textarea"
              />
            </Grid.Item>

            <Grid.Item>
              <Input
                label="Prix"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Grid.Item>

            <Grid.Item>
              <Input
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                required
              />
            </Grid.Item>

            <Grid.Item span={2}>
              <Input
                label="Image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                required={!editingProduct}
              />
            </Grid.Item>

            <Grid.Item span={2}>
              <Flex justify="flex-end" gap="small">
                {editingProduct && (
                  <Button
                    variant="outline"
                    type="button"
                    onClick={resetForm}
                  >
                    Annuler
                  </Button>
                )}
                <Button type="submit">
                  {editingProduct ? 'Mettre à jour' : 'Ajouter'}
                </Button>
              </Flex>
            </Grid.Item>
          </Grid>
        </form>
      </Card>

      <Spacer size="xl" />

      <Grid columns={3} gap="large">
        {products.map(product => (
          <Grid.Item key={product._id}>
            <Card hoverable>
              <ImagePreview src={product.image} alt={product.name} />
              <Flex direction="column" padding={({ theme }) => theme.spacing.lg}>
                <Text variant="h5">{product.name}</Text>
                <Text variant="subtitle">{product.description}</Text>
                <Text>{product.price}€</Text>
                <Text>Stock: {product.stock}</Text>
                <Spacer size="sm" />
                <Flex gap="small">
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(product)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleDelete(product._id)}
                  >
                    Supprimer
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </Grid.Item>
        ))}
      </Grid>

      <Spacer size="xxxl" />
    </Container>
  );
};

export default ProductManager; 