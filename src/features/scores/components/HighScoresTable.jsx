import React from 'react';
import styled from 'styled-components';
import { Panel } from '../../../shared/components/ui/Panel';
import { useScores } from '../hooks/useScores';
import { DEFAULT_HIGH_SCORES_LIMIT } from '../../../shared/constants';

const Container = styled(Panel)`
  margin-top: ${({ theme }) => theme.spacing.lg};
  max-width: 700px;

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 95%;
    padding: ${({ theme }) => theme.spacing.md};
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xs}`};
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`;

const Title = styled.h2`
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: 600;

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: clamp(0.9rem, 3vw, 1.1rem);
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    overflow-x: visible;
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 500px;
  border-collapse: separate;
  border-spacing: 0;
  background: rgba(62, 39, 35, 0.6);
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  table-layout: fixed;

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-width: 100%;
    border-width: 1px;
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
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  white-space: nowrap;

  .short-text {
    display: none;
  }

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: 0.8rem;
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.xs} 0.2rem`};
    font-size: 0.65rem;
    letter-spacing: 0.3px;
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
  font-size: 0.875rem;
  line-height: 1.4;

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: 0.8rem;
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.xs} 0.2rem`};
    font-size: 0.7rem;
    line-height: 1.3;
  }
`;

const PositionCell = styled(TableCell)`
  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 15%;
    min-width: 35px;
  }
`;

const NameCell = styled(TableCell)`
  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 25%;
    min-width: 60px;
  }
`;

const LocationCell = styled(TableCell)`
  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 25%;
    min-width: 70px;
  }
`;

const StateCell = styled(TableCell)`
  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 15%;
    min-width: 50px;
  }
`;

const ScoreCell = styled(TableCell)`
  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 20%;
    min-width: 50px;
    font-weight: 600;
  }
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

export function HighScoresTable({ limit = DEFAULT_HIGH_SCORES_LIMIT }) {
  const { scores, loading } = useScores(limit);

  if (loading) {
    return (
      <Container>
        <Title>Top {limit} Pontuações</Title>
        <LoadingText>Carregando ranking...</LoadingText>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Top {limit} Pontuações</Title>
      {scores.length === 0 ? (
        <EmptyText>Ainda não há pontuações registradas</EmptyText>
      ) : (
        <TableWrapper>
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>
                  <span className="full-text">Posição</span>
                  <span className="short-text">Pos</span>
                </TableHeaderCell>
                <TableHeaderCell>Nome</TableHeaderCell>
                <TableHeaderCell>
                  <span className="full-text">Cidade</span>
                  <span className="short-text">Cid</span>
                </TableHeaderCell>
                <TableHeaderCell>
                  <span className="full-text">Estado</span>
                  <span className="short-text">UF</span>
                </TableHeaderCell>
                <TableHeaderCell>
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

