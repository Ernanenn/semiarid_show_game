import { Component, ErrorInfo, ReactNode } from 'react';
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

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Ocorreu um erro inesperado!</ErrorTitle>
          <ErrorMessage>
            Parece que algo deu errado na aplicação. Por favor, tente recarregar a página.
          </ErrorMessage>
          {this.state.error && (
            <details
              style={{
                whiteSpace: 'pre-wrap',
                textAlign: 'left',
                maxWidth: '100%',
                overflowX: 'auto',
              }}
            >
              <summary>Detalhes do Erro</summary>
              {this.state.error.toString()}
              <br />
              {this.state.errorInfo?.componentStack}
            </details>
          )}
          <Button
            type="button"
            onClick={this.handleReload}
            $variant="primary"
            $size="lg"
            $block
            aria-label="Recarregar página após erro"
          >
            Recarregar Página
          </Button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

