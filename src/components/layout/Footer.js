import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.spacing.xxl} 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.xl};
`;

const FooterSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: 1.2rem;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    margin-bottom: ${props => props.theme.spacing.sm};
  }
  
  a {
    color: ${props => props.theme.colors.textLight};
    text-decoration: none;
    transition: ${props => props.theme.transitions.fast};
    
    &:hover {
      color: ${props => props.theme.colors.primary};
      padding-left: ${props => props.theme.spacing.xs};
    }
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-family: ${props => props.theme.typography.bodyFont};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`;

const SubscribeButton = styled.button`
  padding: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
  
  a {
    color: ${props => props.theme.colors.text};
    font-size: 1.5rem;
    transition: ${props => props.theme.transitions.fast};
    
    &:hover {
      color: ${props => props.theme.colors.primary};
      transform: translateY(-2px);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textLight};
  border-top: 1px solid ${props => props.theme.colors.primary}20;
  margin-top: ${props => props.theme.spacing.xl};
  max-width: ${props => props.theme.container.maxWidth};
  margin: ${props => props.theme.spacing.xl} auto 0;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md} 0;
`;

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implémenter l'inscription à la newsletter
    console.log('Email souscrit:', email);
    setEmail('');
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>La Cabane d'Eva</h3>
          <p>Créations artisanales au crochet par Eva Beguet, artiste passionnée spécialisée dans les amigurumis et décorations au crochet.</p>
          <SocialLinks>
            <a href="https://www.instagram.com/yunevalden?igsh=dGdyZW8zM2w0dGJo" target="_blank" rel="noopener noreferrer" title="Instagram">📸</a>
            <a href="https://www.linkedin.com/in/eva-beguet-14841894" target="_blank" rel="noopener noreferrer" title="LinkedIn">💼</a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Navigation</h3>
          <FooterLinks>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/boutique">Boutique</Link></li>
            <li><Link to="/a-propos">À propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Informations</h3>
          <FooterLinks>
            <li><Link to="/livraison">Livraison</Link></li>
            <li><Link to="/cgv">CGV</Link></li>
            <li><Link to="/mentions-legales">Mentions légales</Link></li>
            <li><Link to="/confidentialite">Politique de confidentialité</Link></li>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Newsletter</h3>
          <p>Inscrivez-vous pour recevoir nos nouveautés et offres exclusives !</p>
          <NewsletterForm onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <SubscribeButton type="submit">S'inscrire</SubscribeButton>
          </NewsletterForm>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © {new Date().getFullYear()} La Cabane d'Eva. Tous droits réservés.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 