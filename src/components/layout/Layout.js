import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import ScrollToTop from '../common/ScrollToTop';
import { useCart } from '../../contexts/CartContext';
import { Cart } from '../Cart';
import { Notification } from '../Notification';

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const MainContent = styled.main`
    flex: 1;
    padding: 2rem;
    transition: opacity 0.3s ease;
    opacity: ${props => props.isTransitioning ? 0 : 1};
`;

const NavList = styled.ul`
    display: flex;
    gap: 2rem;
    list-style: none;
    padding: 1rem 2rem;
    margin: 0;
    background-color: ${props => props.theme.colors.primary};
`;

const NavLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-weight: 500;
    &:hover {
        text-decoration: underline;
    }
`;

const Layout = ({ title = 'La cabane d\'Eva', description = 'Créations artisanales au crochet', children }) => {
    const { isOpen: isCartOpen, toggleCart } = useCart();
    const [isPageTransitioning, setIsPageTransitioning] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsPageTransitioning(true);
        const timer = setTimeout(() => {
            setIsPageTransitioning(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [location]);

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Helmet>

            <LayoutWrapper>
                <nav>
                    <NavList>
                        <li><NavLink to='/'>Accueil</NavLink></li>
                        <li><NavLink to='/shop'>Boutique</NavLink></li>
                        <li><NavLink to='/contact'>Contact</NavLink></li>
                    </NavList>
                </nav>
                <MainContent isTransitioning={isPageTransitioning}>
                    <Outlet />
                    {children}
                </MainContent>
                <footer>
                    <p>&copy; 2023 La cabane d'Eva. Tous droits réservés.</p>
                </footer>
                <ScrollToTop />
                {isCartOpen && <Cart onClose={toggleCart} />}
                <Notification />
            </LayoutWrapper>
        </>
    );
};

export default Layout; 