import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.small};
  padding: ${props => props.theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.typography.titleFont};
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  span {
    font-size: 1.2rem;
    color: ${props => props.theme.colors.textLight};
    font-weight: 400;
  }
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.backgroundAlt};
  }

  &.active {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }
`;

const CartButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.white};
    transform: translateY(-2px);
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          La Cabane d'Eva
          <span>Créations au crochet</span>
        </Logo>
        <Nav>
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/boutique">Boutique</NavLink>
          <NavLink to="/a-propos">À propos</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <CartButton to="/panier">
            🛒 Panier
          </CartButton>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 