import React, { useState } from 'react';
import { Container, Text, Card, Button, Input, Flex, Spacer, Grid } from '../components/common';
import styled from 'styled-components';
import { FiMail, FiInstagram, FiFacebook } from 'react-icons/fi';

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.5rem;
  }
`;

const Contact = () => {
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

    // Réinitialiser le formulaire
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
    alert('Message envoyé !');
  };

  return (
    <Container size="small">
      <Spacer size="xl" />
      <Text variant="h1" align="center">Contactez-moi</Text>
      <Text variant="subtitle" align="center">
        Une question ? Une commande personnalisée ? N'hésitez pas à me contacter !
      </Text>
      <Spacer size="xl" />

      <Grid columns={1} gap="large">
        <Grid.Item>
          <Card padding="large">
            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap="medium">
                <Input
                  label="Nom"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Sujet"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  as="textarea"
                  rows={6}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ alignSelf: 'flex-end' }}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </Button>
              </Flex>
            </form>
          </Card>
        </Grid.Item>

        <Grid.Item>
          <Card padding="large">
            <Text variant="h3">Retrouvez-moi aussi sur</Text>
            <Spacer size="md" />
            <Flex direction="column" gap="medium">
              <SocialLink href="mailto:contact@lacabanedeva.fr" target="_blank" rel="noopener noreferrer">
                <FiMail />
                contact@lacabanedeva.fr
              </SocialLink>
              <SocialLink href="https://instagram.com/lacabanedeva" target="_blank" rel="noopener noreferrer">
                <FiInstagram />
                @lacabanedeva
              </SocialLink>
              <SocialLink href="https://facebook.com/lacabanedeva" target="_blank" rel="noopener noreferrer">
                <FiFacebook />
                La Cabane d'Eva
              </SocialLink>
            </Flex>
          </Card>
        </Grid.Item>
      </Grid>

      <Spacer size="xxxl" />
    </Container>
  );
};

export default Contact;
