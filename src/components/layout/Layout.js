import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { FiShoppingBag, FiInstagram, FiFacebook } from 'react-icons/fi';

import ScrollToTop from '../common/ScrollToTop';
import { useCart } from '../../contexts/CartContext';
import { Cart } from '../Cart';
import { Notification } from '../Notification';
import { Container, Flex, Text, Spacer } from '../common';

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: ${props => props.theme.colors.background};
`;

const Header = styled.header`
    background-color: ${props => props.theme.colors.surface};
    box-shadow: ${props => props.theme.shadows.small};
    position: sticky;
    top: 0;
    z-index: 1000;
`;

const Logo = styled(Link)`
    font-family: ${props => props.theme.typography.titleFont};
    font-size: 1.8rem;
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: ${props => props.theme.transitions.fast};
    
    &:hover {
        color: ${props => props.theme.colors.primaryDark};
    }
`;

const NavList = styled.ul`
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const NavLink = styled(Link)`
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: ${props => props.theme.borderRadius.medium};
    transition: ${props => props.theme.transitions.fast};

    &:hover {
        background-color: ${props => props.theme.colors.primaryLight};
        color: ${props => props.theme.colors.primary};
    }

    &.active {
        background-color: ${props => props.theme.colors.primary};
        color: white;
    }
`;

const CartButton = styled.button`
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    position: relative;
    color: ${props => props.theme.colors.text};
    transition: ${props => props.theme.transitions.fast};

    &:hover {
        color: ${props => props.theme.colors.primary};
    }

    svg {
        font-size: 1.5rem;
    }
`;

const CartCount = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border-radius: 50%;
    padding: 0.2rem 0.5rem;
    font-size: 0.75rem;
    font-weight: bold;
`;

const MainContent = styled.main`
    flex: 1;
    padding: ${props => props.theme.spacing.xl} 0;
    transition: opacity 0.3s ease;
    opacity: ${props => props.isTransitioning ? 0 : 1};
`;

const Footer = styled.footer`
    background-color: ${props => props.theme.colors.surface};
    padding: ${props => props.theme.spacing.xl} 0;
    margin-top: ${props => props.theme.spacing.xxxl};
`;

const SocialLink = styled.a`
    color: ${props => props.theme.colors.text};
    font-size: 1.5rem;
    transition: ${props => props.theme.transitions.fast};
    
    &:hover {
        color: ${props => props.theme.colors.primary};
    }
`;

const Layout = ({ title = 'La cabane d\'Eva', description = 'Créations artisanales au crochet', children }) => {
    const { isOpen: isCartOpen, toggleCart, cartItems } = useCart();
    const [isPageTransitioning, setIsPageTransitioning] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsPageTransitioning(true);
        const timer = setTimeout(() => {
            setIsPageTransitioning(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [location]);

    const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
                <link href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap' rel='stylesheet' />
            </Helmet>

            <LayoutWrapper>
                <Header>
                    <Container>
                        <Flex justify='space-between' align='center' padding='md'>
                            <Logo to='/'>La Cabane d'Eva</Logo>
                            <nav>
                                <NavList>
                                    <li><NavLink to='/' className={location.pathname === '/' ? 'active' : ''}>Accueil</NavLink></li>
                                    <li><NavLink to='/shop' className={location.pathname === '/shop' ? 'active' : ''}>Boutique</NavLink></li>
                                    <li><NavLink to='/contact' className={location.pathname === '/contact' ? 'active' : ''}>Contact</NavLink></li>
                                    <li>
                                        <CartButton onClick={toggleCart}>
                                            <FiShoppingBag />
                                            {cartItemsCount > 0 && <CartCount>{cartItemsCount}</CartCount>}
                                        </CartButton>
                                    </li>
                                </NavList>
                            </nav>
                        </Flex>
                    </Container>
                </Header>

                <MainContent isTransitioning={isPageTransitioning}>
                    <Outlet />
                    {children}
                </MainContent>

                <Footer>
                    <Container>
                        <Flex direction='column' align='center' gap='xl'>
                            <Logo to='/'>La Cabane d'Eva</Logo>
                            <Text variant='subtitle' align='center' style={{ maxWidth: '600px' }}>
                                Créations artisanales au crochet, faites avec amour et passion.
                                Chaque pièce est unique et raconte une histoire.
                            </Text>
                            <Flex gap='lg'>
                                <SocialLink href='https://instagram.com/lacabanedeva' target='_blank' rel='noopener noreferrer'>
                                    <FiInstagram />
                                </SocialLink>
                                <SocialLink href='https://facebook.com/lacabanedeva' target='_blank' rel='noopener noreferrer'>
                                    <FiFacebook />
                                </SocialLink>
                            </Flex>
                            <Spacer size='lg' />
                            <Text variant='small' color='textLight'>
                                &copy; {new Date().getFullYear()} La Cabane d'Eva. Tous droits réservés.
                            </Text>
                        </Flex>
                    </Container>
                </Footer>

                <ScrollToTop />
                {isCartOpen && <Cart onClose={toggleCart} />}
                <Notification />
            </LayoutWrapper>
        </>
    );
};

export default Layout; 