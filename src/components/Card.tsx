// Card.tsx
import React from 'react';

interface CardProps {
  bgColor: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ bgColor, children }) => {
  return (
    <div
      className={`p-8 rounded-lg border-gray-500 border-2 m-2 w-11/12 lg:w-[25vw] bg-transparent lg:h-[30vh] ${bgColor}`}
    >
      {children}
    </div>
  );
};

export default Card;