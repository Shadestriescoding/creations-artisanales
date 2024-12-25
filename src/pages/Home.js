import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiHeart, FiPackage } from 'react-icons/fi';
import LazyImage from '../components/common/LazyImage';

const HeroSection = styled(motion.section)`
  position: relative;
  height: 80vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(
    to bottom right,
    ${props => props.theme.colors.backgroundAlt},
    ${props => props.theme.colors.background}
  );

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 70vh;
    min-height: 500px;
  }
`;

const HeroContent = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  text-align: center;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-family: ${props => props.theme.typography.titleFont};
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.large};
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

const FeaturesSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background-color: ${props => props.theme.colors.background};
`;

const FeaturesGrid = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.lg};
    gap: ${props => props.theme.spacing.lg};
  }
`;

const FeatureCard = styled(motion.div)`
  padding: ${props => props.theme.spacing.xl};
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.backgroundAlt},
    ${props => props.theme.colors.background}
  );
  border-radius: ${props => props.theme.borderRadius.large};
  text-align: center;
  transition: all 0.3s ease;

  svg {
    font-size: 2rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  h3 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.md};
    font-family: ${props => props.theme.typography.titleFont};
  }

  p {
    color: ${props => props.theme.colors.textLight};
    line-height: 1.6;
  }
`;

const LatestCreationsSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background-color: ${props => props.theme.colors.backgroundAlt};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-family: ${props => props.theme.typography.titleFont};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const CreationsGrid = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.lg};
    gap: ${props => props.theme.spacing.lg};
  }
`;

const CreationCard = styled(motion.div)`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.5),
      transparent
    );
    pointer-events: none;
  }
`;

const CreationInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${props => props.theme.spacing.lg};
  color: white;
  z-index: 1;

  h3 {
    font-size: 1.2rem;
    margin-bottom: ${props => props.theme.spacing.sm};
    font-family: ${props => props.theme.typography.titleFont};
  }

  p {
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const Home = () => {
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <HeroSection>
        <HeroContent>
          <HeroTitle variants={itemVariants}>
            Créations artisanales au crochet
          </HeroTitle>
          <HeroSubtitle variants={itemVariants}>
            Découvrez des pièces uniques faites main avec amour et passion.
            Chaque création raconte une histoire et apporte une touche de douceur à votre intérieur.
          </HeroSubtitle>
          <CTAButton
            to="/shop"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Découvrir la boutique <FiArrowRight />
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesGrid>
          <FeatureCard
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <FiHeart />
            <h3>Fait main avec amour</h3>
            <p>Chaque pièce est créée avec soin et attention aux détails pour vous offrir des créations uniques et personnelles.</p>
          </FeatureCard>
          <FeatureCard
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <FiPackage />
            <h3>Livraison soignée</h3>
            <p>Vos créations sont emballées avec soin et expédiées rapidement pour vous garantir une réception en parfait état.</p>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <LatestCreationsSection>
        <SectionTitle>Dernières créations</SectionTitle>
        <CreationsGrid>
          {[1, 2, 3].map((item) => (
            <CreationCard
              key={item}
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <LazyImage
                src={`/images/creation-${item}.jpg`}
                alt={`Création ${item}`}
                width={400}
                height={300}
              />
              <CreationInfo>
                <h3>Création {item}</h3>
                <p>Une pièce unique pleine de charme</p>
              </CreationInfo>
            </CreationCard>
          ))}
        </CreationsGrid>
      </LatestCreationsSection>
    </motion.div>
  );
};

export default Home;
