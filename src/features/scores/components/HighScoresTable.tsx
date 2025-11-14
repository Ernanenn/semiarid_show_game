import { useState } from 'react';
import styled from 'styled-components';
import { Panel } from '../../../shared/components/ui/Panel';
import { useScores } from '../hooks/useScores';
import { ScoreFilters } from './ScoreFilters';
import { DEFAULT_HIGH_SCORES_LIMIT } from '../../../shared/constants';
import type { ScoreFilters as ScoreFiltersType } from '../../../shared/types';

const Container = styled(Panel)`
  margin-top: ${({ theme }) => theme.spacing.md};
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.xs};
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.sm}`};
    margin-top: ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const Title = styled.h2`
  font-size: clamp(1rem, 2.2vw, 1.25rem);
  margin: 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: 600;

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: clamp(0.9rem, 3vw, 1.1rem);
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;

  /* Mobile: < 768px - Permitir scroll horizontal se necessário */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: rgba(62, 39, 35, 0.6);
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  table-layout: fixed;

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    border-width: 1px;
    table-layout: auto;
  }
`;

const TableHeader = styled.thead`
  background: ${({ theme }) => theme.colors.primary};
`;

const TableHeaderCell = styled.th`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: 600;
  text-transform: uppercase;
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .short-text {
    display: none;
  }

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: clamp(0.75rem, 0.9vw, 0.85rem);
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.xs} 0.3rem`};
    font-size: clamp(0.65rem, 1.5vw, 0.75rem);
    letter-spacing: 0.2px;
    font-weight: 500;

    .full-text {
      display: none;
    }

    .short-text {
      display: inline;
    }
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(191, 109, 78, 0.1);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transition: background-color 0.2s ease;
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: clamp(0.85rem, 1vw, 0.95rem);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: clamp(0.8rem, 0.95vw, 0.9rem);
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.xs} 0.3rem`};
    font-size: clamp(0.7rem, 1.5vw, 0.8rem);
    line-height: 1.3;
  }
`;

const PositionCell = styled(TableCell)`
  width: 12%;
  max-width: 50px;
`;

const NameCell = styled(TableCell)`
  width: 28%;
  max-width: 120px;
`;

const LocationCell = styled(TableCell)`
  width: 25%;
  max-width: 100px;
`;

const StateCell = styled(TableCell)`
  width: 15%;
  max-width: 80px;
`;

const ScoreCell = styled(TableCell)`
  width: 20%;
  max-width: 70px;
  font-weight: 600;
`;

const LoadingText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.inverse};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const EmptyText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.inverse};
  padding: ${({ theme }) => theme.spacing.lg};
  font-style: italic;
`;

interface HighScoresTableProps {
  limit?: number;
}

export function HighScoresTable({ limit = DEFAULT_HIGH_SCORES_LIMIT }: HighScoresTableProps): JSX.Element {
  const [filters, setFilters] = useState<ScoreFiltersType>({
    state: null,
    location: null,
    days: null,
  });

  const { scores, loading } = useScores(limit, filters);

  const handleFiltersChange = (newFilters: ScoreFiltersType): void => {
    setFilters(newFilters);
  };

  const handleClearFilters = (): void => {
    setFilters({ state: null, location: null, days: null });
  };

  if (loading && scores.length === 0) {
    return (
      <Container>
        <Title>Top {limit} Pontuações</Title>
        <LoadingText>Carregando ranking...</LoadingText>
      </Container>
    );
  }

  const hasActiveFilters = Boolean(filters.state || filters.location || filters.days);
  const titleText = hasActiveFilters ? 'Ranking Filtrado' : `Top ${limit} Pontuações`;

  return (
    <Container>
      <Title>{titleText}</Title>
      <ScoreFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClear={handleClearFilters}
      />
      {loading ? (
        <LoadingText>Carregando...</LoadingText>
      ) : scores.length === 0 ? (
        <EmptyText>
          {hasActiveFilters
            ? 'Nenhuma pontuação encontrada com os filtros selecionados'
            : 'Ainda não há pontuações registradas'}
        </EmptyText>
      ) : (
        <TableWrapper>
          <Table role="table" aria-label="Tabela de pontuações">
            <TableHeader>
              <tr>
                <TableHeaderCell scope="col">
                  <span className="full-text">Posição</span>
                  <span className="short-text">Pos</span>
                </TableHeaderCell>
                <TableHeaderCell scope="col">Nome</TableHeaderCell>
                <TableHeaderCell scope="col">
                  <span className="full-text">Cidade</span>
                  <span className="short-text">Cid</span>
                </TableHeaderCell>
                <TableHeaderCell scope="col">
                  <span className="full-text">Estado</span>
                  <span className="short-text">UF</span>
                </TableHeaderCell>
                <TableHeaderCell scope="col">
                  <span className="full-text">Pontuação</span>
                  <span className="short-text">Pts</span>
                </TableHeaderCell>
              </tr>
            </TableHeader>
            <TableBody>
              {scores.map((score, index) => (
                <TableRow key={score.id}>
                  <PositionCell>{(index + 1)}º</PositionCell>
                  <NameCell>{score.name}</NameCell>
                  <LocationCell>{score.location || '-'}</LocationCell>
                  <StateCell>{score.state || '-'}</StateCell>
                  <ScoreCell>{score.score}%</ScoreCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      )}
    </Container>
  );
}

