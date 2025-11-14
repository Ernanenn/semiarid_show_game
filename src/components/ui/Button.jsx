import styled, { css } from 'styled-components';

const variantStyles = {
  primary: css`
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.primaryHighlight}
    );
    color: ${({ theme }) => theme.colors.text.inverse};

    &:hover:not(:disabled) {
      background: linear-gradient(
        135deg,
        ${({ theme }) => theme.colors.primaryHighlight},
        ${({ theme }) => theme.colors.primary}
      );
    }
  `,
  success: css`
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.success},
      ${({ theme }) => theme.colors.successHighlight}
    );
    color: ${({ theme }) => theme.colors.text.inverse};
  `,
  subtle: css`
    background: rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.colors.text.inverse};
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.18);
    }
  `,
};

const sizeStyles = {
  md: css`
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
    font-size: 1rem;
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
    font-size: 1.1rem;
  `,
};

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  min-height: 3.25rem;
  text-align: center;

  ${({ $block }) =>
    $block &&
    css`
      width: 100%;
    `}

  ${({ $variant = 'primary' }) => variantStyles[$variant] || variantStyles.primary}
  ${({ $size = 'md' }) => sizeStyles[$size] || sizeStyles.md}

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
    transform: none;
  }

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 2.75rem;
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 2.5rem;
    font-size: 0.95rem;
  }
`;

