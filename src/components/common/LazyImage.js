import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.height || 'auto'};
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit || 'cover'};
  opacity: ${props => props.isLoaded ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.backgroundAlt};
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => props.isLoaded ? 0 : 1};
  transition: opacity 0.3s ease-in-out;

  &::after {
    content: '';
    width: 30px;
    height: 30px;
    border: 2px solid ${props => props.theme.colors.backgroundLight};
    border-top: 2px solid ${props => props.theme.colors.primary};
    border-radius: 50%;
    animation: ${keyframes`
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    `} 1s linear infinite;
  }
`;

const LazyImage = ({ src, alt, height, objectFit, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  if (error) {
    return (
      <ImageWrapper height={height} className={className}>
        <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
          Image non disponible
        </div>
      </ImageWrapper>
    );
  }

  return (
    <ImageWrapper height={height} className={className}>
      <StyledImage
        src={src}
        alt={alt}
        isLoaded={isLoaded}
        objectFit={objectFit}
      />
      <Placeholder isLoaded={isLoaded} />
    </ImageWrapper>
  );
};

export default LazyImage; 