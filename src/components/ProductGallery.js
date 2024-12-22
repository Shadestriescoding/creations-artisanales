import React, { useState } from 'react';
import styled from 'styled-components';
import ProductModal from './shop/ProductModal';

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.xl} 0;
  max-width: ${props => props.theme.container.maxWidth};
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
  cursor: pointer;
  
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
`;

const ProductName = styled.h3`
  font-size: ${props => props.theme.typography.h3.fontSize};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-family: ${props => props.theme.typography.titleFont};
`;

const ProductDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
  margin-bottom: ${props => props.theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceTag = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: ${props => props.theme.colors.accent};
  margin-bottom: ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.typography.titleFont};
`;

const StockBadge = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 1;
  
  &.in-stock {
    background-color: ${props => props.theme.colors.success}20;
    color: ${props => props.theme.colors.success};
  }
  
  &.out-of-stock {
    background-color: ${props => props.theme.colors.error}20;
    color: ${props => props.theme.colors.error};
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: ${props => props.theme.transitions.medium};
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};

  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
  }
`;

const NoProductsMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textLight};
  font-style: italic;
  grid-column: 1 / -1;
  font-size: ${props => props.theme.typography.h3.fontSize};
`;

export const ProductGallery = ({ products, onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <GalleryContainer>
        {products.length === 0 ? (
          <NoProductsMessage>
            Aucun produit ne correspond à vos critères
          </NoProductsMessage>
        ) : (
          products.map(product => (
            <ProductCard key={product.id} onClick={() => handleProductClick(product)}>
              <StockBadge className={product.inStock ? 'in-stock' : 'out-of-stock'}>
                {product.inStock ? 'En stock' : 'Rupture de stock'}
              </StockBadge>
              
              <ProductImage>
                <img src={product.image} alt={product.name} loading="lazy" />
              </ProductImage>
              
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description}</ProductDescription>
                <PriceTag>{product.price.toFixed(2)} €</PriceTag>
                <AddToCartButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  disabled={!product.inStock}
                >
                  🧶 {product.inStock ? 'Ajouter au panier' : 'Indisponible'}
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))
        )}
      </GalleryContainer>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
}; 