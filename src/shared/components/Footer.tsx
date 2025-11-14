import styled from 'styled-components';

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md};
  z-index: 100;
  backdrop-filter: blur(8px);

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const FooterContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  text-align: center;

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }

  /* Desktop: >= 1024px */
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const Copyright = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.typography.small};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
  justify-content: center;

  /* Desktop: >= 1024px */
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: flex-start;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;

  /* Desktop: >= 1024px */
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: flex-end;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text.inverse};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.base};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1.2rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 1.1rem;
  }
`;

const DeveloperName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
`;

const Icon = styled.svg`
  width: 1.2rem;
  height: 1.2rem;
  fill: currentColor;

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 1.1rem;
    height: 1.1rem;
  }
`;

const GmailIcon = (): JSX.Element => (
  <Icon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.546l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
  </Icon>
);

const LinkedInIcon = (): JSX.Element => (
  <Icon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </Icon>
);

const GitHubIcon = (): JSX.Element => (
  <Icon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </Icon>
);

interface FooterProps {
  email: string;
  linkedin: string;
  github: string;
}

export function Footer({ email, linkedin, github }: FooterProps): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer role="contentinfo">
      <FooterContent>
        <Copyright>
          Desenvolvido por <DeveloperName>Ernane Nogueira Nunes</DeveloperName>
          <span>© {currentYear} - Todos os direitos reservados</span>
        </Copyright>
        <SocialLinks role="list">
          {email && (
            <SocialLink
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enviar email para o desenvolvedor"
              title="Email"
              role="listitem"
            >
              <GmailIcon />
            </SocialLink>
          )}
          {linkedin && (
            <SocialLink
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Perfil do desenvolvedor no LinkedIn"
              title="LinkedIn"
              role="listitem"
            >
              <LinkedInIcon />
            </SocialLink>
          )}
          {github && (
            <SocialLink
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Perfil do desenvolvedor no GitHub"
              title="GitHub"
              role="listitem"
            >
              <GitHubIcon />
            </SocialLink>
          )}
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
}
