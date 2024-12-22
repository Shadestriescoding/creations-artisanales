import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.small};
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  }
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.typography.titleFont};
  font-size: 1.8rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  z-index: 1001;
  
  span {
    font-size: 1rem;
    color: ${props => props.theme.colors.textLight};
    font-weight: 400;
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      display: none;
    }
  }
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.5rem;
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

const MobileNav = styled.nav`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.white};
  transform: translateY(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  padding-top: ${props => props.theme.spacing.xxxl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  transition: ${props => props.theme.transitions.fast};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
    transition: width 0.3s ease-in-out;
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    
    &::after {
      width: 100%;
    }
  }

  &.active {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
    
    &::after {
      width: 100%;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.2rem;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
    width: 100%;
    text-align: center;
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
  text-decoration: none;

  &:hover {
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.white};
    transform: translateY(-2px);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 80%;
    justify-content: center;
    margin-top: ${props => props.theme.spacing.lg};
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text};
  z-index: 1001;
  transition: ${props => props.theme.transitions.fast};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: none;
    transform: none;
  }
`;

const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out;
  z-index: 999;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          La Cabane d'Eva
          <span>Créations au crochet</span>
        </Logo>
        <Nav>
          <NavLink to="/" className={isActive('/') ? 'active' : ''}>
            Accueil
          </NavLink>
          <NavLink to="/boutique" className={isActive('/boutique') ? 'active' : ''}>
            Boutique
          </NavLink>
          <NavLink to="/a-propos" className={isActive('/a-propos') ? 'active' : ''}>
            À propos
          </NavLink>
          <NavLink to="/contact" className={isActive('/contact') ? 'active' : ''}>
            Contact
          </NavLink>
          <CartButton to="/panier">
            🛒 Panier
          </CartButton>
        </Nav>
        <MenuButton 
          onClick={toggleMenu} 
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isMenuOpen ? '✕' : '☰'}
        </MenuButton>
      </HeaderContent>

      <Overlay isOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />
      <MobileNav isOpen={isMenuOpen}>
        <NavLink to="/" className={isActive('/') ? 'active' : ''}>
          Accueil
        </NavLink>
        <NavLink to="/boutique" className={isActive('/boutique') ? 'active' : ''}>
          Boutique
        </NavLink>
        <NavLink to="/a-propos" className={isActive('/a-propos') ? 'active' : ''}>
          À propos
        </NavLink>
        <NavLink to="/contact" className={isActive('/contact') ? 'active' : ''}>
          Contact
        </NavLink>
        <CartButton to="/panier">
          🛒 Panier
        </CartButton>
      </MobileNav>
    </HeaderContainer>
  );
};

export default Header; 