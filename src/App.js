import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { theme } from './styles/theme';
import { ToastProvider } from './contexts/ToastContext';

// Composants de mise en page
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import LoadingSpinner from './components/common/LoadingSpinner';

// Chargement paresseux des pages
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Admin = lazy(() => import('./pages/Admin'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <GlobalStyle />
        <Router>
          <div className="app">
            <Header />
            <main>
              <Suspense fallback={<LoadingSpinner text="Chargement..." />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/boutique" element={<Shop />} />
                  <Route path="/a-propos" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/panier" element={<Cart />} />
                  <Route path="/commande" element={<Checkout />} />
                  <Route path="/admin/*" element={<Admin />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App; 