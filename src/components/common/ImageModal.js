import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import OptimizedImage from './OptimizedImage';
import PropTypes from 'prop-types';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing.xl};
`;

const ModalContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.white};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}40;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${props => props.theme.colors.white};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    transform: translateY(-50%) scale(1.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}40;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: ${props => props.theme.colors.white};
      color: inherit;
      transform: translateY(-50%);
    }
  }

  &.prev {
    left: ${props => props.theme.spacing.xl};
  }
  
  &.next {
    right: ${props => props.theme.spacing.xl};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 32px;
    height: 32px;
    
    &.prev {
      left: ${props => props.theme.spacing.md};
    }
    
    &.next {
      right: ${props => props.theme.spacing.md};
    }
  }
`;

const ImageCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md};
  text-align: center;
  transform: translateY(100%);
  transition: transform 0.3s ease;

  ${ModalContent}:hover & {
    transform: translateY(0);
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  left: ${props => props.theme.spacing.md};
  background: rgba(0, 0, 0, 0.7);
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.9rem;
`;

const ImageModal = ({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  onPrevious, 
  onNext 
}) => {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      onPrevious();
    } else if (e.key === 'ArrowRight') {
      onNext();
    }
  }, [onClose, onPrevious, onNext]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalContent
          onClick={e => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <CloseButton onClick={onClose} aria-label="Fermer">
            <FiX size={24} />
          </CloseButton>

          <ImageCounter>
            {currentIndex + 1} / {images.length}
          </ImageCounter>

          <NavigationButton
            className="prev"
            onClick={onPrevious}
            disabled={currentIndex === 0}
            aria-label="Image précédente"
          >
            <FiChevronLeft size={24} />
          </NavigationButton>

          <OptimizedImage
            src={currentImage.src}
            alt={currentImage.alt}
            height="80vh"
            objectFit="contain"
          />

          <NavigationButton
            className="next"
            onClick={onNext}
            disabled={currentIndex === images.length - 1}
            aria-label="Image suivante"
          >
            <FiChevronRight size={24} />
          </NavigationButton>

          <ImageCaption>
            {currentImage.alt}
          </ImageCaption>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired
    })
  ).isRequired,
  currentIndex: PropTypes.number.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};

export default ImageModal; 