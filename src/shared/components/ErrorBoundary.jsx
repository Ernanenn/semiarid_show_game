import React from 'react';
import styled from 'styled-components';
import { Panel } from './ui/Panel';
import { Button } from './ui/Button';

const ErrorContainer = styled(Panel)`
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 520px;
  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.text.inverse};
`;

const ErrorTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.subtitle};
  margin: 0;
  color: ${({ theme }) => theme.colors.text.inverse};
`;

const ErrorMessage = styled.p`
  margin: 0;
  font-size: 1rem;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Ocorreu um erro inesperado!</ErrorTitle>
          <ErrorMessage>
            Parece que algo deu errado na aplicação. Por favor, tente recarregar a página.
          </ErrorMessage>
          {this.state.error && (
            <details style={{ whiteSpace: 'pre-wrap', textAlign: 'left', maxWidth: '100%', overflowX: 'auto' }}>
              <summary>Detalhes do Erro</summary>
              {this.state.error.toString()}
              <br />
              {this.state.errorInfo?.componentStack}
            </details>
          )}
          <Button type="button" onClick={this.handleReload} $variant="primary" $size="lg" $block>
            Recarregar Página
          </Button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

