// Card.tsx
import React from 'react';

interface CardProps {
  bgColor?: string;
  children: React.ReactNode;
  key?: number
}

const Card: React.FC<CardProps> = ({ bgColor, children }) => {
  return (
    <div
      className={`p-8 rounded-lg border-gray-500 border-2 m-2 w-11/12 lg:w-[25vw] bg-transparent ${bgColor}`}
    >
      {children}
    </div>
  );
};

export default Card;