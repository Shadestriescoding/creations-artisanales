import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Hero = styled.section`
  position: relative;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('/images/atelier.jpg') center/cover;
  margin-bottom: 4rem;
  border-radius: 1rem;
  overflow: hidden;
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-family: 'Playfair Display', serif;
`;

const CustomOrderSection = styled.section`
  background: ${props => props.theme.colors.background};
  padding: 3rem;
  border-radius: 1rem;
  margin-bottom: 4rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const CategoryCard = styled(Link)`
  position: relative;
  height: 300px;
  border-radius: 0.5rem;
  overflow: hidden;
  text-decoration: none;
  color: white;
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const CategoryOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
`;

const TestimonialsSection = styled.section`
  margin-bottom: 4rem;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TestimonialCard = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const categories = [
  { id: 1, name: 'Décorations murales', image: '/images/deco-murale.jpg', path: '/shop?category=deco' },
  { id: 2, name: 'Accessoires de rangement', image: '/images/rangement.jpg', path: '/shop?category=rangement' },
  { id: 3, name: 'Jouets pour enfants', image: '/images/jouets.jpg', path: '/shop?category=jouets' },
];

const testimonials = [
  {
    id: 1,
    name: 'Sophie L.',
    text: 'Les créations d\'Eva sont magnifiques ! J\'ai commandé une décoration personnalisée pour la chambre de ma fille, le résultat est parfait.',
  },
  {
    id: 2,
    name: 'Marc D.',
    text: 'Un travail d\'une grande qualité. Les finitions sont soignées et le rendu est encore plus beau que sur les photos.',
  },
];

const Home = () => {
  return (
    <HomeContainer>
      <Hero>
        <HeroContent>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Bienvenue dans l'univers de La Cabane d'Eva
          </Title>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Créations artisanales uniques au crochet
          </motion.p>
        </HeroContent>
      </Hero>

      <CustomOrderSection>
        <h2>Envie d'une création sur mesure ?</h2>
        <p>Décrivez votre projet et recevez un devis personnalisé</p>
        <Link to="/custom-order">
          <button>Créer ma pièce unique</button>
        </Link>
      </CustomOrderSection>

      <section>
        <h2>Nos Catégories</h2>
        <CategoryGrid>
          {categories.map(category => (
            <CategoryCard key={category.id} to={category.path}>
              <CategoryImage src={category.image} alt={category.name} />
              <CategoryOverlay>
                <h3>{category.name}</h3>
              </CategoryOverlay>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </section>

      <TestimonialsSection>
        <h2>Ce que nos clients disent</h2>
        <TestimonialGrid>
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id}>
              <p>"{testimonial.text}"</p>
              <strong>{testimonial.name}</strong>
            </TestimonialCard>
          ))}
        </TestimonialGrid>
      </TestimonialsSection>
    </HomeContainer>
  );
};

export default Home;
