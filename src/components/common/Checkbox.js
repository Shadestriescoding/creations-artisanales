import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const CheckboxContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;
  user-select: none;
  position: relative;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledCheckbox = styled(motion.div)`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.error
    ? props.theme.colors.danger
    : props.checked
    ? props.theme.colors.primary
    : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.small};
  background-color: ${props => props.checked
    ? props.theme.colors.primary
    : props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  svg {
    color: white;
    font-size: 0.9rem;
  }

  &:hover {
    border-color: ${props => props.error
      ? props.theme.colors.danger
      : props.theme.colors.primary};
    background-color: ${props => props.checked
      ? props.theme.colors.primaryDark
      : props.theme.colors.background};
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

const Checkbox = forwardRef(({
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

  const checkVariants = {
    checked: {
      scale: 1,
      opacity: 1
    },
    unchecked: {
      scale: 0,
      opacity: 0
    }
  };

  return (
    <div>
      <CheckboxContainer>
        <HiddenCheckbox
          ref={ref}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <StyledCheckbox
          as={motion.div}
          checked={checked}
          error={error}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            initial={checked ? 'checked' : 'unchecked'}
            animate={checked ? 'checked' : 'unchecked'}
            variants={checkVariants}
          >
            <FiCheck />
          </motion.div>
        </StyledCheckbox>
        {label && (
          <Label error={error} disabled={disabled}>
            {label}
          </Label>
        )}
      </CheckboxContainer>

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

Checkbox.displayName = 'Checkbox';

export default Checkbox; 