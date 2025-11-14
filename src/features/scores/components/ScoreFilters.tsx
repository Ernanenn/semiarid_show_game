import { useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Button } from '../../../shared/components/ui/Button';
import { Field, Label } from '../../../shared/components/ui/Input';
import { useScoreFilters } from '../hooks/useScores';
import type { ScoreFilters as ScoreFiltersType } from '../../../shared/types';

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  /* Desktop: >= 1024px */
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    align-items: flex-end;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const FilterRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.sm};
    
    /* Botão ocupa toda a largura quando há filtros */
    & > button {
      grid-column: 1 / -1;
    }
  }

  /* Desktop: >= 1024px */
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr) auto;
    flex: 1;
    gap: ${({ theme }) => theme.spacing.sm};
    align-items: end;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.92);
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.9rem;
  min-height: 2.5rem;
  transition: ${({ theme }) => theme.transitions.base};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.success};
    box-shadow: 0 0 0 3px rgba(63, 125, 43, 0.2);
  }

  /* Mobile: < 768px */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: 0.85rem;
    min-height: 2.25rem;
  }
`;

const ClearButton = styled(Button).attrs({
  $variant: 'subtle',
  $size: 'md',
})`
  white-space: nowrap;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.xs};

  /* Tablet: 768px - 1023px */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
    margin-top: 0;
  }

  /* Desktop: >= 1024px */
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: auto;
    min-width: 140px;
    margin-top: 0;
    margin-left: ${({ theme }) => theme.spacing.sm};
    align-self: end;
  }
`;

interface ScoreFiltersProps {
  filters: ScoreFiltersType;
  onFiltersChange: (filters: ScoreFiltersType) => void;
  onClear: () => void;
}

export function ScoreFilters({ filters, onFiltersChange, onClear }: ScoreFiltersProps): JSX.Element {
  const { states, locations, loadStates, loadLocations } = useScoreFilters();
  const [localFilters, setLocalFilters] = useState<ScoreFiltersType>(filters);

  useEffect(() => {
    loadStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localFilters.state) {
      loadLocations(localFilters.state);
    } else {
      loadLocations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localFilters.state]);

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const newFilters: ScoreFiltersType = {
      ...localFilters,
      state: e.target.value || null,
      location: null, // Limpa cidade quando muda estado
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const newFilters: ScoreFiltersType = {
      ...localFilters,
      location: e.target.value || null,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDaysChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const newFilters: ScoreFiltersType = {
      ...localFilters,
      days: e.target.value ? Number.parseInt(e.target.value, 10) : null,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClear = (): void => {
    const cleared: ScoreFiltersType = { state: null, location: null, days: null };
    setLocalFilters(cleared);
    onClear();
  };

  const hasFilters = Boolean(localFilters.state || localFilters.location || localFilters.days);

  return (
    <FiltersContainer role="group" aria-label="Filtros de pontuação">
      <FilterRow>
        <Field>
          <Label htmlFor="filter-state">Estado</Label>
          <Select
            id="filter-state"
            value={localFilters.state || ''}
            onChange={handleStateChange}
            aria-label="Filtrar por estado"
          >
            <option value="">Todos os estados</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <Label htmlFor="filter-location">Cidade</Label>
          <Select
            id="filter-location"
            value={localFilters.location || ''}
            onChange={handleLocationChange}
            disabled={!localFilters.state}
            aria-label="Filtrar por cidade"
            aria-disabled={!localFilters.state}
          >
            <option value="">Todas as cidades</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <Label htmlFor="filter-days">Período</Label>
          <Select
            id="filter-days"
            value={localFilters.days || ''}
            onChange={handleDaysChange}
            aria-label="Filtrar por período"
          >
            <option value="">Todos os tempos</option>
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
          </Select>
        </Field>

        {hasFilters && (
          <ClearButton type="button" onClick={handleClear} aria-label="Limpar todos os filtros">
            Limpar Filtros
          </ClearButton>
        )}
      </FilterRow>
    </FiltersContainer>
  );
}

