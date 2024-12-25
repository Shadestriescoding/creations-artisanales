import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Admin from './pages/Admin';

// Layouts
import Layout from './components/layout/Layout';
import AdminLayout from './admin/components/AdminLayout';

// Pages publiques
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';

// Pages admin
import AdminRoutes from './admin/AdminRoutes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <CartProvider>
          <GlobalStyle />
          <Router>
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="shop/:productId" element={<ProductDetails />} />
                <Route path="contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
              </Route>

              {/* Routes admin */}
              <Route path="/admin/*" element={<AdminRoutes />} />

              {/* Route 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
