import React from 'react';
import HeroCarousel from '../components/HeroCarousel.tsx';
import { getHeroes } from '../sanity/utils.ts';
import type { Hero } from '../sanity/types.ts';
import { getColorFromImage } from '../utils/images.utils.ts';
import { useAsyncLoading } from '../hooks/useLoading.ts';
import { LoadingPlaceholder, LoadingOverlay } from '../components/Loading.tsx';

const HeroCarouselWrapper: React.FC = () => {
    const [textColoredSlides, setTextColoredSlides] = React.useState<Hero[]>([]);
    const [isProcessingColors, setIsProcessingColors] = React.useState(false);

    const {
        isLoading,
        data: heroSlides,
        error,
        execute
    } = useAsyncLoading<Hero[]>({
        onError: (error) => {
            console.error('Error fetching hero slides:', error);
        }
    });

    React.useEffect(() => {
        execute(() => getHeroes());
    }, []); // Empty dependency array since we only want to fetch once on mount

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

    const setTextColors = async (slides: Hero[]) => {
        setIsProcessingColors(true);
        try {
            const colors = await getImagesColors(slides);
            return slides.map((slide, index) => {
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
                            title: `text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 ${isBackgroundLight ? 'text-gray-900' : 'text-white'}`,
                            subtitle: `text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-2xl ${isBackgroundLight ? 'text-gray-700' : 'text-gray-200'}`,
                            button: `inline-block px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 font-medium text-sm sm:text-base md:text-lg rounded-md transition-colors duration-200 ${isBackgroundLight ? 'bg-secondary-dark text-white hover:bg-secondary' : 'bg-secondary text-white hover:bg-secondary-dark'}`,
                        },
                    },
                };
            });
        } catch (error) {
            console.error('Error processing image colors:', error);
            return slides;
        } finally {
            setIsProcessingColors(false);
        }
    };

    React.useEffect(() => {
        if (heroSlides && heroSlides.length > 0) {
            setTextColors(heroSlides).then(slides => setTextColoredSlides(slides));
        }
    }, [heroSlides]);

    if (isLoading) {
        return (
            <LoadingPlaceholder
                type="hero"
                className="h-screen w-full"
            />
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center space-y-4">
                    <div className="text-red-500 text-4xl">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-700">Erro ao carregar conteúdo</h2>
                    <p className="text-gray-500">Não foi possível carregar as imagens do carrossel.</p>
                    <button
                        onClick={() => execute(() => getHeroes())}
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    if (!heroSlides || heroSlides.length === 0) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center space-y-4">
                    <div className="text-gray-400 text-4xl">📷</div>
                    <h2 className="text-xl font-semibold text-gray-700">Nenhuma imagem encontrada</h2>
                    <p className="text-gray-500">Não há conteúdo disponível para exibir no carrossel.</p>
                </div>
            </div>
        );
    }

    return (
        <LoadingOverlay isVisible={isProcessingColors} message="Processando cores das imagens...">
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
        </LoadingOverlay>
    );
};

export default HeroCarouselWrapper;