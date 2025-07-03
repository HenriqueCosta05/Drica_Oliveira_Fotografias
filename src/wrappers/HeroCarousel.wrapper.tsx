import React from 'react';
import HeroCarousel from '../components/HeroCarousel.tsx';
import { getHeroes } from '../sanity/utils.ts';
import type { Hero } from '../sanity/types.ts';
import { getColorFromImage } from '../utils/images.utils.ts';

const HeroCarouselWrapper: React.FC = () => {
    const [heroSlides, setHeroSlides] = React.useState<Hero[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [textColoredSlides, setTextColoredSlides] = React.useState<Hero[]>([]);

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

    const getImagesColors = async (slides: Hero[]) => {
        const colors = await Promise.all(
            slides.map(async (slide) => {
                const imageUrl = slide.hero.image;
                if (!imageUrl) return null;
                try {
                    return await getColorFromImage(imageUrl);
                } catch (error) {
                    console.error('Error fetching color from image:', error);
                    return null;
                }
            })
        );
        return colors;
    };

    const setTextColors = async () => {
        const colors = await getImagesColors(heroSlides);
        return heroSlides.map((slide, index) => {
            const color = colors[index];
            if (!color) return slide;
    
            let isBackgroundLight = false;
            const rgbMatch = typeof color === 'string' && color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            if (rgbMatch) {
                const r = parseInt(rgbMatch[1], 10);
                const g = parseInt(rgbMatch[2], 10);
                const b = parseInt(rgbMatch[3], 10);
                const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                isBackgroundLight = brightness > 128;
            }
    
            return {
                ...slide,
                hero: {
                    ...slide.hero,
                    classNames: {
                        title: `text-4xl md:text-6xl font-bold mb-6 ${isBackgroundLight ? 'text-gray-900' : 'text-white'}`,
                        subtitle: `text-lg md:text-xl mb-8 ${isBackgroundLight ? 'text-gray-700' : 'text-gray-200'}`,
                        button: `inline-block px-8 py-4 font-medium text-lg rounded-md transition-colors duration-200 ${isBackgroundLight ? 'bg-secondary-dark text-white hover:bg-secondary' : 'bg-secondary text-white hover:bg-secondary-dark'}`,
                    },
                },
            };
        });
    };

    React.useEffect(() => {
        if (heroSlides.length > 0) {
            setTextColors().then(slides => setTextColoredSlides(slides));
        }
    }, [heroSlides]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <HeroCarousel
            slides={textColoredSlides.map((slide) => ({
                title: slide.hero.title,
                subtitle: slide.hero.description,
                buttonText: slide.hero.buttonText,
                buttonLink: slide.hero.buttonLink,
                backgroundImage: slide.hero.image,
                classNames: slide.hero.classNames,
            }))}
            autoPlay={true}
            autoPlayInterval={5000}
            showDots={true}
            showArrows={true}
        />
    );
};

export default HeroCarouselWrapper;