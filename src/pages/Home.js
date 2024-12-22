import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LazyImage from '../components/common/LazyImage';

const HeroSection = styled.section`
  background-color: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.spacing.xxl} 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/pattern.png') repeat;
    opacity: 0.05;
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 2;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }
`;

const HeroTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  line-height: 1.2;
  opacity: 0;
  transform: translateY(20px);
  animation: slideUpFade 0.6s ease-out forwards;
  
  span {
    color: ${props => props.theme.colors.primary};
    display: inline-block;
  }

  @keyframes slideUpFade {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeroSubtitle = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(20px);
  animation: slideUpFade 0.6s ease-out forwards 0.2s;
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
  opacity: 0;
  transform: translateY(20px);
  animation: slideUpFade 0.6s ease-out forwards 0.4s;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: translateY(-3px);
    color: ${props => props.theme.colors.white};
    box-shadow: ${props => props.theme.shadows.medium};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
    width: 100%;
    max-width: 300px;
  }
`;

const FeaturedSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background-color: ${props => props.theme.colors.background};
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text};
  font-size: clamp(2rem, 4vw, 2.4rem);
  opacity: 0;
  transform: translateY(20px);
  
  &.visible {
    animation: slideUpFade 0.6s ease-out forwards;
  }
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary};
    margin: ${props => props.theme.spacing.sm} auto 0;
    transform: scaleX(0);
    transition: transform 0.6s ease-out;
  }

  &.visible::after {
    transform: scaleX(1);
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.lg};
    gap: ${props => props.theme.spacing.lg};
  }
`;

const CategoryCard = styled(Link)`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  aspect-ratio: 1;
  box-shadow: ${props => props.theme.shadows.medium};
  opacity: 0;
  transform: translateY(20px);
  
  &.visible {
    animation: slideUpFade 0.6s ease-out forwards;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%);
    z-index: 1;
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    &::before {
      opacity: 0.6;
    }

    img {
      transform: scale(1.05);
    }

    ${CategoryTitle} {
      transform: translateY(-5px);
    }
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
  transition: transform 0.3s ease;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

const AboutSection = styled.section`
  background-color: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.spacing.xxl} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/pattern.png') repeat;
    opacity: 0.05;
    z-index: 1;
  }
`;

const AboutContent = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  align-items: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: 0 ${props => props.theme.spacing.lg};
  }
`;

const AboutText = styled.div`
  opacity: 0;
  transform: translateX(-20px);
  
  &.visible {
    animation: slideInFade 0.6s ease-out forwards;
  }

  h2 {
    margin-bottom: ${props => props.theme.spacing.lg};
    font-size: clamp(1.8rem, 3vw, 2.4rem);
  }
  
  p {
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.textLight};
    line-height: 1.8;
  }

  @keyframes slideInFade {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const AboutImageWrapper = styled.div`
  opacity: 0;
  transform: translateX(20px);
  
  &.visible {
    animation: slideInFade 0.6s ease-out forwards 0.2s;
  }
`;

const Home = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

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
        <SectionTitle className="animate-on-scroll">Nos Catégories</SectionTitle>
        <CategoryGrid>
          <CategoryCard to="/boutique?category=amigurumis" className="animate-on-scroll">
            <LazyImage src="/images/categories/amigurumis.jpg" alt="Amigurumis" />
            <CategoryTitle>Amigurumis</CategoryTitle>
          </CategoryCard>
          <CategoryCard to="/boutique?category=decorations" className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <LazyImage src="/images/categories/decorations.jpg" alt="Décorations" />
            <CategoryTitle>Décorations</CategoryTitle>
          </CategoryCard>
          <CategoryCard to="/boutique?category=accessoires" className="animate-on-scroll" style={{ animationDelay: '0.4s' }}>
            <LazyImage src="/images/categories/accessoires.jpg" alt="Accessoires" />
            <CategoryTitle>Accessoires</CategoryTitle>
          </CategoryCard>
        </CategoryGrid>
      </FeaturedSection>

      <AboutSection>
        <AboutContent>
          <AboutText className="animate-on-scroll">
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
          <AboutImageWrapper className="animate-on-scroll">
            <LazyImage 
              src="/images/about/atelier.jpg" 
              alt="L'atelier d'Eva"
              height="400px"
              objectFit="cover"
            />
          </AboutImageWrapper>
        </AboutContent>
      </AboutSection>
    </>
  );
};

export default Home; 