import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from './contexts/ToastContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

// Pages publiques
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

// Pages admin
import Login from './pages/admin/Login';
import { AdminRoutes } from './admin/AdminRoutes';

// Composants communs
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import Toast from './components/common/Toast';
import OfflineNotice from './components/common/OfflineNotice';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <GlobalStyle />
              <ScrollToTop />
              <Toast />
              <OfflineNotice />
              
              <Routes>
                {/* Routes publiques */}
                <Route path="/" element={
                  <>
                    <Header />
                    <Home />
                    <Footer />
                  </>
                } />
                <Route path="/about" element={
                  <>
                    <Header />
                    <About />
                    <Footer />
                  </>
                } />
                <Route path="/contact" element={
                  <>
                    <Header />
                    <Contact />
                    <Footer />
                  </>
                } />
                <Route path="/shop" element={
                  <>
                    <Header />
                    <Shop />
                    <Footer />
                  </>
                } />
                <Route path="/cart" element={
                  <>
                    <Header />
                    <Cart />
                    <Footer />
                  </>
                } />
                <Route path="/checkout" element={
                  <>
                    <Header />
                    <Checkout />
                    <Footer />
                  </>
                } />

                {/* Routes admin */}
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
              </Routes>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App; 