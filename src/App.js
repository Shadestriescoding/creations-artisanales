import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { ProductGallery } from './components/ProductGallery';
import { Cart } from './components/Cart';
import { Notification } from './components/Notification';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;

const Header = styled.header`
  background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryLight});
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${props => props.theme.shadows.medium};
  position: sticky;
  top: 0;
  z-index: 100;
  
  h1 {
    font-family: ${props => props.theme.typography.titleFont};
    font-size: ${props => props.theme.typography.h1.fontSize};
    margin: 0;
    font-weight: 600;
    letter-spacing: -0.5px;
    background: linear-gradient(45deg, #FFFFFF, #F0F0F0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: ${props => props.theme.typography.h2.fontSize};
    }
  }
`;

const CartButton = styled.button`
  background: ${props => props.theme.colors.white}20;
  border: 2px solid ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.body.fontSize};
  font-weight: 600;
  transition: ${props => props.theme.transitions.medium};
  backdrop-filter: blur(5px);
  
  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.small};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
    font-size: 0.9rem;
  }
`;

const CartCount = styled.span`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.round};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: ${props => props.theme.shadows.small};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 20px;
    height: 20px;
    font-size: 0.8rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  font-family: ${props => props.theme.typography.titleFont};
  font-size: ${props => props.theme.typography.h2.fontSize};
  color: ${props => props.theme.colors.textLight};
  background: linear-gradient(45deg, ${props => props.theme.colors.backgroundAlt}, ${props => props.theme.colors.background});
`;

// Données de test - À remplacer par des vraies données plus tard
const sampleProducts = [
  {
    id: 1,
    name: "Bracelet en perles roses",
    price: 25.99,
    image: "https://via.placeholder.com/400/ff69b4/ffffff?text=Bracelet+Perles",
    category: "bijoux"
  },
  {
    id: 2,
    name: "Collier artisanal doré",
    price: 35.50,
    image: "https://via.placeholder.com/400/ffd700/ffffff?text=Collier+Dore",
    category: "bijoux"
  },
  {
    id: 3,
    name: "Boucles d'oreilles fleuries",
    price: 19.99,
    image: "https://via.placeholder.com/400/98fb98/ffffff?text=Boucles+Fleuries",
    category: "bijoux"
  },
  {
    id: 4,
    name: "Sac en macramé",
    price: 45.00,
    image: "https://via.placeholder.com/400/deb887/ffffff?text=Sac+Macrame",
    category: "accessoires"
  },
  {
    id: 5,
    name: "Pochette en tissu",
    price: 29.99,
    image: "https://via.placeholder.com/400/f0e68c/ffffff?text=Pochette",
    category: "accessoires"
  },
  {
    id: 6,
    name: "Porte-clés personnalisé",
    price: 12.99,
    image: "https://via.placeholder.com/400/add8e6/ffffff?text=Porte-cles",
    category: "accessoires"
  },
  {
    id: 7,
    name: "Bracelet en cuir tressé",
    price: 28.50,
    image: "https://via.placeholder.com/400/8b4513/ffffff?text=Bracelet+Cuir",
    category: "bijoux"
  },
  {
    id: 8,
    name: "Bandeau cheveux bohème",
    price: 15.99,
    image: "https://via.placeholder.com/400/da70d6/ffffff?text=Bandeau",
    category: "accessoires"
  },
  {
    id: 9,
    name: "Bague ajustable fleur",
    price: 22.99,
    image: "https://via.placeholder.com/400/ff1493/ffffff?text=Bague+Fleur",
    category: "bijoux"
  },
  {
    id: 10,
    name: "Porte-monnaie coloré",
    price: 18.50,
    image: "https://via.placeholder.com/400/20b2aa/ffffff?text=Porte-monnaie",
    category: "accessoires"
  }
];

export const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un temps de chargement pour les images
    const loadImages = async () => {
      try {
        await Promise.all(
          sampleProducts.map(
            product =>
              new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = () => resolve(); // Continue même si une image échoue
                img.src = product.image;
              })
          )
        );
      } catch (error) {
        console.error('Erreur lors du chargement des images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier:', error);
      setNotification({
        message: 'Erreur lors de la sauvegarde du panier',
        type: 'error'
      });
    }
  }, [cartItems]);

  const handleAddToCart = (product) => {
    try {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        if (existingItem) {
          setNotification({
            message: `Quantité de ${product.name} mise à jour`,
            type: 'success'
          });
          return prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        setNotification({
          message: `${product.name} ajouté au panier`,
          type: 'success'
        });
        return [...prevItems, { ...product, quantity: 1 }];
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      setNotification({
        message: 'Erreur lors de l\'ajout au panier',
        type: 'error'
      });
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    try {
      if (newQuantity < 1) {
        const product = cartItems.find(item => item.id === productId);
        if (!product) throw new Error('Produit non trouvé');
        
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
        setNotification({
          message: `${product.name} retiré du panier`,
          type: 'warning'
        });
      } else {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la quantité:', error);
      setNotification({
        message: 'Erreur lors de la mise à jour de la quantité',
        type: 'error'
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppContainer>
          <Header>
            <h1>Boutique Artisanale</h1>
          </Header>
          <LoadingContainer>
            Chargement...
          </LoadingContainer>
        </AppContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <h1>Boutique Artisanale</h1>
          <CartButton onClick={() => setIsCartOpen(true)}>
            Panier <CartCount>{cartItemsCount}</CartCount>
          </CartButton>
        </Header>
        
        <ProductGallery 
          products={sampleProducts} 
          onAddToCart={handleAddToCart}
        />
        
        <Cart 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
        />
        
        {notification && (
          <Notification 
            message={notification.message} 
            type={notification.type}
            onClose={handleCloseNotification}
          />
        )}
      </AppContainer>
    </ThemeProvider>
  );
}; 