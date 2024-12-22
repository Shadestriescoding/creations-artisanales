import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing.md};
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.large};
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 95%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.textLight};
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: scale(1.1);
  }
`;

const ProductDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ProductImage = styled.div`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const ProductInfo = styled.div`
  h2 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: 2rem;
  }
  
  .price {
    font-size: 1.5rem;
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
    margin-bottom: ${props => props.theme.spacing.lg};
  }
  
  .description {
    color: ${props => props.theme.colors.textLight};
    line-height: 1.8;
    margin-bottom: ${props => props.theme.spacing.xl};
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: ${props => props.theme.transitions.medium};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
    transform: none;
  }
`;

const StockStatus = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  font-weight: 500;
  
  &.in-stock {
    color: ${props => props.theme.colors.success};
  }
  
  &.out-of-stock {
    color: ${props => props.theme.colors.error};
  }
`;

const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <ProductDetails>
          <ProductImage>
            <img src={product.image} alt={product.name} />
          </ProductImage>
          
          <ProductInfo>
            <h2>{product.name}</h2>
            <div className="price">{product.price.toFixed(2)} €</div>
            
            <StockStatus className={product.inStock ? 'in-stock' : 'out-of-stock'}>
              {product.inStock ? '✓ En stock' : '× Rupture de stock'}
            </StockStatus>
            
            <div className="description">{product.description}</div>
            
            <AddToCartButton
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
            >
              🧶 {product.inStock ? 'Ajouter au panier' : 'Indisponible'}
            </AddToCartButton>
          </ProductInfo>
        </ProductDetails>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProductModal; 