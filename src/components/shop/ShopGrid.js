import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import LazyImage from '../common/LazyImage';
import { useToast } from '../../contexts/ToastContext';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: ${props => props.theme.spacing.lg};
  }
`;

const ProductCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  cursor: pointer;
  position: relative;
  isolation: isolate;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: ${props => props.theme.shadows.large};
    transform: translateY(-4px);
    
    .quick-add {
      opacity: 1;
      transform: translateY(0);
    }

    .product-image {
      transform: scale(1.05);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  background-color: ${props => props.theme.colors.backgroundAlt};

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
`;

const ProductInfo = styled.div`
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  flex-grow: 1;
`;

const ProductCategory = styled.span`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ProductName = styled.h3`
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.titleFont};
  font-size: 1.1rem;
  margin: 0;
  line-height: 1.4;
`;

const ProductPrice = styled.div`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  font-size: 1.2rem;
  margin-top: auto;
`;

const QuickAddButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  padding: ${props => props.theme.spacing.md};
  font-weight: 600;
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
  }
`;

const StockBadge = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  background-color: ${props => props.inStock ? props.theme.colors.success : props.theme.colors.error};
  color: white;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 1;
`;

const ShopGrid = ({ products, onProductClick, onAddToCart }) => {
  const { addToast } = useToast();

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    if (product.inStock) {
      onAddToCart(product);
      addToast('Produit ajouté au panier', 'success');
    }
  };

  return (
    <Grid>
      {products.map(product => (
        <ProductCard
          key={product.id}
          onClick={() => onProductClick(product)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <StockBadge inStock={product.inStock}>
            {product.inStock ? 'En stock' : 'Rupture de stock'}
          </StockBadge>
          <ImageContainer>
            <LazyImage
              src={product.image}
              alt={product.name}
              className="product-image"
              placeholder="/images/placeholder.jpg"
            />
          </ImageContainer>
          <ProductInfo>
            <ProductCategory>{product.category}</ProductCategory>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price.toFixed(2)} €</ProductPrice>
          </ProductInfo>
          <QuickAddButton
            className="quick-add"
            onClick={e => handleQuickAdd(e, product)}
            disabled={!product.inStock}
          >
            {product.inStock ? '🛍️ Ajouter au panier' : 'Indisponible'}
          </QuickAddButton>
        </ProductCard>
      ))}
    </Grid>
  );
};

export default ShopGrid;
