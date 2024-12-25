import React, { useState } from 'react';
import styled from 'styled-components';

const CategoriesContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.titleFont};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CategoryCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CategoryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const CategoryStatus = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.9em;
  background: ${({ active, theme }) =>
    active ? theme.colors.success + '33' : theme.colors.error + '33'};
  color: ${({ active, theme }) =>
    active ? theme.colors.success : theme.colors.error};
`;

const CategoryDetails = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CategoryInfo = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin: ${({ theme }) => theme.spacing.xs} 0;
  font-size: 0.9em;
`;

const Categories = () => {
  const [categories] = useState([
    {
      id: 1,
      name: 'Colliers',
      description: 'Colliers artisanaux en perles et pierres naturelles',
      active: true,
      products: 15,
      totalSales: '749.99€'
    },
    {
      id: 2,
      name: 'Bracelets',
      description: 'Bracelets tressés et bracelets en perles',
      active: true,
      products: 12,
      totalSales: '599.99€'
    },
    {
      id: 3,
      name: 'Boucles d\'oreilles',
      description: 'Boucles d\'oreilles artisanales',
      active: false,
      products: 8,
      totalSales: '399.99€'
    }
  ]);

  return (
    <CategoriesContainer>
      <Title>Gestion des catégories</Title>
      <CategoriesGrid>
        {categories.map(category => (
          <CategoryCard key={category.id}>
            <CategoryHeader>
              <CategoryTitle>{category.name}</CategoryTitle>
              <CategoryStatus active={category.active}>
                {category.active ? 'Active' : 'Inactive'}
              </CategoryStatus>
            </CategoryHeader>
            <CategoryDetails>
              <CategoryInfo>Description: {category.description}</CategoryInfo>
              <CategoryInfo>Produits: {category.products}</CategoryInfo>
              <CategoryInfo>Ventes totales: {category.totalSales}</CategoryInfo>
            </CategoryDetails>
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </CategoriesContainer>
  );
};

export default Categories;

