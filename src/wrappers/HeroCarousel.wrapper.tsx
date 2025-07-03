import React from 'react';
import HeroCarousel from '../components/HeroCarousel.tsx';
import { getHeroes } from '../sanity/utils.ts';
import type { Hero } from '../sanity/types.ts';

const HeroCarouselWrapper: React.FC = () => {
    const [heroSlides, setHeroSlides] = React.useState<Hero[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchHeroSlides = async () => {
            try {
                const response = await getHeroes()
                console.log('Fetched hero slides:', response);
                setHeroSlides(response);
            } catch (error) {
                console.error('Error fetching hero slides:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHeroSlides();
    }, []);

    const mappedSlides = heroSlides.map((slide) => {
        console.log('Slide image URL:', slide.hero.image);
        return {
            title: slide.hero.title,
            subtitle: slide.hero.description,
            buttonText: slide.hero.buttonText,
            buttonLink: slide.hero.buttonLink,
            backgroundImage: slide.hero.image,
            classNames: {
                root: `w-9/12 m-auto h-9/12 object-contain flex items-center justify-center bg-cover bg-center`,
            },
        };
    });

    return (
        <HeroCarousel
            slides={heroSlides.length > 0 ? mappedSlides : []}
            autoPlay={true}
            autoPlayInterval={5000}
            showDots={true}
            showArrows={true}
        />
    );
};

export default HeroCarouselWrapper;