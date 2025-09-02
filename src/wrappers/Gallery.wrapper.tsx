import { useEffect, useState, useMemo } from "react";
import { useAsyncLoading, useImagesLoading } from "../hooks/useLoading.ts";
import { LoadingPlaceholder, LoadingSpinner } from "../components/Loading.tsx";
import ImageGallery from "../components/Image.tsx";
import { getGalleryImages } from "../sanity/utils.ts";

type GalleryQueryResult = {
    _id: string;
    _createdAt: string;
    galleryImages: string[];
}

interface GalleryWrapperProps {
    className?: string;
}

const GalleryWrapper = ({ className = "" }: GalleryWrapperProps) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDate, setSelectedDate] = useState('all');
    const [selectedClient, setSelectedClient] = useState('all');

    const {
        isLoading,
        data: galleryData,
        error,
        execute
    } = useAsyncLoading<GalleryQueryResult[]>({
        onError: (error) => {
            console.error('Error fetching gallery images:', error);
        }
    });

    const galleryImages = useMemo(() => {
        return galleryData?.flatMap(item => item.galleryImages) || [];
    }, [galleryData]);

    const {
        allLoaded: galleryLoaded,
        progress: galleryProgress,
        loadedCount,
        totalCount
    } = useImagesLoading(galleryImages);

    useEffect(() => {
        execute(() => getGalleryImages() as unknown as Promise<GalleryQueryResult[]>);
    }, []);

    // Loading state
    if (isLoading) {
        return (
            <div className={`max-w-7xl mx-auto px-4 py-16 ${className}`}>
                {/* Header Loading */}
                <div className="text-center mb-16">
                    <div className="h-12 bg-gray-200 rounded w-48 mx-auto mb-6 animate-pulse"></div>
                    <div className="space-y-2 max-w-4xl mx-auto">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-12 justify-center">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
                    ))}
                </div>

                <LoadingPlaceholder type="gallery" count={12} />
            </div>
        );
    }

    if (error) {
        return (
            <div className={`max-w-7xl mx-auto px-4 py-16 ${className}`}>
                <div className="text-center py-12 bg-red-50 rounded-lg">
                    <div className="text-red-500 text-6xl mb-6">⚠️</div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-red-700">Erro ao carregar galeria</h3>
                        <p className="text-red-600">Não foi possível carregar as imagens da galeria.</p>
                    </div>
                    <button
                        onClick={() => execute(() => getGalleryImages() as unknown as Promise<GalleryQueryResult[]>)}
                        className="mt-6 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`max-w-7xl mx-auto px-4 py-16 ${className}`}>
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-contrast mb-6">Galeria</h1>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed md:text-left">
                    Explore uma coleção selecionada de nossas melhores fotografias, exibindo uma variedade de estilos e temas.
                    Cada imagem conta uma história, capturando momentos de beleza, emoção e conexão. Use os filtros abaixo para
                    refinar sua busca e descobrir imagens que mais lhe interessam.
                </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-12 justify-center">
                <div className="relative">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                        <option value="all">Categoria</option>
                        <option value="wedding">Casamentos</option>
                        <option value="portrait">Retratos</option>
                        <option value="commercial">Ensaios</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>

                <div className="relative">
                    <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                        <option value="all">Data</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Loading Progress */}
            {galleryImages.length > 0 && !galleryLoaded && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
                    <LoadingSpinner size="sm" />
                    <span>Carregando imagens ({loadedCount}/{totalCount})</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2 ml-2">
                        <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${galleryProgress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Gallery Grid */}
            <ImageGallery
                images={galleryImages}
                className="w-full"
                gridClassName="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4"
                imageClassName="break-inside-avoid mb-4 overflow-hidden rounded-lg cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300"
            />
        </div>
    );
};

export default GalleryWrapper;