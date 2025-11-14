import styled from 'styled-components';

export const Panel = styled.section`
  width: 100%;
  max-width: ${({ $maxWidth = '720px' }) => $maxWidth};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.md};
  backdrop-filter: blur(8px);
  color: ${({ theme }) => theme.colors.text.inverse};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.radii.md};
  }
`;

