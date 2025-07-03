import React, { useState, useEffect } from 'react';

type HeroSectionProps = {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink?: string;
    backgroundImage?: string;
    classNames?: {
        root?: string;
        title?: string;
        subtitle?: string;
        button?: string;
    };
};

type HeroCarouselProps = {
    slides?: HeroSectionProps[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showDots?: boolean;
    showArrows?: boolean;
};

const HeroSection: React.FC<HeroSectionProps & { isActive?: boolean }> = ({
    title,
    subtitle,
    buttonText,
    buttonLink = '#contact',
    backgroundImage,
    classNames = {},
    isActive = false
}) => {

    return (
        <section
            className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'
                } ${classNames.root || ''}`}
            style={{
                backgroundImage: backgroundImage ? `url("${backgroundImage}")` : undefined,
                backgroundColor: backgroundImage ? 'transparent' : '#3b82f6',
            }}
            data-background-url={backgroundImage}
        >        <div className="relative z-10 h-full flex items-center justify-center">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${classNames.title || 'text-white'}`}>
                        {title}
                    </h1>
                    <p className={`text-lg md:text-xl mb-8 ${classNames.subtitle || 'text-gray-200'}`}>
                        {subtitle}
                    </p>
                    <a
                        href={buttonLink}
                        className={`inline-block px-8 py-4 font-medium text-lg rounded-md transition-colors duration-200 ${classNames.button || 'bg-secondary-dark text-white hover:bg-secondary'
                            }`}
                    >
                        {buttonText}
                    </a>
                </div>
            </div>
        </section>
    );
};

const HeroCarousel: React.FC<HeroCarouselProps> = ({
    slides = [],
    autoPlay = true,
    autoPlayInterval = 5000,
    showDots = true,
    showArrows = true
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (!autoPlay || slides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, slides.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    if (!slides.length) return null;

    return (
        <div className="relative h-screen overflow-hidden">
            {slides.map((slide, index) => (
                <HeroSection
                    key={index}
                    title={slide.title}
                    subtitle={slide.subtitle}
                    buttonText={slide.buttonText}
                    buttonLink={slide.buttonLink}
                    backgroundImage={slide.backgroundImage}
                    classNames={slide.classNames}
                    isActive={index === currentSlide}
                />
            ))}

            {showArrows && slides.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
                        aria-label="Previous slide"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
                        aria-label="Next slide"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {showDots && slides.length > 1 && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide
                                ? 'bg-white'
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HeroCarousel;