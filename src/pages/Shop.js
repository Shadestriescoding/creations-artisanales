import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiShoppingBag, FiHeart } from 'react-icons/fi';
import LazyImage from '../components/common/LazyImage';

const ShopContainer = styled(motion.div)`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  }
`;

const ShopHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const ShopTitle = styled(motion.h1)`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-family: ${props => props.theme.typography.titleFont};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const ShopDescription = styled(motion.p)`
  color: ${props => props.theme.colors.textLight};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.backgroundAlt};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary}20;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const FiltersPanel = styled(motion.div)`
  background-color: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.large};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FilterGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};

  h3 {
    font-size: 1.1rem;
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.md};
    font-family: ${props => props.theme.typography.titleFont};
  }
`;

const FilterOptions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  flex-wrap: wrap;
`;

const FilterOption = styled(motion.button)`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.xl};
`;

const ProductCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const ProductImage = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${ProductCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ProductOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: ${props => props.theme.spacing.md};

  ${ProductCard}:hover & {
    opacity: 1;
  }
`;

const ProductActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ActionButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    transform: scale(1.1);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ProductInfo = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-family: ${props => props.theme.typography.titleFont};
`;

const ProductPrice = styled.div`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

const Shop = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const products = [
    {
      id: 1,
      title: 'Amigurumi Lapin',
      price: '35€',
      image: '/images/products/lapin.jpg',
      category: 'amigurumis'
    },
    {
      id: 2,
      title: 'Suspension Macramé',
      price: '45€',
      image: '/images/products/suspension.jpg',
      category: 'decorations'
    },
    {
      id: 3,
      title: 'Bonnet d\'hiver',
      price: '25€',
      image: '/images/products/bonnet.jpg',
      category: 'accessoires'
    }
  ];

  return (
    <ShopContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <ShopHeader>
        <ShopTitle variants={itemVariants}>
          Notre Boutique
        </ShopTitle>
        <ShopDescription variants={itemVariants}>
          Découvrez nos créations artisanales uniques, faites main avec amour et passion.
          Chaque pièce raconte une histoire et apporte une touche de douceur à votre intérieur.
        </ShopDescription>
      </ShopHeader>

      <FiltersContainer>
        <FilterButton
          onClick={() => setShowFilters(!showFilters)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showFilters ? <FiX /> : <FiFilter />}
          {showFilters ? 'Masquer les filtres' : 'Filtrer'}
        </FilterButton>
      </FiltersContainer>

      <AnimatePresence>
        {showFilters && (
          <FiltersPanel
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <FilterGroup>
              <h3>Catégories</h3>
              <FilterOptions>
                <FilterOption
                  active={selectedCategory === 'all'}
                  onClick={() => setSelectedCategory('all')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Tout
                </FilterOption>
                <FilterOption
                  active={selectedCategory === 'amigurumis'}
                  onClick={() => setSelectedCategory('amigurumis')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Amigurumis
                </FilterOption>
                <FilterOption
                  active={selectedCategory === 'decorations'}
                  onClick={() => setSelectedCategory('decorations')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Décorations
                </FilterOption>
                <FilterOption
                  active={selectedCategory === 'accessoires'}
                  onClick={() => setSelectedCategory('accessoires')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Accessoires
                </FilterOption>
              </FilterOptions>
            </FilterGroup>

            <FilterGroup>
              <h3>Prix</h3>
              <FilterOptions>
                <FilterOption
                  active={selectedPrice === 'all'}
                  onClick={() => setSelectedPrice('all')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Tout
                </FilterOption>
                <FilterOption
                  active={selectedPrice === 'under25'}
                  onClick={() => setSelectedPrice('under25')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Moins de 25€
                </FilterOption>
                <FilterOption
                  active={selectedPrice === '25to50'}
                  onClick={() => setSelectedPrice('25to50')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  25€ - 50€
                </FilterOption>
                <FilterOption
                  active={selectedPrice === 'over50'}
                  onClick={() => setSelectedPrice('over50')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Plus de 50€
                </FilterOption>
              </FilterOptions>
            </FilterGroup>
          </FiltersPanel>
        )}
      </AnimatePresence>

      <ProductsGrid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            variants={itemVariants}
          >
            <ProductImage>
              <LazyImage
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
              />
              <ProductOverlay>
                <ProductActions>
                  <ActionButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiShoppingBag />
                  </ActionButton>
                  <ActionButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiHeart />
                  </ActionButton>
                </ProductActions>
              </ProductOverlay>
            </ProductImage>
            <ProductInfo>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductPrice>{product.price}</ProductPrice>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductsGrid>
    </ShopContainer>
  );
};

export default Shop;
