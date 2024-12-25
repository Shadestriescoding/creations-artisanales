import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: ${({ theme }) => theme.spacing.lg};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

const Logo = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.titleFont};
  font-size: 1.5em;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const NavLink = styled(Link)`
  color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: all 0.2s ease;
  background: ${({ active, theme }) =>
    active ? theme.colors.primary + '11' : 'transparent'};

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundAlt}33;
  }
`;

const Content = styled.main`
  background: ${({ theme }) => theme.colors.background};
`;

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const isActive = path => location.pathname === path;

  return (
    <LayoutContainer>
      <Sidebar>
        <Logo>La Cabane d'Eva</Logo>
        <Navigation>
          <NavLink to="/admin" active={isActive('/admin')}>
            Tableau de bord
          </NavLink>
          <NavLink to="/admin/products" active={isActive('/admin/products')}>
            Produits
          </NavLink>
          <NavLink to="/admin/categories" active={isActive('/admin/categories')}>
            Catégories
          </NavLink>
          <NavLink to="/admin/orders" active={isActive('/admin/orders')}>
            Commandes
          </NavLink>
          <NavLink to="/admin/customers" active={isActive('/admin/customers')}>
            Clients
          </NavLink>
          <NavLink to="/admin/stats" active={isActive('/admin/stats')}>
            Statistiques
          </NavLink>
          <NavLink to="/admin/settings" active={isActive('/admin/settings')}>
            Paramètres
          </NavLink>
        </Navigation>
      </Sidebar>
      <Content>{children}</Content>
    </LayoutContainer>
  );
};

export default AdminLayout;
