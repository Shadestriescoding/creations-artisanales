import React from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.small};
`;

const FilterGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border: 2px solid ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.bodyFont};
  cursor: pointer;
  min-width: 200px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SearchInput = styled.input`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border: 2px solid ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.bodyFont};
  min-width: 300px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    min-width: 100%;
  }
`;

const PriceRange = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: center;
  
  input {
    width: 100px;
    padding: ${props => props.theme.spacing.sm};
    border: 2px solid ${props => props.theme.colors.backgroundAlt};
    border-radius: ${props => props.theme.borderRadius.medium};
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    
    input {
      width: 50%;
    }
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
  return (
    <FiltersContainer>
      <FilterGroup>
        <Select 
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

        <Select 
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default">Trier par...</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="name-asc">Nom A-Z</option>
          <option value="name-desc">Nom Z-A</option>
        </Select>

        <SearchInput
          type="text"
          placeholder="Rechercher un produit..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <PriceRange>
          <input
            type="number"
            placeholder="Prix min"
            value={priceRange.min}
            onChange={(e) => onPriceRangeChange({ 
              ...priceRange, 
              min: parseInt(e.target.value) || 0 
            })}
          />
          <span>à</span>
          <input
            type="number"
            placeholder="Prix max"
            value={priceRange.max}
            onChange={(e) => onPriceRangeChange({ 
              ...priceRange, 
              max: parseInt(e.target.value) || 0 
            })}
          />
          <span>€</span>
        </PriceRange>
      </FilterGroup>
    </FiltersContainer>
  );
};

export default ShopFilters; 