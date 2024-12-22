import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Orders } from './pages/Orders';
import { Customers } from './pages/Customers';
import { Stats } from './pages/Stats';

// Ces composants seront créés plus tard
const Settings = () => <div>Page des paramètres (à venir)</div>;

// Middleware de protection des routes admin (à implémenter avec l'authentification)
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; // À remplacer par une vraie vérification
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
        <Route path="stats" element={<Stats />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}; 