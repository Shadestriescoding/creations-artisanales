import React from 'react';
import styled from 'styled-components';
import { Container, Text, Grid, Card, Button, Flex, Spacer } from '../components/common';
import { Link } from 'react-router-dom';

const HeroBanner = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const categories = [
  {
    id: 'deco',
    name: 'Décorations',
    image: '/assets/images/categories/deco_sapin_crochet.jpg',
    description: 'Ajoutez une touche unique à votre intérieur'
  },
  {
    id: 'jouets',
    name: 'Jouets',
    image: '/assets/images/categories/legumes_crochet.jpg',
    description: 'Des jouets faits main pour petits et grands'
  },
  {
    id: 'suspensions',
    name: 'Suspensions',
    image: '/assets/images/categories/suspension_bois_crochet.jpg',
    description: 'Décorez vos murs avec style'
  }
];

const Home = () => {
  return (
    <>
      <HeroBanner>
        <Container>
          <Text variant="h1" color="primary">
            Bienvenue à La Cabane d'Eva
          </Text>
          <Spacer size="md" />
          <Text variant="subtitle" align="center" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Découvrez des créations artisanales uniques au crochet, faites avec amour et passion.
            Chaque pièce raconte une histoire et apporte une touche de douceur à votre quotidien.
          </Text>
          <Spacer size="xl" />
          <Button as={Link} to="/shop" size="large">
            Découvrir la boutique
          </Button>
        </Container>
      </HeroBanner>

      <Container>
        <Text variant="h2" align="center">Nos Créations</Text>
        <Spacer size="xl" />
        
        <Grid columns={3} gap="large">
          {categories.map(category => (
            <Grid.Item key={category.id}>
              <Card hoverable>
                <CategoryImage src={category.image} alt={category.name} />
                <Flex direction="column" padding={({ theme }) => theme.spacing.lg}>
                  <Text variant="h4">{category.name}</Text>
                  <Text variant="subtitle">{category.description}</Text>
                  <Spacer size="md" />
                  <Button 
                    as={Link} 
                    to={`/shop?category=${category.id}`}
                    variant="outline"
                  >
                    Voir plus
                  </Button>
                </Flex>
              </Card>
            </Grid.Item>
          ))}
        </Grid>

        <Spacer size="xxxl" />

        <Card padding="large">
          <Flex direction="column" align="center" gap="large">
            <Text variant="h3" align="center">
              Envie d'une création sur mesure ?
            </Text>
            <Text variant="subtitle" align="center">
              Je peux créer des pièces uniques selon vos envies et vos besoins.
              N'hésitez pas à me contacter pour en discuter !
            </Text>
            <Button as={Link} to="/contact" variant="secondary" size="large">
              Me contacter
            </Button>
          </Flex>
        </Card>

        <Spacer size="xxxl" />
      </Container>
    </>
  );
};

export default Home;
