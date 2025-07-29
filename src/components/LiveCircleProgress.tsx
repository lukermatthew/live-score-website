"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const CircleContainer = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressRing = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const ProgressCircle = styled.circle<{ $progress: number }>`
  fill: none;
  stroke: #10b981;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: ${2 * Math.PI * 26};
  stroke-dashoffset: ${(props) =>
    2 * Math.PI * 26 * (1 - props.$progress / 100)};
  transition: stroke-dashoffset 0.3s ease;
`;

const BackgroundCircle = styled.circle`
  fill: none;
  stroke: rgba(16, 185, 129, 0.2);
  stroke-width: 2;
`;

const TimeText = styled.div<{ $textColor: string }>`
  color: ${(props) => props.$textColor};
  font-size: 14px;
  font-weight: 600;
  position: relative;
  z-index: 1;
`;

const PulseAnimation = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #10b981;
  border-radius: 50%;
  opacity: 0.6;
  animation: ${rotate} 2s linear infinite;
`;

interface LiveProgressCircleProps {
  liveStatus: string;
  textColor?: string;
  borderColor?: string;
}

export function LiveProgressCircle({
  liveStatus,
  textColor = "#10b981",
}: LiveProgressCircleProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const minutes = Number.parseInt(liveStatus.replace("'", "")) || 0;

    const calculatedProgress = Math.min((minutes / 90) * 100, 100);
    setProgress(calculatedProgress);
  }, [liveStatus]);

  return (
    <CircleContainer>
      <PulseAnimation />
      <ProgressRing>
        <BackgroundCircle cx="30" cy="30" r="26" />
        <ProgressCircle cx="30" cy="30" r="26" $progress={progress} />
      </ProgressRing>
      <TimeText $textColor={textColor}>{liveStatus}</TimeText>
    </CircleContainer>
  );
}
