import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  background-color: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.spacing.xxl} 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const HeroTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-size: 3.5rem;
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const HeroSubtitle = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: ${props => props.theme.transitions.medium};
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: translateY(-3px);
    color: ${props => props.theme.colors.white};
  }
`;

const FeaturedSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text};
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary};
    margin: ${props => props.theme.spacing.sm} auto 0;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const CategoryCard = styled(Link)`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  aspect-ratio: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%);
    z-index: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: ${props => props.theme.transitions.medium};
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const CategoryTitle = styled.h3`
  position: absolute;
  bottom: ${props => props.theme.spacing.lg};
  left: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.white};
  z-index: 2;
  margin: 0;
  font-size: 1.5rem;
`;

const AboutSection = styled.section`
  background-color: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.spacing.xxl} 0;
`;

const AboutContent = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled.div`
  h2 {
    margin-bottom: ${props => props.theme.spacing.lg};
  }
  
  p {
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.textLight};
  }
`;

const AboutImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.large};
`;

const Home = () => {
  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Bienvenue dans <span>La Cabane d'Eva</span>
          </HeroTitle>
          <HeroSubtitle>
            Découvrez mes créations uniques au crochet : amigurumis, décorations et accessoires faits main avec passion
          </HeroSubtitle>
          <CTAButton to="/boutique">
            Découvrir la boutique
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <FeaturedSection>
        <SectionTitle>Nos Catégories</SectionTitle>
        <CategoryGrid>
          <CategoryCard to="/boutique?category=amigurumis">
            <img src="/images/categories/amigurumis.jpg" alt="Amigurumis" />
            <CategoryTitle>Amigurumis</CategoryTitle>
          </CategoryCard>
          <CategoryCard to="/boutique?category=decorations">
            <img src="/images/categories/decorations.jpg" alt="Décorations" />
            <CategoryTitle>Décorations</CategoryTitle>
          </CategoryCard>
          <CategoryCard to="/boutique?category=accessoires">
            <img src="/images/categories/accessoires.jpg" alt="Accessoires" />
            <CategoryTitle>Accessoires</CategoryTitle>
          </CategoryCard>
        </CategoryGrid>
      </FeaturedSection>

      <AboutSection>
        <AboutContent>
          <AboutText>
            <h2>À propos de La Cabane d'Eva</h2>
            <p>
              Passionnée par le crochet et les créations artisanales, je crée des pièces uniques 
              qui apportent douceur et originalité à votre intérieur.
            </p>
            <p>
              Chaque création est réalisée à la main avec amour et attention aux détails, 
              pour vous offrir des objets de qualité qui durent dans le temps.
            </p>
            <CTAButton to="/a-propos">En savoir plus</CTAButton>
          </AboutText>
          <AboutImage src="/images/about/atelier.jpg" alt="L'atelier d'Eva" />
        </AboutContent>
      </AboutSection>
    </>
  );
};

export default Home; 