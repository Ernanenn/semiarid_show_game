import styled from 'styled-components';

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: clamp(0.95rem, 1.1vw, 1rem);
  color: ${({ theme }) => theme.colors.accent};

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: clamp(0.85rem, 2vw, 0.95rem);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.92);
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: clamp(1rem, 1.1vw, 1.05rem);
  min-height: 3rem;
  transition: ${({ theme }) => theme.transitions.base};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.success};
    box-shadow: 0 0 0 3px rgba(63, 125, 43, 0.2);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: clamp(0.95rem, 1vw, 1rem);
    min-height: 2.75rem;
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: clamp(0.9rem, 2vw, 0.95rem);
    min-height: 2.5rem;
  }
`;

