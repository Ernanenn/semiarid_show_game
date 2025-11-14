import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    overflow-x: hidden;
    overflow-y: hidden;
    height: 100%;

    /* Mobile: < 768px - Habilitar scroll vertical */
    @media (max-width: 768px) {
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.primary};
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;

    /* Mobile: < 768px - Habilitar scroll vertical */
    @media (max-width: 768px) {
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      height: auto;
      min-height: 100vh;
    }
  }

  #root {
    height: 100vh;
    display: flex;
    overflow-x: hidden;
    overflow-y: hidden;

    /* Mobile: < 768px - Habilitar scroll vertical */
    @media (max-width: 768px) {
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      height: auto;
      min-height: 100vh;
    }
  }

  button {
    font-family: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

