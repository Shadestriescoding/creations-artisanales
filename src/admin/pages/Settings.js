import React, { useState } from 'react';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.titleFont};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SettingCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const SettingTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SettingDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9em;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Settings = () => {
  const [settings, setSettings] = useState({
    shopName: 'La Cabane d\'Eva',
    email: 'contact@lacabanedeva.fr',
    currency: 'EUR',
    language: 'fr',
    orderPrefix: 'EVA-',
    notificationEmail: 'notifications@lacabanedeva.fr'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, nous ajouterons la logique pour sauvegarder les paramètres
    console.log('Settings saved:', settings);
  };

  return (
    <SettingsContainer>
      <Title>Paramètres</Title>
      <form onSubmit={handleSubmit}>
        <SettingsGrid>
          <SettingCard>
            <SettingTitle>Informations générales</SettingTitle>
            <SettingDescription>
              Configurez les informations de base de votre boutique
            </SettingDescription>
            <Input
              type="text"
              name="shopName"
              value={settings.shopName}
              onChange={handleChange}
              placeholder="Nom de la boutique"
            />
            <Input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              placeholder="Email de contact"
            />
          </SettingCard>

          <SettingCard>
            <SettingTitle>Préférences régionales</SettingTitle>
            <SettingDescription>
              Définissez la devise et la langue par défaut
            </SettingDescription>
            <Select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
            >
              <option value="EUR">Euro (€)</option>
              <option value="USD">Dollar ($)</option>
              <option value="GBP">Livre Sterling (£)</option>
            </Select>
            <Select
              name="language"
              value={settings.language}
              onChange={handleChange}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </Select>
          </SettingCard>

          <SettingCard>
            <SettingTitle>Paramètres des commandes</SettingTitle>
            <SettingDescription>
              Configurez les options liées aux commandes
            </SettingDescription>
            <Input
              type="text"
              name="orderPrefix"
              value={settings.orderPrefix}
              onChange={handleChange}
              placeholder="Préfixe des commandes"
            />
            <Input
              type="email"
              name="notificationEmail"
              value={settings.notificationEmail}
              onChange={handleChange}
              placeholder="Email de notification"
            />
          </SettingCard>
        </SettingsGrid>
        <Button type="submit" style={{ marginTop: '2rem' }}>
          Enregistrer les modifications
        </Button>
      </form>
    </SettingsContainer>
  );
};

export default Settings;
