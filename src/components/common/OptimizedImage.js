import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { LazyImage } from './LazyImage';

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.height || '100%'};
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.borderRadius || props.theme.borderRadius.medium};
  overflow: hidden;
`;

const StyledImage = styled(LazyImage)`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit || 'cover'};
  transition: transform 0.6s ease;
  
  ${props => props.isHoverable && `
    &:hover {
      transform: scale(1.05);
    }
  `}
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.backgroundAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textLight};
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.backgroundAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.md};
  text-align: center;
  color: ${props => props.theme.colors.error};
`;

const OptimizedImage = ({
  src,
  alt,
  height,
  objectFit,
  borderRadius,
  isHoverable,
  onLoad,
  onError,
  className,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (onError) onError();
  };

  // Sélectionner la taille d'image appropriée selon la largeur d'écran
  useEffect(() => {
    const updateImageSrc = () => {
      const width = window.innerWidth;
      const basePath = src.split('.').slice(0, -1).join('.');
      const extension = src.split('.').pop();

      if (width <= 480) {
        setImageSrc(`${basePath}-small.${extension}`);
      } else if (width <= 768) {
        setImageSrc(`${basePath}-medium.${extension}`);
      } else {
        setImageSrc(`${basePath}-large.${extension}`);
      }
    };

    updateImageSrc();
    window.addEventListener('resize', updateImageSrc);

    return () => {
      window.removeEventListener('resize', updateImageSrc);
    };
  }, [src]);

  return (
    <ImageContainer 
      height={height} 
      borderRadius={borderRadius}
      className={className}
    >
      {!hasError ? (
        <StyledImage
          src={imageSrc}
          alt={alt}
          objectFit={objectFit}
          isHoverable={isHoverable}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      ) : (
        <ErrorMessage>
          Impossible de charger l'image
          <br />
          Veuillez réessayer ultérieurement
        </ErrorMessage>
      )}
      
      {isLoading && !hasError && (
        <Placeholder>
          Chargement...
        </Placeholder>
      )}
    </ImageContainer>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  height: PropTypes.string,
  objectFit: PropTypes.oneOf(['cover', 'contain', 'fill', 'none', 'scale-down']),
  borderRadius: PropTypes.string,
  isHoverable: PropTypes.bool,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  className: PropTypes.string
};

OptimizedImage.defaultProps = {
  objectFit: 'cover',
  isHoverable: false
};

export default OptimizedImage; 