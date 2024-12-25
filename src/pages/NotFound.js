import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: 6rem;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  font-family: ${({ theme }) => theme.typography.titleFont};
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const BackLink = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: ${({ theme }) => theme.transitions.medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Message>Oups ! Cette page n'existe pas.</Message>
      <BackLink to="/">Retour à l'accueil</BackLink>
    </NotFoundContainer>
  );
};

export default NotFound; 