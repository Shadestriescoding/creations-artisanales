import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: ${props => (props.fullScreen ? '100vh' : '200px')};
  animation: ${fadeIn} 0.3s ease-in;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${props => props.theme.colors.backgroundAlt};
  border-top: 3px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
  font-weight: 500;
`;

const LoadingSpinner = ({ fullScreen, text }) => {
  return (
    <SpinnerWrapper fullScreen={fullScreen}>
      <Spinner />
      {text && <LoadingText>{text}</LoadingText>}
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
