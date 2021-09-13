import React from 'react';
import styled from 'styled-components';

interface ProgressCircleProps {
  /**
   * The active color
   */
  activeColor?: string;
  /**
   * The background color
   */
  backgroundColor?: string;
  /**
   * The animation duration
   */
  duration?: string;
  /**
   * The percentage of the active graph
   */
  progress: number;
  /**
   * The size of the circle
   */
  sizeCircle?: number;
}

const VIEWPORT = 200;

const BackgroundCircle = styled.circle`
  fill: none;
`;
const ActiveCircle = styled.circle<{ duration: string | undefined }>`
  stroke-dashoffset: ${({ strokeDashoffset }) => strokeDashoffset};
  transition: stroke-dashoffset ${({ duration }) => duration} ease-out;
  fill: none;
  stroke-linecap: butt;
`;

export const ProgressCircle: React.FunctionComponent<ProgressCircleProps> = ({
  activeColor = '#FFB428',
  backgroundColor = '#EAEAEE',
  duration = '1s',
  progress = 0,
  sizeCircle = 80,
}) => {
  const radius = VIEWPORT - sizeCircle;
  const perimeter = Math.round(Math.PI * radius * 2);
  const strokeDashoffset = Math.round(((100 - progress) / 100) * perimeter) || 0;
  const offSet = sizeCircle;
  const viewBox = [-offSet, -offSet, (offSet + radius) * 2, (offSet + radius) * 2].join(' ');
  const transform = `rotate(-90 ${radius} ${radius})`;

  return (
    <svg width="100%" height="100%" viewBox={viewBox}>
      <BackgroundCircle stroke={backgroundColor} cx={radius} cy={radius} r={radius} strokeWidth={sizeCircle} />
      <ActiveCircle
        stroke={activeColor}
        transform={transform}
        cx={radius}
        cy={radius}
        r={radius}
        strokeDasharray={perimeter}
        strokeDashoffset={strokeDashoffset}
        strokeWidth={sizeCircle}
        duration={duration}
      />
    </svg>
  );
};
