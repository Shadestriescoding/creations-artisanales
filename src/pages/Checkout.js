import React from 'react';
import styled from 'styled-components';

const CheckoutContainer = styled.div`
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

const Checkout = () => {
  return (
    <CheckoutContainer>
      <Title>
        <span>Commande</span>
      </Title>
      <p>Le processus de commande est en cours de développement...</p>
    </CheckoutContainer>
  );
};

export default Checkout;
