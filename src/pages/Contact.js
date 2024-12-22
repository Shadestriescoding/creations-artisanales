import React, { useState } from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
`;

const Title = styled.h1`
  text-align: center;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xxl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled.form`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  
  label {
    display: block;
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.text};
    font-weight: 500;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-family: ${props => props.theme.typography.bodyFont};
  transition: ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-family: ${props => props.theme.typography.bodyFont};
  min-height: 150px;
  resize: vertical;
  transition: ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: ${props => props.theme.transitions.medium};
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled.div`
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

const ContactMethod = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  .icon {
    font-size: 1.5rem;
    color: ${props => props.theme.colors.primary};
  }
  
  .info {
    h3 {
      color: ${props => props.theme.colors.text};
      margin-bottom: ${props => props.theme.spacing.xs};
    }
    
    p {
      color: ${props => props.theme.colors.textLight};
      margin: 0;
    }
    
    a {
      color: ${props => props.theme.colors.primary};
      text-decoration: none;
      
      &:hover {
        color: ${props => props.theme.colors.accent};
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: ${props => props.theme.colors.backgroundAlt};
    border-radius: ${props => props.theme.borderRadius.round};
    color: ${props => props.theme.colors.text};
    font-size: 1.2rem;
    transition: ${props => props.theme.transitions.fast};
    
    &:hover {
      background-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.white};
      transform: translateY(-2px);
    }
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implémenter l'envoi du formulaire
    console.log('Formulaire soumis:', formData);
    
    // Simuler un délai
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <ContactContainer>
      <Title>
        Contactez <span>La Cabane d'Eva</span>
      </Title>
      
      <ContactGrid>
        <ContactForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">Nom</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="subject">Sujet</label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="message">Message</label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
          </SubmitButton>
        </ContactForm>

        <ContactInfo>
          <h2>Informations de contact</h2>
          <p>
            N'hésitez pas à me contacter pour toute question concernant mes créations, 
            une commande personnalisée ou simplement pour échanger sur notre passion commune !
          </p>

          <ContactMethod>
            <div className="icon">📧</div>
            <div className="info">
              <h3>Email</h3>
              <p><a href="mailto:contact@lacabanedeva.fr">contact@lacabanedeva.fr</a></p>
            </div>
          </ContactMethod>

          <ContactMethod>
            <div className="icon">📍</div>
            <div className="info">
              <h3>Localisation</h3>
              <p>Lyon, France</p>
            </div>
          </ContactMethod>

          <ContactMethod>
            <div className="icon">⏰</div>
            <div className="info">
              <h3>Délai de réponse</h3>
              <p>Sous 24-48h</p>
            </div>
          </ContactMethod>

          <h3>Suivez-moi sur les réseaux sociaux</h3>
          <SocialLinks>
            <a href="https://www.instagram.com/yunevalden?igsh=dGdyZW8zM2w0dGJo" target="_blank" rel="noopener noreferrer" title="Instagram">
              📸
            </a>
            <a href="https://www.linkedin.com/in/eva-beguet-14841894" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              💼
            </a>
          </SocialLinks>
        </ContactInfo>
      </ContactGrid>
    </ContactContainer>
  );
};

export default Contact; 