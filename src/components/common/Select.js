import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

const SelectWrapper = styled.div`
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

const SelectButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.error
    ? props.theme.colors.danger
    : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  color: ${props => props.placeholder && !props.value
    ? props.theme.colors.textLight
    : props.theme.colors.text};
  font-family: inherit;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.md};

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

  svg {
    font-size: 1.2rem;
    color: ${props => props.theme.colors.textLight};
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const OptionsContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: ${props => props.theme.spacing.xs};
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.large};
  z-index: 100;
  max-height: 250px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.backgroundAlt};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: 4px;

    &:hover {
      background: ${props => props.theme.colors.primary}40;
    }
  }
`;

const Option = styled(motion.button)`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-family: inherit;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.md};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.backgroundAlt};
  }

  svg {
    font-size: 1.2rem;
    color: ${props => props.theme.colors.primary};
    opacity: ${props => props.selected ? 1 : 0};
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

const Select = forwardRef(({
  label,
  options,
  value,
  onChange,
  placeholder = 'Sélectionner une option',
  error,
  helperText,
  disabled,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scaleY: 0.5,
      transformOrigin: 'top'
    },
    visible: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scaleY: 0.5,
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  };

  const optionVariants = {
    hidden: {
      opacity: 0,
      x: -10
    },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2
      }
    }),
    hover: {
      x: 5
    }
  };

  return (
    <SelectWrapper>
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

      <SelectButton
        ref={ref}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        error={error}
        disabled={disabled}
        isOpen={isOpen}
        value={value}
        placeholder={placeholder}
        {...props}
      >
        <span>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FiChevronDown />
      </SelectButton>

      <AnimatePresence>
        {isOpen && !disabled && (
          <OptionsContainer
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            {options.map((option, i) => (
              <Option
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                selected={option.value === value}
                custom={i}
                variants={optionVariants}
                whileHover="hover"
              >
                <span>{option.label}</span>
                <FiCheck />
              </Option>
            ))}
          </OptionsContainer>
        )}
      </AnimatePresence>

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
    </SelectWrapper>
  );
});

Select.displayName = 'Select';

export default Select; 