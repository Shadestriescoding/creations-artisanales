import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { productService, categoryService } from '../../services/api';

const ProductsContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const AddButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const FiltersBar = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.medium};
  min-width: 300px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}33;
  }
`;

const FilterSelect = styled.select`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: white;
  min-width: 200px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}33;
  }
`;

const ProductsTable = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: ${props => props.theme.spacing.md};
      text-align: left;
      border-bottom: 1px solid ${props => props.theme.colors.backgroundAlt};
    }
    
    th {
      background: ${props => props.theme.colors.backgroundAlt};
      font-weight: 600;
      color: ${props => props.theme.colors.text};
    }
    
    tr:hover {
      background: ${props => props.theme.colors.backgroundAlt}33;
    }
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.small};
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }
  
  &:not(:last-child) {
    margin-right: ${props => props.theme.spacing.xs};
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.large};
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  
  h2 {
    margin: 0;
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

const Form = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing.md};
`;

const FormGroup = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.xs};
  
  label {
    font-weight: 500;
    color: ${props => props.theme.colors.text};
  }
  
  input, textarea, select {
    padding: ${props => props.theme.spacing.sm};
    border: 1px solid ${props => props.theme.colors.backgroundAlt};
    border-radius: ${props => props.theme.borderRadius.medium};
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}33;
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const CategorySelect = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.sm};
`;

const CategoryOption = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.backgroundAlt}33;
  }
  
  &.selected {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary}11;
  }
  
  input[type="checkbox"] {
    margin: 0;
  }
`;

const SubcategoryList = styled.div`
  margin-left: ${props => props.theme.spacing.xl};
  display: grid;
  gap: ${props => props.theme.spacing.xs};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.lg};
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  
  ${props => props.primary ? `
    background: ${props.theme.colors.primary};
    color: white;
    border: none;
    
    &:hover {
      background: ${props.theme.colors.primaryDark};
    }
  ` : `
    background: white;
    color: ${props.theme.colors.text};
    border: 1px solid ${props.theme.colors.backgroundAlt};
    
    &:hover {
      border-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.primary};
    }
  `}
`;

const Badge = styled.span`
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.textLight};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.85rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

const StockIndicator = styled.span`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.85rem;
  font-weight: 500;
  
  ${props => {
    if (props.stock <= 0) {
      return `
        background: ${props.theme.colors.error}22;
        color: ${props.theme.colors.error};
      `;
    } else if (props.stock <= 5) {
      return `
        background: ${props.theme.colors.warning}22;
        color: ${props.theme.colors.warning};
      `;
    } else {
      return `
        background: ${props.theme.colors.success}22;
        color: ${props.theme.colors.success};
      `;
    }
  }}
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  border: 2px dashed ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  position: relative;
  overflow: hidden;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  .placeholder {
    color: ${props => props.theme.colors.textLight};
    text-align: center;
    padding: ${props => props.theme.spacing.md};
  }
`;

const ImageUploadButton = styled.button`
  background: none;
  border: 1px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.primary}11;
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${props => props.theme.borderRadius.small};
  object-fit: cover;
`;

export const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categories: [],
    image: null,
    imagePreview: null
  });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les produits et les catégories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productService.getAll(),
          categoryService.getAll()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrer les produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' ||
                           product.categories.some(cat => cat._id === categoryFilter);
    
    return matchesSearch && matchesCategory;
  });

  const handleOpenModal = (product = null) => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
        categories: product.categories.map(cat => cat._id),
        image: null,
        imagePreview: product.image
      });
      setEditingProduct(product);
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        categories: [],
        image: null,
        imagePreview: null
      });
      setEditingProduct(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      categories: [],
      image: null,
      imagePreview: null
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (editingProduct) {
        const updatedProduct = await productService.update(editingProduct._id, formData);
        setProducts(prev => prev.map(p => 
          p._id === editingProduct._id ? updatedProduct : p
        ));
      } else {
        const newProduct = await productService.create(formData);
        setProducts(prev => [...prev, newProduct]);
      }

      handleCloseModal();
    } catch (err) {
      setError(err.message || "Erreur lors de la sauvegarde du produit");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        setLoading(true);
        await productService.delete(productId);
        setProducts(prev => prev.filter(p => p._id !== productId));
      } catch (err) {
        setError(err.message || "Erreur lors de la suppression du produit");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCategoryChange = (categoryId) => {
    setFormData(prev => {
      const categories = prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId];
      return { ...prev, categories };
    });
  };

  const getStockLabel = (stock) => {
    if (stock <= 0) return "Rupture de stock";
    if (stock <= 5) return "Stock faible";
    return "En stock";
  };

  return (
    <ProductsContainer>
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <Header>
        <h1>Gestion des produits</h1>
        <AddButton onClick={() => handleOpenModal()}>
          ➕ Nouveau produit
        </AddButton>
      </Header>

      <FiltersBar>
        <SearchInput
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FilterSelect
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Toutes les catégories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </FilterSelect>
      </FiltersBar>

      <ProductsTable>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            Chargement...
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Catégories</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product._id}>
                  <td>
                    {product.image && (
                      <ProductImage 
                        src={`${process.env.REACT_APP_API_URL}${product.image}`} 
                        alt={product.name} 
                      />
                    )}
                  </td>
                  <td>
                    <div>{product.name}</div>
                    <div style={{ color: '#666', fontSize: '0.9em' }}>{product.description}</div>
                  </td>
                  <td>
                    {product.categories.map(cat => (
                      <Badge key={cat._id}>{cat.name}</Badge>
                    ))}
                  </td>
                  <td>{product.price.toFixed(2)}€</td>
                  <td>
                    <StockIndicator stock={product.stock}>
                      {getStockLabel(product.stock)} ({product.stock})
                    </StockIndicator>
                  </td>
                  <td>
                    <ActionButton onClick={() => handleOpenModal(product)}>
                      ✏️
                    </ActionButton>
                    <ActionButton onClick={() => handleDelete(product._id)}>
                      🗑️
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </ProductsTable>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h2>{editingProduct ? 'Modifier le produit' : 'Nouveau produit'}</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <label>Image du produit</label>
                <ImagePreview>
                  {formData.imagePreview ? (
                    <img 
                      src={formData.image instanceof File 
                        ? formData.imagePreview 
                        : `${process.env.REACT_APP_API_URL}${formData.imagePreview}`
                      } 
                      alt="Aperçu" 
                    />
                  ) : (
                    <div className="placeholder">
                      Glissez une image ici ou cliquez pour sélectionner
                    </div>
                  )}
                </ImagePreview>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="imageInput"
                />
                <ImageUploadButton type="button" onClick={() => document.getElementById('imageInput').click()}>
                  {formData.image ? 'Changer l\'image' : 'Ajouter une image'}
                </ImageUploadButton>
              </FormGroup>

              <FormGroup>
                <label>Nom du produit</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Donut fraise"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Décrivez votre produit..."
                />
              </FormGroup>

              <FormGroup>
                <label>Prix (€)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="15.99"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="10"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Catégories</label>
                <CategorySelect>
                  {categories.map(category => (
                    <div key={category._id}>
                      <CategoryOption 
                        className={formData.categories.includes(category._id) ? 'selected' : ''}
                        onClick={() => handleCategoryChange(category._id)}
                      >
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(category._id)}
                          onChange={() => {}}
                        />
                        {category.name}
                      </CategoryOption>
                      
                      {category.subCategories && category.subCategories.length > 0 && (
                        <SubcategoryList>
                          {category.subCategories.map(sub => (
                            <CategoryOption
                              key={sub._id}
                              className={formData.categories.includes(sub._id) ? 'selected' : ''}
                              onClick={() => handleCategoryChange(sub._id)}
                            >
                              <input
                                type="checkbox"
                                checked={formData.categories.includes(sub._id)}
                                onChange={() => {}}
                              />
                              {sub.name}
                            </CategoryOption>
                          ))}
                        </SubcategoryList>
                      )}
                    </div>
                  ))}
                </CategorySelect>
              </FormGroup>

              <ButtonGroup>
                <Button type="button" onClick={handleCloseModal}>
                  Annuler
                </Button>
                <Button type="submit" primary>
                  {editingProduct ? 'Enregistrer' : 'Créer'}
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </ProductsContainer>
  );
}; 