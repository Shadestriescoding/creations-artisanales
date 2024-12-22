import React from 'react';
import styled from 'styled-components';

const AdminContainer = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
`;

const Title = styled.h1`
  text-align: center;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const Admin = () => {
  return (
    <AdminContainer>
      <Title>
        <span>Administration</span>
      </Title>
      <p>L'interface d'administration est en cours de développement...</p>
    </AdminContainer>
  );
};

export default Admin; 