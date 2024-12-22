import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = () => {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <StyledNavLink to="/">Accueil</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/shop">Boutique</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/contact">Contact</StyledNavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

const Nav = styled.nav`
  padding: 1rem 0;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 2rem;
  justify-content: center;
`;

const NavItem = styled.li`
  margin: 0;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.backgroundLight};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.backgroundLight};
  }
`;

export default Navigation; 