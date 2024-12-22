import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { ProductGallery } from '../components/ProductGallery';
import ShopFilters from '../components/shop/ShopFilters';

const ShopContainer = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
`;

const ShopHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
`;

// Données temporaires pour les tests
const tempProducts = [
  {
    id: 1,
    name: "Amigurumi Lapin Rose",
    price: 35.00,
    image: "/images/products/lapin-rose.jpg",
    category: "amigurumis",
    description: "Un adorable lapin rose au crochet, parfait pour décorer une chambre d'enfant.",
    inStock: true
  },
  {
    id: 2,
    name: "Guirlande Étoiles",
    price: 28.00,
    image: "/images/products/guirlande-etoiles.jpg",
    category: "decorations",
    description: "Une guirlande décorative composée d'étoiles au crochet.",
    inStock: true
  },
  {
    id: 3,
    name: "Panier de Rangement",
    price: 42.00,
    image: "/images/products/panier.jpg",
    category: "accessoires",
    description: "Un panier de rangement élégant et pratique au crochet.",
    inStock: false
  },
  // Ajoutez d'autres produits ici
];

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'all';

  const [products] = useState(tempProducts);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  const categories = [...new Set(products.map(product => product.category))];

  useEffect(() => {
    let result = [...products];

    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Filtre par prix
    if (priceRange.min > 0) {
      result = result.filter(product => product.price >= priceRange.min);
    }
    if (priceRange.max > 0) {
      result = result.filter(product => product.price <= priceRange.max);
    }

    // Tri
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

  const handleAddToCart = (product) => {
    console.log('Ajouter au panier:', product);
    // TODO: Implémenter l'ajout au panier
  };

  return (
    <ShopContainer>
      <ShopHeader>
        <Title>
          La <span>Boutique</span>
        </Title>
        <Subtitle>
          Découvrez mes créations uniques au crochet, faites main avec amour et passion
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

      <ProductGallery 
        products={filteredProducts}
        onAddToCart={handleAddToCart}
      />
    </ShopContainer>
  );
};

export default Shop; 