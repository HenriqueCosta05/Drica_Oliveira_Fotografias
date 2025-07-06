import { useEffect } from "react"
import { getServices } from "../sanity/utils.ts";
import type { Service } from "../sanity/types.ts";
import { Card } from "../components/ServiceCard.tsx";
import { useAsyncLoading } from "../hooks/useLoading.ts";
import { LoadingPlaceholder, ImageWithLoading } from "../components/Loading.tsx";

const ServiceCardWrapper = () => {
    const {
        isLoading,
        data: serviceCards,
        error,
        execute
    } = useAsyncLoading<Service[]>({
        onError: (error) => {
            console.error('Error fetching service cards:', error);
        }
    });

    useEffect(() => {
        execute(() => getServices());
    }, []); 

    const handleCardClick = (serviceId: string) => {
        try {
            window.location.href = `/${serviceId}`;
        } catch (error) {
            window.open(`/${serviceId}`, '_self');
        }
    }

    // Loading state
    if (isLoading) {
        return (
            <section className="w-full my-40 relative px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full max-w-4xl mx-auto mb-12 animate-pulse"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <LoadingPlaceholder
                                key={index}
                                type="card"
                                className="h-80"
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="w-full my-40 relative px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                        <div className="text-red-500 text-4xl mb-4">⚠️</div>
                        <h2 className="text-xl font-semibold text-red-700 mb-2">Erro ao carregar serviços</h2>
                        <p className="text-red-600 mb-4">Não foi possível carregar os serviços disponíveis.</p>
                        <button
                            onClick={() => execute(() => getServices())}
                            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                            Tentar novamente
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (!serviceCards || serviceCards.length === 0) {
        return (
            <section className="w-full my-40 relative px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                        <div className="text-gray-400 text-4xl mb-4">🔧</div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Nenhum serviço disponível</h2>
                        <p className="text-gray-600">Não há serviços disponíveis no momento.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full my-40 relative px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    Nossos Serviços
                </h2>
                <p className="text-lg mb-12">
                    Oferecemos uma variedade de serviços fotográficos para capturar os momentos mais especiais da sua
                    vida. Desde casamentos e ensaios fotográficos até eventos corporativos, temos a solução perfeita para
                    você.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {serviceCards.map((card) => (
                        <Card.Root
                            key={card._id}
                            className="p-4 hover:cursor-pointer transition-transform hover:scale-105"
                            onClick={() => handleCardClick(card.service.serviceId)}
                        >
                            <ImageWithLoading
                                src={card.service.image}
                                alt={card.service.title}
                                className="mb-4 rounded-md w-full h-48 object-cover"
                                placeholderClassName="mb-4 rounded-md w-full h-48"
                            />
                            <Card.Title className="mb-2">{card.service.title}</Card.Title>
                            <Card.Description>{card.service.description}</Card.Description>
                        </Card.Root>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServiceCardWrapper;