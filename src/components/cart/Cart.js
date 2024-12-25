import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import LazyImage from '../common/LazyImage';

const CartOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 450px;
  background-color: ${props => props.theme.colors.background};
  box-shadow: ${props => props.theme.shadows.large};
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const CartTitle = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.titleFont};
  margin: 0;
`;

const CloseButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.medium};

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: ${props => props.theme.colors.backgroundAlt};
  }
`;

const CartContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.lg};
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl} 0;
  color: ${props => props.theme.colors.textLight};

  svg {
    font-size: 3rem;
    margin-bottom: ${props => props.theme.spacing.lg};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.xl};
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const CartItem = styled(motion.div)`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.medium};
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};
`;

const ItemTitle = styled.h3`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const ItemPrice = styled.div`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
`;

const RemoveButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.theme.colors.danger};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: ${props => props.theme.borderRadius.medium};

  &:hover {
    background-color: ${props => props.theme.colors.danger}10;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const CartFooter = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.background};
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  font-family: ${props => props.theme.typography.titleFont};

  span:first-child {
    color: ${props => props.theme.colors.text};
    font-size: 1.2rem;
  }

  span:last-child {
    color: ${props => props.theme.colors.primary};
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const CheckoutButton = styled(motion(Link))`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ContinueShoppingButton = styled(motion(Link))`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  margin-top: ${props => props.theme.spacing.md};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.backgroundAlt};
    border-color: ${props => props.theme.colors.primary};
  }

  svg {
    font-size: 1.2rem;
  }
`;

const Cart = ({ isOpen, onClose }) => {
  const { items, removeItem, total } = useCart();

  const overlayVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <CartOverlay
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
        >
          <CartHeader>
            <CartTitle>Mon panier</CartTitle>
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiX />
            </CloseButton>
          </CartHeader>

          <CartContent>
            {items.length === 0 ? (
              <EmptyCart>
                <FiShoppingBag />
                <p>Votre panier est vide</p>
                <ContinueShoppingButton
                  to="/shop"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Découvrir nos créations
                </ContinueShoppingButton>
              </EmptyCart>
            ) : (
              <CartItems>
                <AnimatePresence>
                  {items.map(item => (
                    <CartItem
                      key={item.id}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={itemVariants}
                      layout
                    >
                      <ItemImage>
                        <LazyImage
                          src={item.images[0]}
                          alt={item.title}
                          width={80}
                          height={80}
                        />
                      </ItemImage>
                      <ItemInfo>
                        <ItemTitle>{item.title}</ItemTitle>
                        <ItemPrice>{item.price}</ItemPrice>
                        <ItemQuantity>Quantité: 1</ItemQuantity>
                      </ItemInfo>
                      <RemoveButton
                        onClick={() => removeItem(item.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiTrash2 />
                      </RemoveButton>
                    </CartItem>
                  ))}
                </AnimatePresence>
              </CartItems>
            )}
          </CartContent>

          {items.length > 0 && (
            <CartFooter>
              <CartTotal>
                <span>Total</span>
                <span>{total}€</span>
              </CartTotal>
              <CheckoutButton
                to="/checkout"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Passer la commande
              </CheckoutButton>
              <ContinueShoppingButton
                to="/shop"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continuer mes achats
              </ContinueShoppingButton>
            </CartFooter>
          )}
        </CartOverlay>
      )}
    </AnimatePresence>
  );
};

export default Cart; 