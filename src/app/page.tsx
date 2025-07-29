"use client";

import MatchCard from "@/components/MatchCard";
import MatchFilters, { filterMap } from "@/components/MatchFilters";
import data from "@/data/sports.json";
import type { Match } from "@/types/match";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  font-family: var(--font-barlow);
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.25rem;
    padding: 1.5rem;
  }

  @media (min-width: 768px) {
    gap: 1.5rem;
    padding: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  }
`;

export default function Home() {
  const [filter, setFilter] = useState<keyof typeof filterMap>("all");

  const allMatches = data as Match[];
  const filteredMatches = allMatches.filter(filterMap[filter]);

  return (
    <Container>
      <MatchFilters
        activeFilter={filter}
        onFilterChange={setFilter}
        matches={allMatches}
      />
      <Grid>
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </Grid>
    </Container>
  );
}
