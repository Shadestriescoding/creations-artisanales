import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiShoppingBag } from 'react-icons/fi';
import { Card, Text, Button, Flex, Spacer } from '../common';
import { useCart } from '../../contexts/CartContext';
import { useNotification } from '../../contexts/NotificationContext';

const ProductImage = styled(motion.img)`
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: ${props => props.theme.borderRadius.large} ${props => props.theme.borderRadius.large} 0 0;
    transition: ${props => props.theme.transitions.fast};
`;

const ProductContent = styled.div`
    padding: ${props => props.theme.spacing.lg};
`;

const Price = styled(Text)`
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
    font-size: 1.2rem;
`;

const StyledCard = styled(Card)`
    overflow: hidden;
    transition: ${props => props.theme.transitions.medium};
    cursor: pointer;

    &:hover {
        transform: translateY(-4px);
        box-shadow: ${props => props.theme.shadows.hover};

        ${ProductImage} {
            transform: scale(1.05);
        }
    }
`;

const AddToCartButton = styled(Button)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${props => props.theme.spacing.sm};
    
    svg {
        font-size: 1.2rem;
    }
`;

const ProductCard = ({ product }) => {
    const { addItem } = useCart();
    const { showNotification } = useNotification();

    const handleAddToCart = () => {
        addItem(product);
        showNotification('Produit ajouté au panier !', 'success');
    };

    const formattedPrice = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(product.price);

    return (
        <StyledCard>
            <ProductImage
                src={product.image}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />
            <ProductContent>
                <Text variant="h4">{product.name}</Text>
                <Spacer size="xs" />
                <Text variant="subtitle" color="textLight">
                    {product.description}
                </Text>
                <Spacer size="md" />
                <Flex justify="space-between" align="center">
                    <Price>{formattedPrice}</Price>
                    <AddToCartButton
                        variant="primary"
                        onClick={handleAddToCart}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FiShoppingBag />
                        Ajouter au panier
                    </AddToCartButton>
                </Flex>
            </ProductContent>
        </StyledCard>
    );
};

export default ProductCard; 