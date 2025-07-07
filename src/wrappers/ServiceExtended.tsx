import { useEffect, useState } from "react";
import type { ServiceExtended } from "../sanity/types.ts";
import { getServiceById } from "../sanity/utils.ts";
import ImageCarousel from "../components/ImageCarousel.tsx";
import ImageGallery from "../components/Image.tsx";
import { useAsyncLoading, useImagesLoading } from "../hooks/useLoading.ts";
import { LoadingPlaceholder, ImageWithLoading, LoadingSpinner } from "../components/Loading.tsx";

interface ServiceExtendedWrapperProps {
    serviceId: string | undefined;
}

const ServiceExtendedWrapper = ({ serviceId }: ServiceExtendedWrapperProps) => {
    const {
        isLoading,
        data: service,
        error,
        execute
    } = useAsyncLoading<ServiceExtended>({
        onError: (error) => {
            console.error('Error fetching service data:', error);
        }
    });

    const galleryImages = service?.serviceExtended.gallery || [];
    const {
        allLoaded: galleryLoaded,
        progress: galleryProgress,
        loadedCount,
        totalCount
    } = useImagesLoading(galleryImages);

    useEffect(() => {
        if (serviceId) {
            execute(() => getServiceById(serviceId) as Promise<ServiceExtended>);
        }
    }, [serviceId]); 

    if (isLoading) {
        return (
            <div className="bg-white min-h-screen">
                <LoadingPlaceholder type="hero" className="h-96 md:h-[500px] my-16" />
                <div className="mx-auto px-6 py-12 space-y-8">
                    <div className="h-8 bg-gray-200 rounded w-96 animate-pulse"></div>
                    <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        ))}
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <LoadingPlaceholder type="gallery" count={8} />
                    <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
                    <div className="space-y-6">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="bg-gray-50 p-6 rounded-lg animate-pulse">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center">
                <div className="text-center space-y-6 p-8">
                    <div className="text-red-500 text-6xl">⚠️</div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-700">Erro ao carregar serviço</h1>
                        <p className="text-gray-500">Não foi possível carregar as informações do serviço solicitado.</p>
                    </div>
                    <div className="space-x-4">
                        <button
                            onClick={() => serviceId && execute(() => getServiceById(serviceId) as Promise<ServiceExtended>)}
                            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
                        >
                            Tentar novamente
                        </button>
                        <button
                            onClick={() => window.history.back()}
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center">
                <div className="text-center space-y-6 p-8">
                    <div className="text-gray-400 text-6xl">🔍</div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-700">Serviço não encontrado</h1>
                        <p className="text-gray-500">O serviço que você está procurando não existe ou foi removido.</p>
                    </div>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="bg-white min-h-screen">
                <div className="relative h-96 md:h-[500px] overflow-hidden my-16">
                    <ImageWithLoading
                        src={service?.serviceExtended.image || "/demo/1.png"}
                        alt={service?.serviceExtended.title || "Serviço"}
                        className="w-full h-full object-cover"
                        placeholderClassName="w-full h-full"
                    />
                </div>

                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-contrast mb-4">
                            {service?.serviceExtended.title || "Serviço de Fotografia"}
                        </h1>
                        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
                            {service?.serviceExtended.description || "Capture the magic of your special day with our bespoke wedding photography services. We specialize in creating timeless, elegant and emotionally resonant images that tell the unique story of your love. From intimate ceremonies to grand celebrations, our experienced team ensures every moment is captured with artistry and care."}
                        </p>
                    </div>

                    <div className="mb-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-contrast">Galeria de Fotos</h2>
                            {galleryImages.length > 0 && !galleryLoaded && (
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <LoadingSpinner size="sm" />
                                    <span>Carregando imagens ({loadedCount}/{totalCount})</span>
                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-primary h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${galleryProgress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <ImageGallery
                            images={galleryImages}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-contrast mb-8">Depoimentos</h2>
                        <p className="text-gray-600 mb-6"> Veja o que nossos clientes dizem sobre nós:</p>
                        {service?.serviceExtended.testimonials && service.serviceExtended.testimonials.length > 0 ? (
                            <div className="space-y-8">
                                {service.serviceExtended.testimonials.map((testimonial, index) => (
                                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                                        <div className="flex items-start gap-4">
                                            {testimonial.clientImage ? (
                                                <ImageWithLoading
                                                    src={testimonial.clientImage}
                                                    alt={testimonial.name}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                    placeholderClassName="w-12 h-12 rounded-full"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-text font-bold">
                                                    {testimonial.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-semibold text-contrast">{testimonial.name}</h3>
                                                    <span className="text-gray-500 text-sm">Cliente</span>
                                                </div>
                                                <div className="flex gap-1 mb-3">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <p className="text-gray-700">{testimonial.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <div className="text-gray-400 text-4xl mb-4">💬</div>
                                <p className="text-gray-500">Nenhum depoimento disponível no momento.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceExtendedWrapper;
