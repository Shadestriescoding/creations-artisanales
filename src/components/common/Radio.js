import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const RadioContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;
  user-select: none;
  position: relative;
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledRadio = styled(motion.div)`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.error
    ? props.theme.colors.danger
    : props.checked
    ? props.theme.colors.primary
    : props.theme.colors.border};
  border-radius: 50%;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.primary};
    opacity: ${props => props.checked ? 1 : 0};
    transform: scale(${props => props.checked ? 1 : 0});
    transition: all 0.2s ease;
  }

  &:hover {
    border-color: ${props => props.error
      ? props.theme.colors.danger
      : props.theme.colors.primary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.error
      ? `${props.theme.colors.danger}20`
      : `${props.theme.colors.primary}20`};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  color: ${props => props.error
    ? props.theme.colors.danger
    : props.theme.colors.text};
  font-size: 0.95rem;
  line-height: 1.4;
  cursor: pointer;

  &:hover {
    color: ${props => props.error
      ? props.theme.colors.danger
      : props.theme.colors.primary};
  }
`;

const ErrorMessage = styled(motion.div)`
  color: ${props => props.theme.colors.danger};
  font-size: 0.85rem;
  margin-top: ${props => props.theme.spacing.xs};
`;

const HelperText = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.85rem;
  margin-top: ${props => props.theme.spacing.xs};
`;

const Radio = forwardRef(({
  label,
  checked,
  onChange,
  error,
  helperText,
  disabled,
  ...props
}, ref) => {
  const handleChange = (e) => {
    if (!disabled && onChange) {
      onChange(e);
    }
  };

  return (
    <div>
      <RadioContainer>
        <HiddenRadio
          ref={ref}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <StyledRadio
          as={motion.div}
          checked={checked}
          error={error}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 1 }}
          animate={{
            scale: checked ? 1 : 1,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 20
            }
          }}
        />
        {label && (
          <Label error={error} disabled={disabled}>
            {label}
          </Label>
        )}
      </RadioContainer>

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
    </div>
  );
});

Radio.displayName = 'Radio';

export default Radio; 