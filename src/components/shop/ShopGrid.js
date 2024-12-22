import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LazyImage } from '../common/LazyImage';
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
  transition: ${props => props.theme.transitions.fast};
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.large};

    .product-image {
      transform: scale(1.05);
    }

    .quick-add {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  background-color: ${props => props.theme.colors.backgroundAlt};

  .product-image {
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
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: ${props => props.theme.typography.h4};
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  line-height: 1.4;
`;

const ProductPrice = styled.span`
  font-size: ${props => props.theme.typography.h5};
  color: ${props => props.theme.colors.primary};
  font-weight: 700;
`;

const ProductCategory = styled.span`
  font-size: ${props => props.theme.typography.small};
  color: ${props => props.theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const QuickAddButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md};
  border: none;
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: ${props => props.theme.typography.small};

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl} 0;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.h3};
  font-weight: 500;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const ShopGrid = ({ products, onProductClick, onAddToCart }) => {
  const { showToast } = useToast();

  if (!products || products.length === 0) {
    return (
      <NoResults>
        Aucun produit ne correspond à vos critères de recherche
      </NoResults>
    );
  }

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    onAddToCart(product);
    showToast('success', `${product.name} a été ajouté au panier`);
  };

  return (
    <Grid
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          variants={itemVariants}
          onClick={() => onProductClick(product)}
        >
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
            onClick={(e) => handleQuickAdd(e, product)}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
          </QuickAddButton>
        </ProductCard>
      ))}
    </Grid>
  );
};

export default ShopGrid; 