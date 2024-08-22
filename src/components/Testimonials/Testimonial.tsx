import React from 'react'

interface TestimonialProps {
    description: string;
    name: string;
}
export default function Testimonial({description, name}: TestimonialProps) {
    return (
      <>
        <div class="bg-gradient-to-r from-white/30 via-indigo-600/30 to-indigo-700/30 p-6 rounded-lg max-w-lg relative">
          <div class="rounded-lg p-6 relative">
            <p class="text-lg mb-6">
              {description}
            </p>
            <div>
              <p class="font-bold">{name}</p>
            </div>
          </div>
        </div>
      </>
    );
}
