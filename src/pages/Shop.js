import React, { useState } from 'react';
import { Container, Grid, Text, Flex, Button, Spacer } from '../components/common';
import ProductCard from '../components/shop/ProductCard';
import { products } from '../data/products';

const categories = [
  { id: 'all', name: 'Toutes les créations' },
  { id: 'deco', name: 'Décorations' },
  { id: 'jouets', name: 'Jouets' },
  { id: 'suspensions', name: 'Suspensions' }
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <Container>
      <Spacer size="xl" />
      <Text variant="h1" align="center">Notre Boutique</Text>
      <Text variant="subtitle" align="center">
        Découvrez nos créations artisanales faites avec amour
      </Text>
      <Spacer size="xl" />
      
      <Flex justify="center" gap="small">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'primary' : 'outline'}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </Flex>
      
      <Spacer size="xl" />
      
      <Grid columns={3} gap="large">
        {filteredProducts.map(product => (
          <Grid.Item
            key={product.id}
            span={1}
            tabletSpan={2}
            mobileSpan={4}
          >
            <ProductCard product={product} />
          </Grid.Item>
        ))}
      </Grid>
      
      <Spacer size="xxxl" />
    </Container>
  );
};

export default Shop;
