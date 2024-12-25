import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { FiMenu, FiX, FiShoppingBag, FiUser } from 'react-icons/fi';

const HeaderWrapper = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.isScrolled ? props.theme.colors.white : 'transparent'};
  box-shadow: ${props => props.isScrolled ? props.theme.shadows.small : 'none'};
  transition: all 0.3s ease-in-out;
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
`;

const HeaderContainer = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  }
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.typography.titleFont};
  font-size: 1.8rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 700;
  letter-spacing: -0.5px;
  position: relative;
  z-index: 2;

  &:hover {
    color: ${props => props.theme.colors.primaryDark};
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover, &.active {
    color: ${props => props.theme.colors.primary};
    
    &::after {
      width: calc(100% - ${props => props.theme.spacing.md});
    }
  }
`;

const CartButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

const CartCount = styled(motion.span)`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${props => props.theme.colors.primary};
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
  }
`;

const MobileNav = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.xl};
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const MobileNavLink = styled(Link)`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  transition: all 0.3s ease;
  position: relative;
  width: 100%;
  text-align: center;

  &:hover, &.active {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.backgroundAlt};
    border-radius: ${props => props.theme.borderRadius.medium};
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const isActive = path => location.pathname === path;

  return (
    <HeaderWrapper
      isScrolled={isScrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeaderContainer>
        <Logo to="/">La Cabane d'Eva</Logo>
        
        <Nav>
          <NavLink to="/" className={isActive('/') ? 'active' : ''}>
            Accueil
          </NavLink>
          <NavLink to="/shop" className={isActive('/shop') ? 'active' : ''}>
            Boutique
          </NavLink>
          <NavLink to="/contact" className={isActive('/contact') ? 'active' : ''}>
            Contact
          </NavLink>
          <CartButton to="/cart">
            <FiShoppingBag size={20} />
            <AnimatePresence>
              {cartItemsCount > 0 && (
                <CartCount
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {cartItemsCount}
                </CartCount>
              )}
            </AnimatePresence>
          </CartButton>
        </Nav>

        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </MobileMenuButton>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileNav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <MobileNavLink
                to="/"
                className={isActive('/') ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accueil
              </MobileNavLink>
              <MobileNavLink
                to="/shop"
                className={isActive('/shop') ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Boutique
              </MobileNavLink>
              <MobileNavLink
                to="/contact"
                className={isActive('/contact') ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </MobileNavLink>
              <MobileNavLink
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Panier ({cartItemsCount})
              </MobileNavLink>
            </MobileNav>
          )}
        </AnimatePresence>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
