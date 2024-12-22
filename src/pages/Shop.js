import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ShopFilters from '../components/shop/ShopFilters';
import ShopGrid from '../components/shop/ShopGrid';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ShopContainer = styled.div`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  }
`;

const ShopHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.h1};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.typography.h4};
  color: ${props => props.theme.colors.textLight};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.h3};
`;

// Simulated product data - replace with actual API call
const PRODUCTS = [
  {
    id: 1,
    name: "Bougie Lavande",
    category: "bougies",
    price: 24.99,
    image: "/images/products/bougie-lavande.jpg",
    inStock: true
  },
  {
    id: 2,
    name: "Diffuseur d'Huiles Essentielles",
    category: "diffuseurs",
    price: 49.99,
    image: "/images/products/diffuseur.jpg",
    inStock: true
  },
  // Add more products...
];

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Simulate API call
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(PRODUCTS);
        setFilteredProducts(PRODUCTS);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Apply price range filter
    if (priceRange.min > 0 || priceRange.max > 0) {
      result = result.filter(product => {
        if (priceRange.min > 0 && product.price < priceRange.min) return false;
        if (priceRange.max > 0 && product.price > priceRange.max) return false;
        return true;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, sortBy, searchQuery, priceRange]);

  const handleProductClick = (product) => {
    navigate(`/shop/product/${product.id}`);
  };

  const categories = [...new Set(products.map(product => product.category))];

  if (loading) {
    return (
      <ShopContainer>
        <LoadingContainer>
          Chargement des produits...
        </LoadingContainer>
      </ShopContainer>
    );
  }

  return (
    <ShopContainer>
      <ShopHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Notre Boutique</Title>
        <Subtitle>
          Découvrez notre sélection de produits artisanaux pour créer une ambiance chaleureuse et apaisante chez vous
        </Subtitle>
      </ShopHeader>

      <ShopFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
      />

      <ShopGrid
        products={filteredProducts}
        onProductClick={handleProductClick}
        onAddToCart={addToCart}
      />
    </ShopContainer>
  );
};

export default Shop; 