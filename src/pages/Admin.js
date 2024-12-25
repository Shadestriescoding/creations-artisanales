import React, { useState } from 'react';
import { Container, Text, Flex, Button, Spacer } from '../components/common';
import ProductManager from '../components/admin/ProductManager';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('products');

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const tabs = [
    { id: 'products', label: 'Produits' },
    { id: 'orders', label: 'Commandes' },
    { id: 'settings', label: 'Paramètres' }
  ];

  return (
    <Container>
      <Spacer size="xl" />
      <Text variant="h1" align="center">Administration</Text>
      <Spacer size="xl" />

      <Flex justify="center" gap="small">
        {tabs.map(tab => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'outline'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </Flex>

      <Spacer size="xl" />

      {activeTab === 'products' && <ProductManager />}
      {activeTab === 'orders' && <Text>Gestion des commandes à venir</Text>}
      {activeTab === 'settings' && <Text>Paramètres à venir</Text>}

      <Spacer size="xxxl" />
    </Container>
  );
};

export default Admin;
