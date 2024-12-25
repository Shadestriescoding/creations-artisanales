import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
`;

const Hero = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.titleFont};
  font-size: 3.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const FeatureCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: ${({ theme }) => theme.transitions.medium};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Hero>
        <Title>Bienvenue à La Cabane d'Eva</Title>
        <Subtitle>
          Découvrez des créations artisanales uniques au crochet, faites avec amour et passion.
          Chaque pièce raconte une histoire et apporte une touche de douceur à votre quotidien.
        </Subtitle>
      </Hero>

      <FeaturesGrid>
        <FeatureCard>
          <h3>Créations Uniques</h3>
          <p>Chaque pièce est fabriquée à la main avec soin et attention aux détails.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Matériaux de Qualité</h3>
          <p>Nous utilisons uniquement des matériaux soigneusement sélectionnés pour nos créations.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Sur Mesure</h3>
          <p>Possibilité de personnaliser vos commandes selon vos envies.</p>
        </FeatureCard>
      </FeaturesGrid>
    </HomeContainer>
  );
};

export default Home;
