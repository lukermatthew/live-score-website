import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MatchFilters, { filterMap } from "@/components/MatchFilters";
import type { Match } from "@/types/match";
import sportsData from "@/data/sports.json";

vi.mock("styled-components", async () => {
  const actual = await vi.importActual<any>("styled-components");

  const styled =
    (tag: keyof JSX.IntrinsicElements) => (styles: TemplateStringsArray) => {
      return ({ children, $active, ...rest }: any) => {
        // Apply 'active' class if $active is true
        const className = $active ? "active" : undefined;
        return React.createElement(tag, { ...rest, className }, children);
      };
    };

  // Attach .div, .button, etc.
  styled.div = styled("div");
  styled.button = styled("button");

  return {
    __esModule: true,
    default: styled,
  };
});

// Type cast for real data
const mockMatches = sportsData as Match[];

// ✅ Helper to create test matches
const createMockMatch = (
  id: string,
  status: Match["status"]["type"]
): Match => ({
  id,
  name: `Test Match ${id}`,
  competitionId: "test-comp",
  competition: "Test Competition",
  countryId: "test-country",
  country: "Test Country",
  timestamp: Date.now(),
  date: "07.08.2016.",
  time: "14:00",
  status: {
    code: status === "finished" ? 100 : status === "inprogress" ? 7 : 0,
    type: status,
  },
  round: { round: 1 },
  homeTeam: {
    id: 1,
    name: "Home Team",
    slug: "home-team",
    gender: "M",
    subTeams: [],
  },
  awayTeam: {
    id: 2,
    name: "Away Team",
    slug: "away-team",
    gender: "M",
    subTeams: [],
  },
  liveStatus:
    status === "finished" ? "FT" : status === "inprogress" ? "45" : "-",
});

// ✅ Test match array
const testMatches: Match[] = [
  createMockMatch("1", "finished"),
  createMockMatch("2", "finished"),
  createMockMatch("3", "inprogress"),
  createMockMatch("4", "notstarted"),
  createMockMatch("5", "notstarted"),
  createMockMatch("6", "notstarted"),
];

describe("MatchFilters", () => {
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it("renders all filter buttons with correct labels and counts", () => {
    render(
      <MatchFilters
        activeFilter="all"
        onFilterChange={mockOnFilterChange}
        matches={testMatches}
      />
    );

    expect(screen.getByText("All (6)")).toBeInTheDocument();
    expect(screen.getByText("Results (2)")).toBeInTheDocument();
    expect(screen.getByText("Live (1)")).toBeInTheDocument();
    expect(screen.getByText("Upcoming (3)")).toBeInTheDocument();
  });

  it("calls onFilterChange when a filter button is clicked", () => {
    render(
      <MatchFilters
        activeFilter="all"
        onFilterChange={mockOnFilterChange}
        matches={testMatches}
      />
    );

    const finishedButton = screen.getByText("Results (2)");
    fireEvent.click(finishedButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith("finished");
    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
  });

  it("adds 'active' class to the currently selected filter", () => {
    const { rerender } = render(
      <MatchFilters
        activeFilter="finished"
        onFilterChange={mockOnFilterChange}
        matches={testMatches}
      />
    );

    const finishedButton = screen.getByText("Results (2)");
    expect(finishedButton).toHaveClass("active");

    rerender(
      <MatchFilters
        activeFilter="inprogress"
        onFilterChange={mockOnFilterChange}
        matches={testMatches}
      />
    );

    const liveButton = screen.getByText("Live (1)");
    expect(liveButton).toHaveClass("active");
  });

  it("displays zero counts for empty match list", () => {
    render(
      <MatchFilters
        activeFilter="all"
        onFilterChange={mockOnFilterChange}
        matches={[]}
      />
    );

    expect(screen.getByText("All (0)")).toBeInTheDocument();
    expect(screen.getByText("Results (0)")).toBeInTheDocument();
    expect(screen.getByText("Live (0)")).toBeInTheDocument();
    expect(screen.getByText("Upcoming (0)")).toBeInTheDocument();
  });

  it("renders correctly with real sports data", () => {
    const realMatches = mockMatches.slice(0, 20);
    const finishedCount = realMatches.filter(
      (m) => m.status.type === "finished"
    ).length;
    const inprogressCount = realMatches.filter(
      (m) => m.status.type === "inprogress"
    ).length;
    const notstartedCount = realMatches.filter(
      (m) => m.status.type === "notstarted"
    ).length;

    render(
      <MatchFilters
        activeFilter="all"
        onFilterChange={mockOnFilterChange}
        matches={realMatches}
      />
    );

    expect(screen.getByText(`All (${realMatches.length})`)).toBeInTheDocument();
    expect(screen.getByText(`Results (${finishedCount})`)).toBeInTheDocument();
    expect(screen.getByText(`Live (${inprogressCount})`)).toBeInTheDocument();
    expect(
      screen.getByText(`Upcoming (${notstartedCount})`)
    ).toBeInTheDocument();
  });
});

describe("filterMap utility functions", () => {
  it("all returns true for any match", () => {
    const match = createMockMatch("1", "inprogress");
    expect(filterMap.all(match)).toBe(true);
  });

  it("finished returns true only for finished", () => {
    const match1 = createMockMatch("1", "finished");
    const match2 = createMockMatch("2", "notstarted");
    expect(filterMap.finished(match1)).toBe(true);
    expect(filterMap.finished(match2)).toBe(false);
  });

  it("inprogress returns true only for inprogress", () => {
    const match = createMockMatch("1", "inprogress");
    expect(filterMap.inprogress(match)).toBe(true);
  });

  it("notstarted returns true only for notstarted", () => {
    const match = createMockMatch("1", "notstarted");
    expect(filterMap.notstarted(match)).toBe(true);
  });
});
