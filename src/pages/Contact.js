import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiSend } from 'react-icons/fi';
import { useToast } from '../contexts/ToastContext';

const ContactContainer = styled.div`
  max-width: ${props => props.theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xxl};
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.titleFont};
  margin-bottom: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const InfoItem = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.backgroundAlt};
    transform: translateX(5px);
  }

  svg {
    font-size: 1.2rem;
    color: ${props => props.theme.colors.primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-3px);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.large};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
`;

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-family: inherit;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
`;

const SubmitButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
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

  &:disabled {
    background-color: ${props => props.theme.colors.border};
    cursor: not-allowed;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const Contact = () => {
  const { success } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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

    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 1000));

    success('Message envoyé avec succès !');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <ContactContainer>
      <ContactGrid>
        <ContactInfo
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Title>Contactez-nous</Title>
            <Description>
              Vous avez une question ou une demande spéciale ?
              N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.
            </Description>
          </motion.div>

          <InfoList>
            <InfoItem
              href="mailto:contact@lacabanedeva.fr"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <FiMail /> contact@lacabanedeva.fr
            </InfoItem>
            <InfoItem
              href="tel:+33600000000"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <FiPhone /> +33 6 00 00 00 00
            </InfoItem>
            <InfoItem
              href="https://goo.gl/maps/xxx"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <FiMapPin /> Lyon, France
            </InfoItem>
          </InfoList>

          <SocialLinks>
            <SocialLink
              href="https://www.instagram.com/lacabanedeva/"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiInstagram />
            </SocialLink>
          </SocialLinks>
        </ContactInfo>

        <ContactForm
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <FormGroup>
            <Label htmlFor="name">Nom</Label>
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
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="subject">Sujet</Label>
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
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiSend />
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
          </SubmitButton>
        </ContactForm>
      </ContactGrid>
    </ContactContainer>
  );
};

export default Contact;
