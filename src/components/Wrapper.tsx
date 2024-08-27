import React from 'react';

interface WrapperProps {
  bg?: string;
  children: React.ReactNode;
}

export default function Wrapper({ children, bg }: WrapperProps) {
  return (
    <div
      className="w-11/12 flex flex-wrap justify-center items-center lg:justify-between mx-auto min-h-screen p-4 gap-12"
      style={{ backgroundColor: bg }}
    >
      {children}
    </div>
  );
}