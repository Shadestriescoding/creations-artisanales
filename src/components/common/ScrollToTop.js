import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Button = styled.button`
  position: fixed;
  bottom: ${props => props.theme.spacing.xl};
  right: ${props => props.theme.spacing.xl};
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.round};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: ${props => props.theme.transitions.medium};
  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  animation: ${fadeIn} 0.3s ease-in-out;
  z-index: ${props => props.theme.zIndex.footer - 1};

  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.hover};
  }

  &::before {
    content: '↑';
    font-size: 1.2rem;
    font-weight: bold;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    bottom: ${props => props.theme.spacing.lg};
    right: ${props => props.theme.spacing.lg};
    width: 35px;
    height: 35px;
  }
`;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Button
      visible={isVisible}
      onClick={scrollToTop}
      aria-label="Retour en haut de page"
    />
  );
};

export default ScrollToTop; 