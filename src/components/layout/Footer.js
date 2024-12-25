import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInstagram, FiMail, FiPhone, FiMapPin, FiHeart } from 'react-icons/fi';

const FooterWrapper = styled.footer`
  background: linear-gradient(
    to bottom,
    ${props => props.theme.colors.backgroundAlt},
    ${props => props.theme.colors.background}
  );
  padding: ${props => props.theme.spacing.xxl} 0 ${props => props.theme.spacing.xl};
  margin-top: auto;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      ${props => props.theme.colors.primary}40,
      transparent
    );
  }
`;

const FooterContent = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.xxl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.lg};
    gap: ${props => props.theme.spacing.xl};
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.titleFont};
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.md};
  position: relative;
  padding-bottom: ${props => props.theme.spacing.sm};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
  }
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.textLight};
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateX(5px);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const ContactItem = styled.a`
  color: ${props => props.theme.colors.textLight};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateX(5px);
  }

  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.textLight};
  font-size: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateY(-3px);
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.sm};
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
`;

const SubscribeButton = styled(motion.button)`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.textLight};
  margin-top: ${props => props.theme.spacing.xxl};
  padding-top: ${props => props.theme.spacing.xl};
  border-top: 1px solid ${props => props.theme.colors.backgroundAlt};
  font-size: 0.9rem;

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SuccessMessage = styled(motion.div)`
  color: ${props => props.theme.colors.success};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.sm};
`;

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // TODO: Implement newsletter subscription
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <SectionTitle>La Cabane d'Eva</SectionTitle>
          <p style={{ color: props => props.theme.colors.textLight }}>
            Créations artisanales au crochet, faites avec amour et passion.
          </p>
          <SocialLinks>
            <SocialLink
              href="https://www.instagram.com/lacabanedeva/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FiInstagram />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Navigation</SectionTitle>
          <FooterLink to="/">Accueil</FooterLink>
          <FooterLink to="/shop">Boutique</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Contact</SectionTitle>
          <ContactInfo>
            <ContactItem href="mailto:contact@lacabanedeva.fr">
              <FiMail /> contact@lacabanedeva.fr
            </ContactItem>
            <ContactItem href="tel:+33600000000">
              <FiPhone /> +33 6 00 00 00 00
            </ContactItem>
            <ContactItem
              href="https://goo.gl/maps/xxx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiMapPin /> Lyon, France
            </ContactItem>
          </ContactInfo>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Newsletter</SectionTitle>
          <p style={{ color: props => props.theme.colors.textLight }}>
            Inscrivez-vous pour recevoir nos dernières créations et actualités.
          </p>
          <NewsletterForm onSubmit={handleSubmit}>
            <NewsletterInput
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <SubscribeButton
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              S'inscrire
            </SubscribeButton>
          </NewsletterForm>
          <AnimatePresence>
            {isSubscribed && (
              <SuccessMessage
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <FiHeart /> Merci pour votre inscription !
              </SuccessMessage>
            )}
          </AnimatePresence>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © {new Date().getFullYear()} La Cabane d'Eva. Fait avec <FiHeart style={{ color: props => props.theme.colors.primary }} /> à Lyon.
        <br />
        <Link to="/mentions-legales">Mentions légales</Link> • <Link to="/cgv">CGV</Link>
      </Copyright>
    </FooterWrapper>
  );
};

export default Footer;
