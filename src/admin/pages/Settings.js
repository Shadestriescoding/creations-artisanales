import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { settingsService } from '../../services/settingsService';

const SettingsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.typography.titleFont};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 500px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.body};
  transition: ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.soft};
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.medium};
  align-self: flex-start;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textLight};
    cursor: not-allowed;
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.border};
    transition: ${({ theme }) => theme.transitions.medium};
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: ${({ theme }) => theme.transitions.medium};
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  input:checked + span:before {
    transform: translateX(26px);
  }
`;

export const Settings = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [settings, setSettings] = useState({
    siteName: "",
    email: "",
    phone: "",
    address: "",
    notificationsEnabled: true,
    maintenanceMode: false,
    socialMedia: {
      instagram: "",
      facebook: "",
      pinterest: ""
    },
    seo: {
      metaDescription: "",
      keywords: ""
    }
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (error) {
      showToast('Erreur lors du chargement des paramètres', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [section, key] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await settingsService.updateSettings(settings);
      showToast('Paramètres sauvegardés avec succès', 'success');
      
      if (settings.maintenanceMode) {
        await settingsService.toggleMaintenanceMode(true);
        showToast('Mode maintenance activé', 'info');
      }
    } catch (error) {
      showToast('Erreur lors de la sauvegarde des paramètres', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <SettingsContainer>
      <Section>
        <Title>Paramètres généraux</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="siteName">Nom du site</Label>
            <Input
              type="text"
              id="siteName"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email de contact</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="address">Adresse</Label>
            <Input
              type="text"
              id="address"
              name="address"
              value={settings.address}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <ToggleSwitch>
                <input
                  type="checkbox"
                  name="notificationsEnabled"
                  checked={settings.notificationsEnabled}
                  onChange={handleChange}
                />
                <span></span>
              </ToggleSwitch>
              {' '}Notifications par email
            </Label>
          </FormGroup>

          <FormGroup>
            <Label>
              <ToggleSwitch>
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                />
                <span></span>
              </ToggleSwitch>
              {' '}Mode maintenance
            </Label>
          </FormGroup>

          <Section>
            <Title>Réseaux sociaux</Title>
            <FormGroup>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                type="url"
                id="instagram"
                name="socialMedia.instagram"
                value={settings.socialMedia.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/..."
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                type="url"
                id="facebook"
                name="socialMedia.facebook"
                value={settings.socialMedia.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/..."
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="pinterest">Pinterest</Label>
              <Input
                type="url"
                id="pinterest"
                name="socialMedia.pinterest"
                value={settings.socialMedia.pinterest}
                onChange={handleChange}
                placeholder="https://pinterest.com/..."
              />
            </FormGroup>
          </Section>

          <Section>
            <Title>SEO</Title>
            <FormGroup>
              <Label htmlFor="metaDescription">Description meta</Label>
              <Input
                as="textarea"
                id="metaDescription"
                name="seo.metaDescription"
                value={settings.seo.metaDescription}
                onChange={handleChange}
                placeholder="Description pour les moteurs de recherche..."
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="keywords">Mots-clés</Label>
              <Input
                type="text"
                id="keywords"
                name="seo.keywords"
                value={settings.seo.keywords}
                onChange={handleChange}
                placeholder="mot-clé1, mot-clé2, ..."
              />
            </FormGroup>
          </Section>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        </Form>
      </Section>
    </SettingsContainer>
  );
}; 