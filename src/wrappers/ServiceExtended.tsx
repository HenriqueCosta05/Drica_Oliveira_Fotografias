import { useEffect, useState } from "react";
import type { ServiceExtended } from "../sanity/types.ts";
import { getServiceById } from "../sanity/utils.ts";
import ImageCarousel from "../components/ImageCarousel.tsx";

const ServiceExtendedWrapper = (Props: { serviceId: string | undefined }) => {
    const { serviceId } = Props;
    const [service, setService] = useState<ServiceExtended | null>(null);
    const [isCarouselOpen, setIsCarouselOpen] = useState(false);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await getServiceById(serviceId || "");
                console.log('Fetched service data:', response);
                if (response) {
                    setService(response);
                }
            } catch (error) {
                console.error('Error fetching service data:', error);
            }
        };

        fetchService();
    }, []);

    const handleIsCarouselOpen = () => {
        setIsCarouselOpen(!isCarouselOpen);
    };
    return (
        <>
            {isCarouselOpen && (
                <ImageCarousel
                    images={service?.serviceExtended.gallery || []}
                    onClose={handleIsCarouselOpen}
                    isOpen={isCarouselOpen}
                />
            )}
            <div className="bg-white min-h-screen">
                <div className="relative h-96 md:h-[500px] overflow-hidden my-16">
                    <img
                        src={service?.serviceExtended.image || "/demo/1.png"}
                        alt="Wedding couple at sunset"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="mx-auto px-6 py-12">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-contrast mb-4">{service?.serviceExtended.title || "Serviço de Fotografia de Casamento"}</h1>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            {service?.serviceExtended.description || "Capture the magic of your special day with our bespoke wedding photography services. We specialize in creating timeless, elegant images that tell your unique story."}
                        </p>
                    </div>

                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-contrast mb-8">Galeria de fotos</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {service?.serviceExtended.gallery.map((image, index) => (
                                <div key={index} className="relative group" onClick={handleIsCarouselOpen}>
                                    <img
                                        src={image}
                                        alt={`Gallery image ${index + 1}`}
                                        className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-white text-lg font-semibold">View</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-contrast mb-8">Depoimentos</h2>
                        <div className="space-y-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {service?.serviceExtended.testimonials.map((testimonial, index) => (
                                <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                                    {testimonial.clientImage && (
                                        <img
                                            src={testimonial.clientImage}
                                            alt={`Client ${testimonial.name}`}
                                            className="w-16 h-16 rounded-full mb-4 object-cover"
                                        />
                                    )}
                                    <p className="text-gray-700 text-lg mb-4">{testimonial.comment}</p>
                                    <p className="text-gray-500 text-sm">- {testimonial.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServiceExtendedWrapper;