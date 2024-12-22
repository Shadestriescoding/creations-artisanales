import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AboutContainer = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
`;

const HeroSection = styled.section`
  position: relative;
  background-color: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.spacing.xxxl} 0;
  text-align: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/about/pattern.png') repeat;
    opacity: 0.1;
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 0 ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-family: ${props => props.theme.typography.titleFont};
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto ${props => props.theme.spacing.xl};
  line-height: 1.8;
  font-weight: 300;
`;

const StorySection = styled.section`
  padding: ${props => props.theme.spacing.xxxl} 0;
  background-color: ${props => props.theme.colors.white};
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xxl};
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const StoryImage = styled.div`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  aspect-ratio: 4/5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: ${props => props.theme.transitions.slow};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      ${props => props.theme.colors.backgroundDark}40 100%
    );
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const StoryContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl} 0;

  h2 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.xl};
    font-family: ${props => props.theme.typography.titleFont};
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -${props => props.theme.spacing.sm};
      left: 0;
      width: 60px;
      height: 2px;
      background-color: ${props => props.theme.colors.primary};
    }
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
    margin-bottom: ${props => props.theme.spacing.lg};
    line-height: 1.8;
    font-weight: 300;
  }
`;

const ValuesSection = styled.section`
  background-color: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.spacing.xxxl} 0;
`;

const ValuesContainer = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
`;

const ValuesTitle = styled.h2`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.titleFont};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -${props => props.theme.spacing.sm};
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.xl};
`;

const ValueCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  transition: ${props => props.theme.transitions.medium};
  box-shadow: ${props => props.theme.shadows.card};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.hover};
  }

  .emoji {
    font-size: 2.5rem;
    margin-bottom: ${props => props.theme.spacing.md};
    display: inline-block;
    transition: ${props => props.theme.transitions.bounce};

    ${props => props.theme.hover} {
      transform: scale(1.2);
    }
  }
  
  h3 {
    color: ${props => props.theme.colors.primary};
    margin: ${props => props.theme.spacing.md} 0;
    font-family: ${props => props.theme.typography.titleFont};
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const CTASection = styled.section`
  text-align: center;
  padding: ${props => props.theme.spacing.xxxl} 0;
  background-color: ${props => props.theme.colors.white};
`;

const CTAContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};

  h2 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.lg};
    font-family: ${props => props.theme.typography.titleFont};
  }

  p {
    color: ${props => props.theme.colors.textLight};
    margin-bottom: ${props => props.theme.spacing.xl};
    font-size: 1.1rem;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xxl};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0.02em;
  transition: ${props => props.theme.transitions.medium};
  box-shadow: ${props => props.theme.shadows.button};
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.hover};
    color: ${props => props.theme.colors.white};
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <HeroSection>
        <HeroContent>
          <Title>
            Bienvenue dans <span>La Cabane d'Eva</span>
          </Title>
          <Subtitle>
            Découvrez l'univers chaleureux et créatif d'une passionnée du crochet, 
            où chaque pièce raconte une histoire unique et artisanale
          </Subtitle>
        </HeroContent>
      </HeroSection>

      <StorySection>
        <StoryGrid>
          <StoryImage>
            <img src="/images/about/eva-portrait.jpg" alt="Eva dans son atelier" />
          </StoryImage>
          <StoryContent>
            <h2>Mon Histoire</h2>
            <p>
              Passionnée par les travaux manuels depuis mon plus jeune âge, j'ai découvert 
              le crochet comme une évidence. Cette technique ancestrale m'a immédiatement 
              conquise par sa versatilité et les possibilités infinies qu'elle offre.
            </p>
            <p>
              Chaque création qui sort de mes mains est unique et réalisée avec amour. 
              Je sélectionne méticuleusement les matériaux, privilégiant la qualité et 
              la durabilité, pour vous offrir des pièces qui traverseront le temps.
            </p>
            <p>
              La Cabane d'Eva est née de mon désir de partager cette passion et 
              d'apporter une touche de douceur et de fait-main dans votre quotidien.
            </p>
          </StoryContent>
        </StoryGrid>
      </StorySection>

      <ValuesSection>
        <ValuesContainer>
          <ValuesTitle>Mes Valeurs</ValuesTitle>
          <ValuesGrid>
            <ValueCard>
              <div className="emoji">🎨</div>
              <h3>Créativité</h3>
              <p>
                Chaque pièce est une création unique, née d'un mélange d'inspiration 
                et de savoir-faire artisanal
              </p>
            </ValueCard>
            <ValueCard>
              <div className="emoji">💝</div>
              <h3>Passion</h3>
              <p>
                Le crochet n'est pas qu'un simple passe-temps, c'est un art que 
                je pratique avec amour et dévouement
              </p>
            </ValueCard>
            <ValueCard>
              <div className="emoji">✨</div>
              <h3>Qualité</h3>
              <p>
                Je ne fais aucun compromis sur la qualité des matériaux et le soin 
                apporté aux finitions
              </p>
            </ValueCard>
          </ValuesGrid>
        </ValuesContainer>
      </ValuesSection>

      <CTASection>
        <CTAContent>
          <h2>Envie de découvrir mes créations ?</h2>
          <p>
            Visitez ma boutique en ligne pour trouver des pièces uniques qui 
            apporteront une touche de chaleur et d'authenticité à votre intérieur
          </p>
          <CTAButton to="/boutique">
            Découvrir la boutique
          </CTAButton>
        </CTAContent>
      </CTASection>
    </AboutContainer>
  );
};

export default About; 