import React, { useState } from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: ${props => props.theme.spacing.xl};
  opacity: 0;
  transform: translateY(20px);
  animation: slideUpFade 0.6s ease-out forwards 0.3s;

  @keyframes slideUpFade {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
  }
`;

const FilterGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  align-items: start;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};

  label {
    font-weight: 500;
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.xs};
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.bodyFont};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SearchInput = styled.input`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.bodyFont};
  transition: ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }
`;

const PriceRangeContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: center;
`;

const PriceInput = styled.input`
  width: 100px;
  padding: ${props => props.theme.spacing.sm};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.bodyFont};
  transition: ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }
`;

const Separator = styled.span`
  color: ${props => props.theme.colors.textLight};
  font-weight: 500;
`;

const ResetButton = styled.button`
  background: none;
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-weight: 600;
  margin-top: ${props => props.theme.spacing.md};
  width: fit-content;
  align-self: flex-end;

  &:hover {
    background-color: ${props => props.theme.colors.primary}10;
    transform: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    align-self: center;
    width: 100%;
  }
`;

const ShopFilters = ({ 
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  priceRange,
  onPriceRangeChange
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const handlePriceChange = (type, value) => {
    const newRange = { ...localPriceRange, [type]: value };
    setLocalPriceRange(newRange);
    
    // Debounce the price range update
    const timer = setTimeout(() => {
      onPriceRangeChange(newRange);
    }, 500);

    return () => clearTimeout(timer);
  };

  const resetFilters = () => {
    onCategoryChange('all');
    onSortChange('default');
    onSearchChange('');
    setLocalPriceRange({ min: 0, max: 0 });
    onPriceRangeChange({ min: 0, max: 0 });
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    sortBy !== 'default' || 
    searchQuery !== '' || 
    priceRange.min > 0 || 
    priceRange.max > 0;

  return (
    <FiltersContainer>
      <FilterGroup>
        <FilterSection>
          <label htmlFor="category">Catégorie</label>
          <Select 
            id="category"
            value={selectedCategory} 
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">Toutes les catégories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </Select>
        </FilterSection>

        <FilterSection>
          <label htmlFor="sort">Trier par</label>
          <Select 
            id="sort"
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="default">Par défaut</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="name-asc">Nom A-Z</option>
            <option value="name-desc">Nom Z-A</option>
          </Select>
        </FilterSection>

        <FilterSection>
          <label htmlFor="search">Rechercher</label>
          <SearchInput
            id="search"
            type="text"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </FilterSection>

        <FilterSection>
          <label>Fourchette de prix</label>
          <PriceRangeContainer>
            <PriceInput
              type="number"
              min="0"
              placeholder="Min"
              value={localPriceRange.min || ''}
              onChange={(e) => handlePriceChange('min', parseInt(e.target.value) || 0)}
            />
            <Separator>à</Separator>
            <PriceInput
              type="number"
              min="0"
              placeholder="Max"
              value={localPriceRange.max || ''}
              onChange={(e) => handlePriceChange('max', parseInt(e.target.value) || 0)}
            />
            <Separator>€</Separator>
          </PriceRangeContainer>
        </FilterSection>
      </FilterGroup>

      {hasActiveFilters && (
        <ResetButton onClick={resetFilters}>
          Réinitialiser les filtres
        </ResetButton>
      )}
    </FiltersContainer>
  );
};

export default ShopFilters; 