import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  width: 250px;
  background: ${props => props.theme.colors.white};
  border-right: 1px solid ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.spacing.lg} 0;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
`;

const Logo = styled.div`
  padding: 0 ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  h1 {
    font-family: ${props => props.theme.typography.titleFont};
    font-size: 1.5rem;
    color: ${props => props.theme.colors.primary};
    margin: 0;
  }
`;

const NavMenu = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  transition: ${props => props.theme.transitions.fast};
  background: ${props => props.active ? props.theme.colors.backgroundAlt : 'transparent'};
  border-left: 3px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  
  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};
  }
  
  svg {
    margin-right: ${props => props.theme.spacing.sm};
    width: 20px;
    height: 20px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.small};
`;

const PageTitle = styled.h1`
  font-size: ${props => props.theme.typography.h2.fontSize};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  
  span {
    color: ${props => props.theme.colors.text};
    font-weight: 500;
  }
`;

export const AdminLayout = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Produits', icon: '🏷️' },
    { path: '/admin/categories', label: 'Catégories', icon: '📁' },
    { path: '/admin/orders', label: 'Commandes', icon: '📦' },
    { path: '/admin/customers', label: 'Clients', icon: '👥' },
    { path: '/admin/stats', label: 'Statistiques', icon: '📈' },
    { path: '/admin/settings', label: 'Paramètres', icon: '⚙️' },
  ];

  const getPageTitle = () => {
    const currentItem = navItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : 'Administration';
  };

  return (
    <AdminContainer>
      <Sidebar>
        <Logo>
          <h1>Admin Panel</h1>
        </Logo>
        <NavMenu>
          <ul>
            {navItems.map(item => (
              <li key={item.path}>
                <NavItem 
                  to={item.path} 
                  active={location.pathname === item.path}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </NavItem>
              </li>
            ))}
          </ul>
        </NavMenu>
      </Sidebar>
      
      <MainContent>
        <Header>
          <PageTitle>{getPageTitle()}</PageTitle>
          <UserMenu>
            <span>Admin</span>
            <img 
              src="https://via.placeholder.com/40" 
              alt="Admin"
            />
          </UserMenu>
        </Header>
        {children}
      </MainContent>
    </AdminContainer>
  );
}; 