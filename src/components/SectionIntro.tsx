import React from 'react'

interface SectionIntroProps {
    title: string
    description: string
    color?: string
    }
export default function SectionIntro({title, description, color}: SectionIntroProps) {
  return (
    <div className="flex-wrap mb-8">
      <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-md w-fit my-4">
        {title}
      </h1>
      <p className={color}>
       {description}
      </p>
    </div>
  );
}
