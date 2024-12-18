import React, { useState } from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.xl};
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    padding: ${props => props.theme.spacing.md};
    gap: ${props => props.theme.spacing.lg};
  }
`;

const ProductCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.small};
  transition: ${props => props.theme.transitions.medium};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.hover};
  }
`;

const ProductImage = styled.div`
  position: relative;
  padding-top: 100%; // Aspect ratio 1:1
  background-color: ${props => props.theme.colors.backgroundAlt};
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 70%,
      rgba(0,0,0,0.1) 100%
    );
  }
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: ${props => props.theme.transitions.medium};
  }
  
  ${ProductCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: linear-gradient(
    to bottom,
    ${props => props.theme.colors.white} 0%,
    ${props => props.theme.colors.backgroundAlt} 100%
  );
  
  h3 {
    font-size: ${props => props.theme.typography.h3.fontSize};
    color: ${props => props.theme.colors.text};
    line-height: 1.4;
    margin-bottom: ${props => props.theme.spacing.sm};
    font-family: ${props => props.theme.typography.titleFont};
  }
`;

const PriceTag = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: ${props => props.theme.colors.accent};
  margin-bottom: ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.typography.titleFont};
`;

const FilterSection = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin: ${props => props.theme.spacing.xl} auto;
  padding: 0 ${props => props.theme.spacing.xl};
  flex-wrap: wrap;
  justify-content: center;
  max-width: ${props => props.theme.breakpoints.wide};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    padding: 0 ${props => props.theme.spacing.md};
    gap: ${props => props.theme.spacing.sm};
  }
  
  select {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
    border-radius: ${props => props.theme.borderRadius.medium};
    border: 2px solid ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.white};
    cursor: pointer;
    min-width: 200px;
    font-size: ${props => props.theme.typography.body.fontSize};
    color: ${props => props.theme.colors.text};
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
    padding-right: 2.5rem;
    transition: ${props => props.theme.transitions.fast};
    
    &:hover {
      border-color: ${props => props.theme.colors.accent};
      background-color: ${props => props.theme.colors.backgroundAlt};
    }
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.accent};
      box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}33;
    }
  }
`;

const AddToCartButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: ${props => props.theme.transitions.medium};
  font-weight: 600;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  margin-top: auto;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: '🛒';
    font-size: 1.1rem;
  }
`;

const NoProductsMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textLight};
  font-style: italic;
  grid-column: 1 / -1;
  font-size: ${props => props.theme.typography.h3.fontSize};
  font-family: ${props => props.theme.typography.titleFont};
`;

export const ProductGallery = ({ products, onAddToCart }) => {
  const [sortBy, setSortBy] = useState('default');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', ...new Set(products.map(product => product.category))];

  const filteredProducts = products
    .filter(product => filterCategory === 'all' || product.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <>
      <FilterSection>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="default">Trier par...</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
        </select>
        
        <select 
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'Toutes les catégories' : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </FilterSection>

      <GalleryContainer>
        {filteredProducts.length === 0 ? (
          <NoProductsMessage>
            Aucun produit ne correspond à vos critères
          </NoProductsMessage>
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product.id}>
              <ProductImage>
                <img src={product.image} alt={product.name} loading="lazy" />
              </ProductImage>
              <ProductInfo>
                <h3>{product.name}</h3>
                <PriceTag>{product.price.toFixed(2)}€</PriceTag>
                <AddToCartButton onClick={() => onAddToCart(product)}>
                  Ajouter au panier
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))
        )}
      </GalleryContainer>
    </>
  );
}; 