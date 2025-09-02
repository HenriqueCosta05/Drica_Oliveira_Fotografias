import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Testimonial, { type TestimonialData } from './Testimonial.tsx';

interface TestimonialCarouselProps {
    testimonials: TestimonialData[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    slidesToShow?: number;
    className?: string;
}

export default function TestimonialCarousel({
    testimonials,
    autoPlay = true,
    autoPlayInterval = 5000,
    showDots = true,
    showArrows = true,
    slidesToShow = 1,
    className = ""
}: TestimonialCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);

    const maxIndex = Math.max(0, testimonials.length - slidesToShow);

    useEffect(() => {
        if (!isPlaying || testimonials.length <= slidesToShow) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex >= maxIndex ? 0 : prevIndex + 1
            );
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [isPlaying, autoPlayInterval, testimonials.length, slidesToShow, maxIndex]);

    const goToSlide = (index: number) => {
        const clampedIndex = Math.min(index, maxIndex);
        setCurrentIndex(clampedIndex);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? maxIndex : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex >= maxIndex ? 0 : prevIndex + 1
        );
    };

    const handleMouseEnter = () => {
        if (autoPlay) setIsPlaying(false);
    };

    const handleMouseLeave = () => {
        if (autoPlay) setIsPlaying(true);
    };

    if (!testimonials || testimonials.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No testimonials available</p>
            </div>
        );
    }

    return (
        <div
            className={`relative w-full ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
                    }}
                >
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id || index}
                            className="flex-shrink-0 px-2"
                            style={{ width: `${100 / slidesToShow}%` }}
                        >
                            <Testimonial
                                testimonial={testimonial}
                                className="h-full"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {showArrows && testimonials.length > slidesToShow && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 
                     bg-white/90 hover:bg-white rounded-full p-2 
                     shadow-lg hover:shadow-xl transition-all duration-200
                     border border-gray-200 hover:border-secondary
                     group"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-primary" />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 
                     bg-white/90 hover:bg-white rounded-full p-2 
                     shadow-lg hover:shadow-xl transition-all duration-200
                     border border-gray-200 hover:border-secondary
                     group"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-primary" />
                    </button>
                </>
            )}

            {showDots && testimonials.length > slidesToShow && (
                <div className="flex justify-center space-x-2 mt-6">
                    {Array.from({ length: maxIndex + 1 }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentIndex
                                ? 'bg-primary scale-110'
                                : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}