import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease;
  z-index: 999;
`;

const CartContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${props => (props.isOpen ? '0' : '-400px')};
  width: 400px;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transition: right 0.3s ease;
  z-index: 1000;
  overflow-y: auto;

  @media (max-width: 480px) {
    width: 100%;
    right: ${props => (props.isOpen ? '0' : '-100%')};
  }
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${props => props.theme.colors.background};

  h2 {
    font-size: 1.5rem;
    color: ${props => props.theme.colors.text};
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.background};

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 1rem;
  }
`;

const ItemInfo = styled.div`
  flex-grow: 1;

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.text};
  }

  p {
    font-size: 1.1rem;
    font-weight: bold;
    color: ${props => props.theme.colors.accent};
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-left: 1rem;

  span {
    min-width: 24px;
    text-align: center;
    font-weight: bold;
  }

  button {
    background-color: ${props => props.theme.colors.background};
    border: none;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: ${props => props.theme.colors.primary};
      color: white;
    }
  }
`;

const Total = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.background};
  text-align: right;
  font-weight: bold;
  font-size: 1.2rem;

  span {
    color: ${props => props.theme.colors.accent};
    margin-left: 0.5rem;
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.text};
  font-style: italic;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 1rem;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Cart = ({ isOpen, onClose, items, onUpdateQuantity }) => {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={handleOverlayClick} />
      <CartContainer isOpen={isOpen}>
        <CartHeader>
          <h2>Panier</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </CartHeader>

        {items.length === 0 ? (
          <EmptyCartMessage>Votre panier est vide</EmptyCartMessage>
        ) : (
          <>
            {items.map(item => (
              <CartItem key={item.id}>
                <img src={item.image} alt={item.name} />
                <ItemInfo>
                  <h3>{item.name}</h3>
                  <p>{item.price.toFixed(2)}€</p>
                </ItemInfo>
                <QuantityControl>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </QuantityControl>
              </CartItem>
            ))}

            <Total>
              Total: <span>{total.toFixed(2)}€</span>
            </Total>

            <CheckoutButton
              disabled={items.length === 0}
              onClick={() => alert('Fonctionnalité de paiement à venir')}
            >
              Passer la commande
            </CheckoutButton>
          </>
        )}
      </CartContainer>
    </>
  );
};
