import React from 'react';
import HeroCarousel from '../components/HeroCarousel.tsx';
import { getHeroes } from '../sanity/utils.ts';
import type { Hero } from '../sanity/types.ts';

const HeroCarouselWrapper: React.FC = () => {
    const [heroSlides, setHeroSlides] = React.useState<Hero[]>([]);
    const [loading, setLoading] = React.useState(true);

    const mockSlides = [
        {
            title: 'Welcome to Our Photography Studio',
            subtitle: 'Capturing Moments, Creating Memories',
            buttonText: 'Explore Our Work',
            buttonLink: '/portfolio',
            backgroundImage: '/images/hero1.jpg',
            classNames: {
                root: 'bg-cover bg-center h-screen'
            }
        },
        {
            title: 'Your Story, Our Lens',
            subtitle: 'Every Picture Tells a Story',
            buttonText: 'Book a Session',
            buttonLink: '/contact',
            backgroundImage: '/images/hero2.jpg',
            classNames: {
                root: 'bg-cover bg-center h-screen'
            }
        }, 
    ];

    React.useEffect(() => {
        const fetchHeroSlides = async () => {
            try {
                const response = await getHeroes()
                setHeroSlides(response || []);
            } catch (error) {
                console.error('Error fetching hero slides:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHeroSlides();
    }, []);

    const mappedSlides = heroSlides.map((slide) => ({
        title: slide.hero.title,
        subtitle: slide.hero.description,
        buttonText: slide.hero.buttonText,
        buttonLink: slide.hero.buttonLink,
        backgroundImage: slide.hero.image.asset._ref,
        classNames: {
            root: 'bg-cover bg-center h-screen'
        },
    }));

    return (
        <HeroCarousel
            slides={mockSlides}
            autoPlay={true}
            autoPlayInterval={5000}
            showDots={true}
            showArrows={true}
        />
    );
};

export default HeroCarouselWrapper;