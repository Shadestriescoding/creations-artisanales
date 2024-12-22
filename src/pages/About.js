import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import OptimizedImage from '../components/common/OptimizedImage';
import ImageModal from '../components/common/ImageModal';
import ProgressDots from '../components/common/ProgressDots';
import useOptimizedAnimation from '../hooks/useOptimizedAnimation';
import { Helmet } from 'react-helmet';

const AboutContainer = styled.div`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  }
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
  position: relative;
  padding: ${props => props.theme.spacing.xxl} 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/pattern.png') repeat;
    opacity: 0.05;
    z-index: -1;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  span {
    color: ${props => props.theme.colors.primary};
    display: inline-block;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: ${props => props.theme.colors.textLight};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
`;

const Section = styled(motion.section)`
  margin-bottom: ${props => props.theme.spacing.xxxl};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  align-items: center;

  &:nth-child(odd) {
    direction: rtl;
    
    > * {
      direction: ltr;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
    
    &:nth-child(odd) {
      direction: ltr;
    }
  }
`;

const Content = styled.div`
  h2 {
    font-size: clamp(1.8rem, 3vw, 2.4rem);
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.lg};
    position: relative;
    padding-bottom: ${props => props.theme.spacing.md};
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: ${props => props.theme.colors.primary};
    }
  }

  p {
    color: ${props => props.theme.colors.textLight};
    line-height: 1.8;
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: 1.1rem;
  }
`;

const ImageWrapper = styled.div`
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.large};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 4/3;
    transition: transform 0.6s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.xxl};
`;

const Step = styled(motion.div)`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  text-align: center;
  position: relative;
  
  &::before {
    content: '${props => props.number}';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  h3 {
    font-size: ${props => props.theme.typography.h4};
    color: ${props => props.theme.colors.text};
    margin: ${props => props.theme.spacing.lg} 0 ${props => props.theme.spacing.md};
  }

  p {
    color: ${props => props.theme.colors.textLight};
    line-height: 1.6;
  }
`;

const CTASection = styled(motion.section)`
  text-align: center;
  margin-top: ${props => props.theme.spacing.xxxl};
  padding: ${props => props.theme.spacing.xxl} 0;
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.large};
`;

const CTATitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CTAText = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto ${props => props.theme.spacing.xl};
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xxl};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: ${props => props.theme.transitions.medium};
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const ContactSection = styled(motion.section)`
  margin-top: ${props => props.theme.spacing.xxxl};
  text-align: center;
`;

const ContactTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  
  a {
    color: ${props => props.theme.colors.primary};
    font-size: 1.2rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }
  }
`;

const TestimonialsSection = styled(motion.section)`
  margin-top: ${props => props.theme.spacing.xxxl};
  padding: ${props => props.theme.spacing.xxl} 0;
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  position: relative;
`;

const TestimonialsTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const TestimonialsContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
`;

const Testimonial = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
`;

const TestimonialText = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.8;
  font-style: italic;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  &::before, &::after {
    content: '"';
    color: ${props => props.theme.colors.primary};
    font-size: 1.5em;
  }
`;

const TestimonialAuthor = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const TestimonialLocation = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${props => props.theme.colors.white};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all 0.3s ease;
  z-index: 2;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    transform: translateY(-50%) scale(1.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &.prev {
    left: ${props => props.theme.spacing.lg};
  }
  
  &.next {
    right: ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 32px;
    height: 32px;
    
    &.prev {
      left: ${props => props.theme.spacing.sm};
    }
    
    &.next {
      right: ${props => props.theme.spacing.sm};
    }
  }
`;

const GallerySection = styled(motion.section)`
  margin-top: ${props => props.theme.spacing.xxxl};
  text-align: center;
`;

const GalleryTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  cursor: pointer;
  
  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`;

const testimonials = [
  {
    id: 1,
    text: "Les créations d'Eva sont tout simplement magnifiques ! J'ai commandé une guirlande personnalisée pour la chambre de ma fille, et le résultat dépasse toutes mes attentes. Chaque détail est parfait !",
    author: "Marie L.",
    location: "Paris"
  },
  {
    id: 2,
    text: "Un grand merci pour ce merveilleux mobile pour bébé. La qualité est exceptionnelle, et les couleurs sont exactement comme je les souhaitais. Je recommande vivement !",
    author: "Sophie M.",
    location: "Lyon"
  },
  {
    id: 3,
    text: "Eva a su parfaitement comprendre mes envies pour créer un panier de rangement unique. Son professionnalisme et sa créativité sont remarquables. Je suis enchantée !",
    author: "Claire D.",
    location: "Bordeaux"
  }
];

const galleryImages = [
  { id: 1, src: "/images/gallery/creation1.jpg", alt: "Guirlande décorative" },
  { id: 2, src: "/images/gallery/creation2.jpg", alt: "Mobile bébé" },
  { id: 3, src: "/images/gallery/creation3.jpg", alt: "Panier de rangement" },
  { id: 4, src: "/images/gallery/creation4.jpg", alt: "Décoration murale" },
  { id: 5, src: "/images/gallery/creation5.jpg", alt: "Set de table" },
  { id: 6, src: "/images/gallery/creation6.jpg", alt: "Suspension macramé" }
];

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
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const About = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  
  const {
    setRef: headerRef,
    getAnimationProps: getHeaderAnimationProps
  } = useOptimizedAnimation();

  const {
    setRef: contentRef,
    getAnimationProps: getContentAnimationProps
  } = useOptimizedAnimation({
    threshold: 0.2
  });

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleImageClick = (index) => {
    setModalImage(index);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  const handlePreviousImage = () => {
    setModalImage((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setModalImage((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <Helmet>
        <title>À propos - La Cabane d'Eva</title>
        <meta 
          name="description" 
          content="Découvrez l'histoire de La Cabane d'Eva, un univers créatif où le crochet rencontre la passion. Créations artisanales uniques et fait-main avec amour."
        />
        <meta property="og:title" content="À propos - La Cabane d'Eva" />
        <meta 
          property="og:description" 
          content="Découvrez l'histoire de La Cabane d'Eva, un univers créatif où le crochet rencontre la passion."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/about/atelier.jpg" />
        <link rel="canonical" href="https://lacabanedeva.fr/a-propos" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": "La Cabane d'Eva",
              "description": "Créations artisanales au crochet, faites main avec amour. Spécialisée dans les amigurumis, décorations et accessoires personnalisés.",
              "image": "/images/about/atelier.jpg",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR"
              },
              "telephone": "+33612345678",
              "email": "contact@lacabanedeva.fr",
              "priceRange": "€€",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": testimonials.length
              },
              "review": testimonials.map(testimonial => ({
                "@type": "Review",
                "author": testimonial.author,
                "reviewBody": testimonial.text,
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5"
                }
              }))
            }
          })}
        </script>
      </Helmet>

      <AboutContainer itemScope itemType="https://schema.org/AboutPage">
        <Header
          ref={headerRef}
          {...getHeaderAnimationProps()}
        >
          <Title itemProp="name">Bienvenue dans <span>La Cabane d'Eva</span></Title>
          <Subtitle itemProp="description">
            Bonjour ! Je m'appelle Eva, et derrière chaque création que vous voyez ici, il y a une histoire, 
            un sourire, et beaucoup d'amour. Plongez dans un univers où l'art du crochet rencontre la douceur 
            et la créativité.
          </Subtitle>
        </Header>

        <motion.div
          ref={contentRef}
          {...getContentAnimationProps()}
        >
          <Section itemScope itemType="https://schema.org/Article">
            <Content>
              <h2 itemProp="headline">Mon Histoire</h2>
              <div itemProp="articleBody">
                <p>
                  Tout a commencé par un amour simple pour le fait-main. Le crochet était d'abord un passe-temps 
                  pour moi, une manière de décompresser et d'apporter un peu de douceur à mon quotidien. C'est ma 
                  grand-mère qui m'a transmis cette passion, m'enseignant patiemment les techniques traditionnelles.
                </p>
                <p>
                  Rapidement, mes proches ont commencé à passer commande, séduits par l'originalité et la qualité 
                  de mes créations. C'est ainsi qu'est née La Cabane d'Eva, un projet qui me permet aujourd'hui de 
                  partager ma passion avec vous.
                </p>
              </div>
            </Content>
            <ImageWrapper>
              <OptimizedImage
                src="/images/about/histoire.jpg"
                alt="Eva dans son atelier"
                height="400px"
                isHoverable
                itemProp="image"
              />
            </ImageWrapper>
          </Section>

          <Section>
            <Content>
              <h2>Mon Atelier</h2>
              <p>
                C'est dans mon petit atelier, un espace chaleureux et inspirant, que je donne vie à mes créations. 
                Entourée de fils colorés soigneusement sélectionnés et de mes outils préférés, je passe des heures 
                à crocheter avec passion.
              </p>
              <p>
                Chaque pièce est créée dans le respect des traditions artisanales, en utilisant des matériaux de 
                qualité premium choisis pour leur douceur et leur durabilité. Je porte une attention particulière 
                aux finitions pour vous garantir des créations qui traverseront le temps.
              </p>
            </Content>
            <ImageWrapper>
              <OptimizedImage
                src="/images/about/atelier.jpg"
                alt="L'atelier de création"
                height="400px"
                isHoverable
              />
            </ImageWrapper>
          </Section>

          <ProcessSteps>
            <Step variants={itemVariants} number="1">
              <h3>L'Inspiration</h3>
              <p>
                Chaque création commence par une étincelle d'inspiration, puisée dans la nature, 
                les tendances actuelles ou vos demandes personnalisées.
              </p>
            </Step>

            <Step variants={itemVariants} number="2">
              <h3>La Sélection</h3>
              <p>
                Je choisis méticuleusement les matériaux de la plus haute qualité pour garantir 
                la beauté et la durabilité de chaque pièce.
              </p>
            </Step>

            <Step variants={itemVariants} number="3">
              <h3>La Création</h3>
              <p>
                Chaque point est crocheté avec soin et attention, en respectant les techniques 
                traditionnelles tout en y ajoutant ma touche personnelle.
              </p>
            </Step>

            <Step variants={itemVariants} number="4">
              <h3>Les Finitions</h3>
              <p>
                Une attention particulière est portée aux détails et aux finitions pour vous 
                garantir une pièce parfaite et unique.
              </p>
            </Step>
          </ProcessSteps>

          <TestimonialsSection>
            <TestimonialsTitle>Ce qu'en disent mes clients</TestimonialsTitle>
            <TestimonialsContainer itemScope itemType="https://schema.org/ReviewAggregator">
              <NavigationButton 
                className="prev" 
                onClick={prevTestimonial}
                aria-label="Témoignage précédent"
              >
                <FiChevronLeft size={24} />
              </NavigationButton>
              
              <AnimatePresence mode="wait">
                <Testimonial
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <TestimonialText>
                    {testimonials[currentTestimonial].text}
                  </TestimonialText>
                  <TestimonialAuthor>
                    {testimonials[currentTestimonial].author}
                  </TestimonialAuthor>
                  <TestimonialLocation>
                    {testimonials[currentTestimonial].location}
                  </TestimonialLocation>
                </Testimonial>
              </AnimatePresence>

              <NavigationButton 
                className="next" 
                onClick={nextTestimonial}
                aria-label="Témoignage suivant"
              >
                <FiChevronRight size={24} />
              </NavigationButton>
            </TestimonialsContainer>
            
            <ProgressDots
              total={testimonials.length}
              current={currentTestimonial}
              onChange={setCurrentTestimonial}
            />
          </TestimonialsSection>

          <GallerySection itemScope itemType="https://schema.org/ImageGallery">
            <GalleryTitle>Mes Dernières Créations</GalleryTitle>
            <GalleryGrid>
              {galleryImages.map((image, index) => (
                <GalleryItem
                  key={image.id}
                  onClick={() => handleImageClick(index)}
                  whileHover={{ y: -5 }}
                  itemScope
                  itemType="https://schema.org/ImageObject"
                >
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    isHoverable
                    itemProp="contentUrl"
                  />
                  <meta itemProp="name" content={image.alt} />
                </GalleryItem>
              ))}
            </GalleryGrid>
          </GallerySection>

          <CTASection>
            <CTATitle>Envie d'une création unique ?</CTATitle>
            <CTAText>
              Découvrez ma collection de créations artisanales ou parlons ensemble de votre projet personnalisé.
              Chaque pièce est réalisée avec amour et attention, spécialement pour vous.
            </CTAText>
            <CTAButton 
              to="/boutique"
              itemProp="significantLink"
            >
              Découvrir la boutique
            </CTAButton>
          </CTASection>

          <ContactSection itemScope itemType="https://schema.org/ContactPoint">
            <ContactTitle>Une idée, une envie ?</ContactTitle>
            <ContactInfo>
              <p>Je serais ravie d'échanger avec vous sur votre projet personnalisé</p>
              <a 
                href="mailto:contact@lacabanedeva.fr"
                itemProp="email"
              >
                contact@lacabanedeva.fr
              </a>
              <a 
                href="tel:+33612345678"
                itemProp="telephone"
              >
                06 12 34 56 78
              </a>
            </ContactInfo>
          </ContactSection>
        </motion.div>

        <ImageModal
          isOpen={modalImage !== null}
          onClose={handleCloseModal}
          images={galleryImages}
          currentIndex={modalImage || 0}
          onPrevious={handlePreviousImage}
          onNext={handleNextImage}
        />
      </AboutContainer>
    </>
  );
};

export default About; 