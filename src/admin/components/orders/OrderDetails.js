import React from 'react';
import styled from 'styled-components';
import { useToast } from '../../../contexts/ToastContext';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.titleFont};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const OrderInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const InfoGroup = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.typography.small};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }
`;

const ProductList = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ProductItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const ProductInfo = styled.div`
  h4 {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .price {
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.typography.small};
  }
`;

const ProductTotal = styled.div`
  text-align: right;
  font-weight: 500;
`;

const Summary = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  &.total {
    font-weight: 600;
    font-size: 1.1em;
    margin-top: ${({ theme }) => theme.spacing.md};
    padding-top: ${({ theme }) => theme.spacing.md};
    border-top: 2px solid ${({ theme }) => theme.colors.border};
  }
`;

const StatusSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.body};
  margin-top: ${({ theme }) => theme.spacing.md};
  width: 200px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const OrderDetails = ({ order, onClose, onUpdateStatus }) => {
  const { showToast } = useToast();

  const handleStatusChange = async (e) => {
    try {
      await onUpdateStatus(order.id, e.target.value);
      showToast('Statut de la commande mis à jour', 'success');
    } catch (error) {
      showToast('Erreur lors de la mise à jour du statut', 'error');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <Header>
          <Title>Commande {order.id}</Title>
          <StatusSelect value={order.status} onChange={handleStatusChange}>
            <option value="pending">En attente</option>
            <option value="processing">En traitement</option>
            <option value="shipped">Expédiée</option>
            <option value="delivered">Livrée</option>
            <option value="cancelled">Annulée</option>
          </StatusSelect>
        </Header>

        <OrderInfo>
          <InfoGroup>
            <h3>Date de commande</h3>
            <p>{formatDate(order.date)}</p>
          </InfoGroup>
          <InfoGroup>
            <h3>Client</h3>
            <p>{order.customer}</p>
          </InfoGroup>
          <InfoGroup>
            <h3>Email</h3>
            <p>{order.email}</p>
          </InfoGroup>
          <InfoGroup>
            <h3>Téléphone</h3>
            <p>{order.phone || 'Non renseigné'}</p>
          </InfoGroup>
        </OrderInfo>

        <ProductList>
          {order.products.map(product => (
            <ProductItem key={product.id}>
              <ProductImage src={product.image} alt={product.name} />
              <ProductInfo>
                <h4>{product.name}</h4>
                <div className="price">{product.price}€ × {product.quantity}</div>
              </ProductInfo>
              <ProductTotal>
                {(product.price * product.quantity).toFixed(2)}€
              </ProductTotal>
            </ProductItem>
          ))}
        </ProductList>

        <Summary>
          <SummaryRow>
            <span>Sous-total</span>
            <span>{order.subtotal}€</span>
          </SummaryRow>
          <SummaryRow>
            <span>Frais de livraison</span>
            <span>{order.shipping}€</span>
          </SummaryRow>
          <SummaryRow className="total">
            <span>Total</span>
            <span>{order.total}€</span>
          </SummaryRow>
        </Summary>
      </ModalContent>
    </Modal>
  );
};

export default OrderDetails; 