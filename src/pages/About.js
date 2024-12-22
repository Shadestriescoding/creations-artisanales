import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AboutContainer = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto ${props => props.theme.spacing.xl};
`;

const StorySection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xxl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const StoryContent = styled.div`
  h2 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
    margin-bottom: ${props => props.theme.spacing.md};
    line-height: 1.8;
  }
`;

const ValuesSection = styled.section`
  background-color: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.spacing.xxl} 0;
  margin: ${props => props.theme.spacing.xxl} -${props => props.theme.container.padding};
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const ValueCard = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.small};
  
  h3 {
    color: ${props => props.theme.colors.primary};
    margin: ${props => props.theme.spacing.md} 0;
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
  }
  
  .emoji {
    font-size: 2.5rem;
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const CTASection = styled.section`
  text-align: center;
  margin: ${props => props.theme.spacing.xxl} 0;
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

const About = () => {
  return (
    <AboutContainer>
      <HeroSection>
        <Title>
          À propos de <span>La Cabane d'Eva</span>
        </Title>
        <Subtitle>
          Découvrez l'histoire derrière mes créations au crochet et ma passion pour l'artisanat
        </Subtitle>
      </HeroSection>

      <StorySection>
        <StoryImage src="/images/about/eva-portrait.jpg" alt="Eva dans son atelier" />
        <StoryContent>
          <h2>Mon Histoire</h2>
          <p>
            Passionnée par les travaux manuels depuis mon plus jeune âge, j'ai découvert le crochet 
            il y a quelques années. Cette technique m'a immédiatement conquise par sa versatilité 
            et les possibilités infinies qu'elle offre.
          </p>
          <p>
            Spécialisée dans la création d'amigurumis et de décorations, je mets tout mon cœur 
            dans chaque pièce que je réalise. Chaque création est unique et faite entièrement à la main, 
            avec une attention particulière portée aux détails et à la qualité des finitions.
          </p>
          <p>
            La Cabane d'Eva est née de mon désir de partager cette passion et d'apporter 
            de la joie et de la douceur dans votre quotidien à travers mes créations.
          </p>
        </StoryContent>
      </StorySection>

      <ValuesSection>
        <ValuesGrid>
          <ValueCard>
            <div className="emoji">🎨</div>
            <h3>Créativité</h3>
            <p>Chaque pièce est unique et créée avec imagination et originalité</p>
          </ValueCard>
          <ValueCard>
            <div className="emoji">💝</div>
            <h3>Passion</h3>
            <p>Un amour profond pour l'artisanat et le travail bien fait</p>
          </ValueCard>
          <ValueCard>
            <div className="emoji">✨</div>
            <h3>Qualité</h3>
            <p>Des matériaux soigneusement sélectionnés et un travail minutieux</p>
          </ValueCard>
        </ValuesGrid>
      </ValuesSection>

      <CTASection>
        <h2>Envie de découvrir mes créations ?</h2>
        <p>Visitez ma boutique en ligne pour trouver votre bonheur</p>
        <CTAButton to="/boutique">
          Voir la boutique
        </CTAButton>
      </CTASection>
    </AboutContainer>
  );
};

export default About; 