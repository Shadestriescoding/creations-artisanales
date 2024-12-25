import styled, { css } from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxs};
  width: 100%;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 500;
`;

const HelperText = styled.span`
  color: ${({ theme, error }) => error ? theme.colors.error : theme.colors.textLight};
  font-size: ${({ theme }) => theme.typography.tiny};
  margin-top: ${({ theme }) => theme.spacing.xxs};
`;

const getInputStyles = ({ error, success }) => {
  if (error) {
    return css`
      border-color: ${({ theme }) => theme.colors.error};
      &:focus {
        border-color: ${({ theme }) => theme.colors.error};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.error}20;
      }
    `;
  }
  if (success) {
    return css`
      border-color: ${({ theme }) => theme.colors.success};
      &:focus {
        border-color: ${({ theme }) => theme.colors.success};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.success}20;
      }
    `;
  }
  return css`
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    }
  `;
};

const StyledInput = styled.input`
  height: ${({ theme }) => theme.components.input.height};
  padding: 0 ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body};
  transition: ${({ theme }) => theme.transitions.fast};
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    cursor: not-allowed;
    opacity: 0.7;
  }

  ${getInputStyles}
`;

const Input = ({
  label,
  helperText,
  error,
  success,
  ...props
}) => {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <StyledInput
        error={error}
        success={success}
        {...props}
      />
      {helperText && (
        <HelperText error={error}>
          {helperText}
        </HelperText>
      )}
    </InputWrapper>
  );
};

export default Input; 