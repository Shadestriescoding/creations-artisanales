import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Login from '../admin/pages/Login';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock du service d'authentification
jest.mock('../services/authService', () => ({
  login: jest.fn((email, password) => {
    if (email === 'admin@lacabanedeva.fr' && password === 'admin123') {
      return Promise.resolve({
        token: 'fake-token',
        user: { id: 1, email, isAdmin: true }
      });
    }
    return Promise.reject(new Error('Identifiants invalides'));
  })
}));

describe('Authentication', () => {
  const renderLogin = () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test('affiche le formulaire de connexion', () => {
    renderLogin();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /connexion/i })).toBeInTheDocument();
  });

  test('permet une connexion réussie', async () => {
    renderLogin();
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'admin@lacabanedeva.fr' }
    });
    
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'admin123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));
    
    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeTruthy();
    });
  });

  test('affiche une erreur pour des identifiants invalides', async () => {
    renderLogin();
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@email.com' }
    });
    
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'wrongpassword' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/identifiants invalides/i)).toBeInTheDocument();
    });
  });

  test('vérifie la validation des champs', async () => {
    renderLogin();
    
    // Test avec email vide
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: '' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/l'email est requis/i)).toBeInTheDocument();
    });
    
    // Test avec email invalide
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalidemail' }
    });
    
    await waitFor(() => {
      expect(screen.getByText(/email invalide/i)).toBeInTheDocument();
    });
    
    // Test avec mot de passe vide
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: '' }
    });
    
    await waitFor(() => {
      expect(screen.getByText(/le mot de passe est requis/i)).toBeInTheDocument();
    });
  });

  test('permet la déconnexion', async () => {
    const TestComponent = () => {
      const { logout } = useAuth();
      return <button onClick={logout}>Déconnexion</button>;
    };

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );

    // Simuler une connexion
    localStorage.setItem('token', 'fake-token');
    
    fireEvent.click(screen.getByText(/déconnexion/i));
    
    expect(localStorage.getItem('token')).toBeNull();
  });
}); 