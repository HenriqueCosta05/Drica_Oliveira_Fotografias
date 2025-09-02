import React, { useState } from 'react';
import { ImageWithLoading } from './Loading.tsx';
import ImageCarousel from './ImageCarousel.tsx';

interface ImageGalleryProps {
    images: string[];
    className?: string;
    gridClassName?: string;
    imageClassName?: string;
}

export default function ImageGallery({
    images,
    className = "",
    gridClassName = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4",
    imageClassName = "aspect-square overflow-hidden rounded-lg cursor-pointer group"
}: ImageGalleryProps) {
    const [isCarouselOpen, setIsCarouselOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setIsCarouselOpen(true);
    };

    const handleCloseCarousel = () => {
        setIsCarouselOpen(false);
    };

    if (!images || images.length === 0) {
        return (
            <div className={`text-center py-12 bg-gray-50 rounded-lg ${className}`}>
                <div className="text-gray-400 text-4xl mb-4">📷</div>
                <p className="text-gray-500">Nenhuma imagem disponível na galeria.</p>
            </div>
        );
    }

    return (
        <div className={className}>
            {isCarouselOpen && (
                <ImageCarousel
                    images={images}
                    onClose={handleCloseCarousel}
                    isOpen={isCarouselOpen}
                    initialIndex={selectedImageIndex}
                />
            )}

            <div className={gridClassName}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={imageClassName}
                        onClick={() => handleImageClick(index)}
                    >
                        <ImageWithLoading
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full object-cover hover:scale-105 transition-transform duration-300 group-hover:brightness-110"
                            placeholderClassName="w-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
