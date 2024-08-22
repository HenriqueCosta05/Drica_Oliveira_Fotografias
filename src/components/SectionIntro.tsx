import React from 'react'

interface SectionIntroProps {
    title: string
    description: string
    }
export default function SectionIntro({title, description}: SectionIntroProps) {
  return (
    <div class="flex-wrap">
      <h1 class="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-md w-fit my-4">
        {title}
      </h1>
      <p>
       {description}
      </p>
    </div>
  );
}
