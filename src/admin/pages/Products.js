import React, { useState } from 'react';
import styled from 'styled-components';

const ProductsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.titleFont};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ProductCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ProductTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ProductStatus = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.9em;
  background: ${({ status, theme }) => {
    switch (status) {
      case 'in_stock':
        return theme.colors.success + '33';
      case 'low_stock':
        return theme.colors.warning + '33';
      case 'out_of_stock':
        return theme.colors.error + '33';
      default:
        return theme.colors.backgroundAlt;
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case 'in_stock':
        return theme.colors.success;
      case 'low_stock':
        return theme.colors.warning;
      case 'out_of_stock':
        return theme.colors.error;
      default:
        return theme.colors.text;
    }
  }};
`;

const ProductDetails = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ProductInfo = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin: ${({ theme }) => theme.spacing.xs} 0;
  font-size: 0.9em;
`;

const Products = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'Collier en perles',
      category: 'Colliers',
      price: '49.99€',
      status: 'in_stock',
      stock: 15,
      sales: 25
    },
    {
      id: 2,
      name: 'Bracelet tressé',
      category: 'Bracelets',
      price: '29.99€',
      status: 'low_stock',
      stock: 3,
      sales: 18
    },
    {
      id: 3,
      name: 'Boucles d\'oreilles fleurs',
      category: 'Boucles d\'oreilles',
      price: '39.99€',
      status: 'out_of_stock',
      stock: 0,
      sales: 12
    }
  ]);

  const getStatusLabel = status => {
    switch (status) {
      case 'in_stock':
        return 'En stock';
      case 'low_stock':
        return 'Stock faible';
      case 'out_of_stock':
        return 'Rupture de stock';
      default:
        return status;
    }
  };

  return (
    <ProductsContainer>
      <Title>Gestion des produits</Title>
      <ProductsGrid>
        {products.map(product => (
          <ProductCard key={product.id}>
            <ProductHeader>
              <ProductTitle>{product.name}</ProductTitle>
              <ProductStatus status={product.status}>
                {getStatusLabel(product.status)}
              </ProductStatus>
            </ProductHeader>
            <ProductDetails>
              <ProductInfo>Catégorie: {product.category}</ProductInfo>
              <ProductInfo>Prix: {product.price}</ProductInfo>
              <ProductInfo>Stock: {product.stock}</ProductInfo>
              <ProductInfo>Ventes: {product.sales}</ProductInfo>
            </ProductDetails>
          </ProductCard>
        ))}
      </ProductsGrid>
    </ProductsContainer>
  );
};

export default Products;
