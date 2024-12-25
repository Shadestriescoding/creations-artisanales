import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SwitchContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;
  user-select: none;
  position: relative;
`;

const HiddenSwitch = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledSwitch = styled(motion.div)`
  width: 44px;
  height: 24px;
  background-color: ${props => props.checked
    ? props.theme.colors.primary
    : props.error
    ? props.theme.colors.danger
    : props.theme.colors.border};
  border-radius: 12px;
  padding: 2px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.checked
      ? props.theme.colors.primaryDark
      : props.error
      ? props.theme.colors.danger
      : props.theme.colors.borderHover};
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

const Thumb = styled(motion.div)`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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

const Switch = forwardRef(({
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

  const spring = {
    type: 'spring',
    stiffness: 500,
    damping: 30
  };

  return (
    <div>
      <SwitchContainer>
        <HiddenSwitch
          ref={ref}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <StyledSwitch
          as={motion.div}
          checked={checked}
          error={error}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Thumb
            initial={false}
            animate={{
              x: checked ? 20 : 0,
              scale: checked ? 1.1 : 1
            }}
            transition={spring}
          />
        </StyledSwitch>
        {label && (
          <Label error={error} disabled={disabled}>
            {label}
          </Label>
        )}
      </SwitchContainer>

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

Switch.displayName = 'Switch';

export default Switch; 