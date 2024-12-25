import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled(motion.label)`
  display: block;
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.error
    ? props.theme.colors.danger
    : props.theme.colors.text};
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.3s ease;
`;

const baseInputStyles = css`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.error
    ? props.theme.colors.danger
    : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  color: ${props => props.theme.colors.text};
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.error
      ? props.theme.colors.danger
      : props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.error
      ? `${props.theme.colors.danger}20`
      : `${props.theme.colors.primary}20`};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.backgroundAlt};
    cursor: not-allowed;
    opacity: 0.7;
  }

  ${props => props.icon && css`
    padding-left: ${props.theme.spacing.xxl};
  `}
`;

const StyledInput = styled.input`
  ${baseInputStyles}
`;

const StyledTextArea = styled.textarea`
  ${baseInputStyles}
  resize: vertical;
  min-height: 100px;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: ${props => props.hasLabel ? '38px' : '50%'};
  left: ${props => props.theme.spacing.md};
  transform: ${props => props.hasLabel ? 'translateY(-50%)' : 'translateY(-50%)'};
  color: ${props => props.error
    ? props.theme.colors.danger
    : props.theme.colors.textLight};
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: color 0.3s ease;

  svg {
    font-size: 1.2rem;
  }
`;

const ErrorMessage = styled(motion.div)`
  color: ${props => props.theme.colors.danger};
  font-size: 0.85rem;
  margin-top: ${props => props.theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};

  svg {
    font-size: 1rem;
  }
`;

const HelperText = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.85rem;
  margin-top: ${props => props.theme.spacing.xs};
`;

const Input = forwardRef(({
  label,
  error,
  helperText,
  icon,
  multiline,
  ...props
}, ref) => {
  const InputComponent = multiline ? StyledTextArea : StyledInput;

  return (
    <InputWrapper>
      {label && (
        <Label
          error={error}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {label}
        </Label>
      )}

      {icon && (
        <IconWrapper hasLabel={!!label} error={error}>
          {icon}
        </IconWrapper>
      )}

      <InputComponent
        ref={ref}
        error={error}
        icon={icon}
        {...props}
      />

      {error && (
        <ErrorMessage
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {error}
        </ErrorMessage>
      )}

      {helperText && !error && (
        <HelperText>{helperText}</HelperText>
      )}
    </InputWrapper>
  );
});

Input.displayName = 'Input';

export default Input; 