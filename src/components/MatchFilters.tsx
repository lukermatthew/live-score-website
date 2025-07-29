"use client";

import styled from "styled-components";
import type { Match } from "@/types/match";

const Filters = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  flex-wrap: wrap;
  font-family: var(--font-barlow);

  @media (min-width: 640px) {
    gap: 0.75rem;
    padding: 1.25rem 1.5rem;
  }

  @media (min-width: 768px) {
    gap: 1rem;
    padding: 1.5rem 2rem;
  }
`;

const Button = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? "#919230" : "#374151")};
  color: white;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;
  font-family: var(--font-barlow);

  @media (min-width: 640px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    border-radius: 8px;
  }

  &:hover {
    background: ${({ $active }) => ($active ? "#919230" : "#4b5563")};
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const filterMap = {
  all: () => true,
  finished: (m: Match) => m.status.type === "finished",
  inprogress: (m: Match) => m.status.type === "inprogress",
  notstarted: (m: Match) => m.status.type === "notstarted",
};

const filterLabels: Record<keyof typeof filterMap, string> = {
  all: "All",
  finished: "Results",
  inprogress: "Live",
  notstarted: "Upcoming",
};

interface MatchFiltersProps {
  activeFilter: keyof typeof filterMap;
  onFilterChange: (filter: keyof typeof filterMap) => void;
  matches: Match[];
}

export default function MatchFilters({
  activeFilter,
  onFilterChange,
  matches,
}: MatchFiltersProps) {
  return (
    <Filters>
      {Object.entries(filterMap).map(([key, fn]) => {
        const typedKey = key as keyof typeof filterMap;
        return (
          <Button
            key={key}
            $active={activeFilter === typedKey}
            onClick={() => onFilterChange(typedKey)}
          >
            {filterLabels[typedKey]} ({matches.filter(fn).length})
          </Button>
        );
      })}
    </Filters>
  );
}
