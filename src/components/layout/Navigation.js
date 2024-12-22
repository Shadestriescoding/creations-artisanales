import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
    position: fixed;
    top: ${props => props.theme.spacing.md};
    right: ${props => props.theme.spacing.md};
    z-index: 1001;
  }
`;

const MobileNav = styled.nav`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.colors.white};
    z-index: 1000;
    flex-direction: column;
    padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.xl};
    align-items: center;
    justify-content: center;
  }
`;

const MobileNavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-size: 1.2rem;
  padding: ${props => props.theme.spacing.md};
  width: 100%;
  text-align: center;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.backgroundAlt};
  }
`;

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <MobileMenuButton onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? '✕' : '☰'}
      </MobileMenuButton>

      <MobileNav isOpen={isMobileMenuOpen}>
        <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
          Accueil
        </MobileNavLink>
        <MobileNavLink to="/boutique" onClick={() => setIsMobileMenuOpen(false)}>
          Boutique
        </MobileNavLink>
        <MobileNavLink to="/a-propos" onClick={() => setIsMobileMenuOpen(false)}>
          À propos
        </MobileNavLink>
        <MobileNavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
          Contact
        </MobileNavLink>
        <MobileNavLink to="/panier" onClick={() => setIsMobileMenuOpen(false)}>
          Panier
        </MobileNavLink>
      </MobileNav>
    </>
  );
};

export default Navigation; 