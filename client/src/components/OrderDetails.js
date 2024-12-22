import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '../contexts/ToastContext';
import pdfService from '../services/pdfService';

const OrderDetails = ({ order }) => {
  const { showToast } = useToast();

  const handleDownloadInvoice = async () => {
    try {
      await pdfService.downloadInvoice(order._id);
      showToast('Facture téléchargée avec succès', 'success');
    } catch (error) {
      showToast('Erreur lors du téléchargement de la facture', 'error');
    }
  };

  const handleDownloadConfirmation = async () => {
    try {
      await pdfService.downloadOrderConfirmation(order._id);
      showToast('Confirmation de commande téléchargée avec succès', 'success');
    } catch (error) {
      showToast('Erreur lors du téléchargement de la confirmation', 'error');
    }
  };

  return (
    <Container>
      <Header>
        <OrderNumber>Commande #{order.orderNumber}</OrderNumber>
        <OrderDate>
          {format(new Date(order.createdAt), 'PPP', { locale: fr })}
        </OrderDate>
      </Header>

      <Section>
        <SectionTitle>Statut de la commande</SectionTitle>
        <StatusBadge status={order.status}>{order.status}</StatusBadge>
      </Section>

      <Section>
        <SectionTitle>Articles</SectionTitle>
        <ItemsList>
          {order.items.map((item) => (
            <Item key={item._id}>
              <ItemImage src={item.product.images[0]} alt={item.product.name} />
              <ItemDetails>
                <ItemName>{item.product.name}</ItemName>
                <ItemQuantity>Quantité : {item.quantity}</ItemQuantity>
                <ItemPrice>{item.price.toFixed(2)} €</ItemPrice>
              </ItemDetails>
            </Item>
          ))}
        </ItemsList>
      </Section>

      <Section>
        <SectionTitle>Adresse de livraison</SectionTitle>
        <Address>
          {order.shippingAddress.firstName} {order.shippingAddress.lastName}
          <br />
          {order.shippingAddress.address}
          <br />
          {order.shippingAddress.postalCode} {order.shippingAddress.city}
          <br />
          {order.shippingAddress.country}
        </Address>
      </Section>

      <Section>
        <SectionTitle>Résumé</SectionTitle>
        <Summary>
          <SummaryRow>
            <span>Sous-total</span>
            <span>{order.subtotal.toFixed(2)} €</span>
          </SummaryRow>
          <SummaryRow>
            <span>TVA (20%)</span>
            <span>{order.tax.toFixed(2)} €</span>
          </SummaryRow>
          <SummaryRow>
            <span>Frais de livraison</span>
            <span>{order.shipping.cost.toFixed(2)} €</span>
          </SummaryRow>
          <Total>
            <span>Total</span>
            <span>{order.total.toFixed(2)} €</span>
          </Total>
        </Summary>
      </Section>

      <ButtonsContainer>
        <DownloadButton onClick={handleDownloadInvoice}>
          Télécharger la facture
        </DownloadButton>
        <DownloadButton onClick={handleDownloadConfirmation}>
          Télécharger la confirmation
        </DownloadButton>
      </ButtonsContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const OrderNumber = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const OrderDate = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'pending':
        return theme.colors.warning + '20';
      case 'processing':
        return theme.colors.info + '20';
      case 'shipped':
        return theme.colors.success + '20';
      case 'delivered':
        return theme.colors.success + '40';
      case 'cancelled':
        return theme.colors.error + '20';
      default:
        return theme.colors.border;
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case 'pending':
        return theme.colors.warning;
      case 'processing':
        return theme.colors.info;
      case 'shipped':
      case 'delivered':
        return theme.colors.success;
      case 'cancelled':
        return theme.colors.error;
      default:
        return theme.colors.text;
    }
  }};
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Item = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemName = styled.span`
  font-weight: 500;
`;

const ItemQuantity = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
`;

const ItemPrice = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

const Address = styled.address`
  font-style: normal;
  line-height: 1.6;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.colors.textLight};
`;

const Total = styled(SummaryRow)`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 0.5rem;
  padding-top: 1rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const DownloadButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export default OrderDetails; 