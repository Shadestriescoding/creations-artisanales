import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { FiShoppingBag, FiHeart, FiShare2 } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import LazyImage from '../components/common/LazyImage';

const ProductContainer = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xxl};
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  background-color: ${props => props.theme.colors.backgroundAlt};
`;

const MainImage = styled(motion.div)`
  aspect-ratio: 1;
  position: relative;
  cursor: zoom-in;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const Thumbnail = styled(motion.button)`
  width: 80px;
  height: 80px;
  border: 2px solid ${props =>
    props.active ? props.theme.colors.primary : 'transparent'};
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  background: none;
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: ${props => props.theme.colors.primary}80;
  }
`;

const ProductInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.titleFont};
  margin-bottom: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Price = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  font-family: ${props => props.theme.typography.titleFont};
`;

const Description = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.8;
  font-size: 1.1rem;
`;

const AddToCartButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  background: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primary}10;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ProductDetails = () => {
  const { productId } = useParams();
  const { addItem } = useCart();
  const { success } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);

  // Simuler les données du produit - à remplacer par un appel API
  const product = {
    id: productId,
    title: 'Amigurumi Lapin',
    price: '35€',
    description: 'Un adorable lapin en crochet fait main avec amour. Parfait pour décorer une chambre d\'enfant ou pour offrir en cadeau. Chaque pièce est unique et réalisée avec des matériaux de qualité.',
    images: [
      '/images/products/lapin-1.jpg',
      '/images/products/lapin-2.jpg',
      '/images/products/lapin-3.jpg'
    ]
  };

  const handleAddToCart = () => {
    addItem(product);
    success('Produit ajouté au panier !');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <ProductContainer>
      <ProductGrid>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <ImageContainer>
            <MainImage variants={itemVariants}>
              <LazyImage
                src={product.images[selectedImage]}
                alt={product.title}
                width={600}
                height={600}
              />
            </MainImage>
          </ImageContainer>
          <ThumbnailsContainer>
            {product.images.map((image, index) => (
              <Thumbnail
                key={index}
                onClick={() => setSelectedImage(index)}
                active={selectedImage === index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LazyImage
                  src={image}
                  alt={`${product.title} - Vue ${index + 1}`}
                  width={80}
                  height={80}
                />
              </Thumbnail>
            ))}
          </ThumbnailsContainer>
        </motion.div>

        <ProductInfo
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div>
            <Title variants={itemVariants}>{product.title}</Title>
            <Price variants={itemVariants}>{product.price}</Price>
          </div>
          <Description variants={itemVariants}>
            {product.description}
          </Description>
          <motion.div variants={itemVariants}>
            <AddToCartButton
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiShoppingBag /> Ajouter au panier
            </AddToCartButton>
          </motion.div>
          <ActionButtons>
            <ActionButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiHeart />
            </ActionButton>
            <ActionButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiShare2 />
            </ActionButton>
          </ActionButtons>
        </ProductInfo>
      </ProductGrid>
    </ProductContainer>
  );
};

export default ProductDetails; 