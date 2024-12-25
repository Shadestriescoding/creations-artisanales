import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiShoppingBag } from 'react-icons/fi';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xxl};
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.background},
    ${props => props.theme.colors.backgroundAlt}
  );
`;

const Content = styled(motion.div)`
  text-align: center;
  max-width: 600px;
`;

const Title = styled(motion.h1)`
  font-size: 8rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-family: ${props => props.theme.typography.titleFont};
  line-height: 1;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 6rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-family: ${props => props.theme.typography.titleFont};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const Description = styled(motion.p)`
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.xxl};
  line-height: 1.6;
  font-size: 1.1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
  }
`;

const Button = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background-color: ${props =>
    props.$primary ? props.theme.colors.primary : 'transparent'};
  color: ${props =>
    props.$primary ? 'white' : props.theme.colors.text};
  border: 2px solid ${props =>
    props.$primary ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background-color: ${props =>
      props.$primary
        ? props.theme.colors.primaryDark
        : props.theme.colors.backgroundAlt};
    border-color: ${props =>
      props.$primary
        ? props.theme.colors.primaryDark
        : props.theme.colors.primary};
  }

  svg {
    font-size: 1.2rem;
  }
`;

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <NotFoundContainer>
      <Content
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Title variants={itemVariants}>404</Title>
        <Subtitle variants={itemVariants}>Page non trouvée</Subtitle>
        <Description variants={itemVariants}>
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          N'hésitez pas à retourner à l'accueil ou à visiter notre boutique.
        </Description>
        <ButtonsContainer variants={itemVariants}>
          <Button
            to="/"
            $primary
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiHome /> Retour à l'accueil
          </Button>
          <Button
            to="/shop"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiShoppingBag /> Visiter la boutique
          </Button>
        </ButtonsContainer>
      </Content>
    </NotFoundContainer>
  );
};

export default NotFound; 