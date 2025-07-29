"use client";

import type { Match } from "@/types/match";
import styled from "styled-components";
import { LiveProgressCircle } from "./LiveCircleProgress";
import { formatMatchDate } from "@/utils/formatMatchDate";

const Card = styled.div`
  background: rgb(75, 72, 72);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  min-width: 280px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  font-family: var(--font-barlow);

  @media (min-width: 640px) {
    padding: 20px;
    min-width: 320px;
  }

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const CountryLabel = styled.div`
  font-size: 1rem;
  color: #9ca3af;
  font-weight: 500;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
  font-family: var(--font-barlow);

  @media (min-width: 640px) {
    font-size: 0.875rem;
    margin-bottom: 4px;
  }
`;

const Competition = styled.div`
  font-size: 0.875rem;
  color: #d1d5db;
  font-weight: 500;
  margin-bottom: 16px;
  line-height: 1.3;
  font-family: var(--font-barlow);

  @media (min-width: 640px) {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  @media (min-width: 768px) {
    margin-bottom: 24px;
  }
`;

const StatusText = styled.div<{ $color: string }>`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: ${({ $color }) => $color};
  font-family: var(--font-barlow);
  margin-bottom: 16px;

  @media (min-width: 640px) {
    font-size: 0.875rem;
    margin-bottom: 20px;
  }

  @media (min-width: 768px) {
    margin-top: -20px;
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;

  @media (min-width: 640px) {
    margin-bottom: 20px;
  }

  @media (min-width: 768px) {
    margin-bottom: 24px;
  }
`;

const Score = styled.span`
  font-size: 1.75rem;
  font-weight: 300;
  color: white;
  font-family: var(--font-barlow);

  @media (min-width: 480px) {
    font-size: 2rem;
  }

  @media (min-width: 640px) {
    font-size: 2.75rem;
  }
`;

const ScoreSeparator = styled.span`
  font-size: 1.25rem;
  font-weight: 300;
  color: #6b7280;
  font-family: var(--font-barlow);

  @media (min-width: 480px) {
    font-size: 1.375rem;
  }

  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
`;

const TeamsAndStatusSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (min-width: 640px) {
    gap: 20px;
  }
`;

const TeamName = styled.div`
  font-size: 0.875rem;
  color: white;
  font-weight: 500;
  flex: 1;
  min-width: 0;
  font-family: var(--font-barlow);

  &.home {
    text-align: right;
  }

  &.away {
    text-align: left;
  }

  @media (min-width: 640px) {
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const Circle = styled.div<{ $borderColor: string; $textColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${({ $borderColor }) => $borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $textColor }) => $textColor};
  font-size: 0.75rem;
  font-weight: 500;
  position: relative;
  font-family: var(--font-barlow);
  flex-shrink: 0;

  @media (min-width: 640px) {
    width: 48px;
    height: 48px;
    font-size: 0.875rem;
  }
`;

const DateTimeText = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  font-weight: 500;
  text-align: center;
  font-family: var(--font-barlow);
  margin-bottom: 16px;

  @media (min-width: 640px) {
    font-size: 0.875rem;
    margin-top: -20px;
  }

  @media (min-width: 768px) {
    margin-bottom: 24px;
  }
`;

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const { status } = match;

  const renderContent = () => {
    if (status.type === "inprogress") {
      return (
        <>
          <StatusText $color="#fbbf24">LIVE</StatusText>
          <ScoreContainer>
            <Score>{match.homeScore.current}</Score>
            <ScoreSeparator>–</ScoreSeparator>
            <Score>{match.awayScore.current}</Score>
          </ScoreContainer>
          <TeamsAndStatusSection>
            <TeamName className="home">{match.homeTeam.name}</TeamName>

            <LiveProgressCircle
              liveStatus={match.liveStatus}
              textColor="#10b981"
              borderColor="#ffffff"
            />
            <TeamName className="away">{match.awayTeam.name}</TeamName>
          </TeamsAndStatusSection>
        </>
      );
    }

    if (status.type === "finished") {
      return (
        <>
          <StatusText $color="#10b981">ENDED</StatusText>
          <ScoreContainer>
            <Score>{match.homeScore.current}</Score>
            <ScoreSeparator>–</ScoreSeparator>
            <Score>{match.awayScore.current}</Score>
          </ScoreContainer>
          <TeamsAndStatusSection>
            <TeamName className="home">{match.homeTeam.name}</TeamName>
            <Circle $borderColor="#10b981" $textColor="#10b981">
              FT
            </Circle>
            <TeamName className="away">{match.awayTeam.name}</TeamName>
          </TeamsAndStatusSection>
        </>
      );
    }

    if (status.type === "canceled") {
      return (
        <>
          <StatusText $color="#dc2626">CANCELLED</StatusText>
          <ScoreContainer>
            <Score>
              {match.status.type === "cancelled"
                ? 0
                : match.homeScore.current ?? 0}
            </Score>
            <ScoreSeparator>–</ScoreSeparator>
            <Score>
              {match.status.type === "cancelled"
                ? 0
                : match.awayScore.current ?? 0}
            </Score>
          </ScoreContainer>

          <TeamsAndStatusSection>
            <TeamName className="home">{match.homeTeam.name}</TeamName>
            <Circle $borderColor="#6b7280" $textColor="#6b7280"></Circle>
            <TeamName className="away">{match.awayTeam.name}</TeamName>
          </TeamsAndStatusSection>
        </>
      );
    }

    if (status.type === "notstarted") {
      return (
        <>
          <DateTimeText>{formatMatchDate(match.timestamp)}</DateTimeText>

          <ScoreContainer>
            <Score>{match.homeScore.current ?? 0}</Score>
            <ScoreSeparator>–</ScoreSeparator>
            <Score>{match.awayScore.current ?? 0}</Score>
          </ScoreContainer>
          <TeamsAndStatusSection>
            <TeamName className="home">{match.homeTeam.name}</TeamName>
            <Circle $borderColor="#6b7280" $textColor="#6b7280"></Circle>
            <TeamName className="away">{match.awayTeam.name}</TeamName>
          </TeamsAndStatusSection>
        </>
      );
    }

    return (
      <>
        <StatusText $color="#9ca3af">{status.type.toUpperCase()}</StatusText>
        <ScoreContainer>
          <Score>{match.homeScore.current}</Score>
          <ScoreSeparator>–</ScoreSeparator>
          <Score>{match.awayScore.current}</Score>
        </ScoreContainer>
        <TeamsAndStatusSection>
          <TeamName className="home">{match.homeTeam.name}</TeamName>
          <Circle $borderColor="#6b7280" $textColor="#6b7280"></Circle>
          <TeamName className="away">{match.awayTeam.name}</TeamName>
        </TeamsAndStatusSection>
      </>
    );
  };

  return (
    <Card>
      <CountryLabel>{match.country.toUpperCase()}</CountryLabel>
      <Competition>{match.competition}</Competition>
      {renderContent()}
    </Card>
  );
}
