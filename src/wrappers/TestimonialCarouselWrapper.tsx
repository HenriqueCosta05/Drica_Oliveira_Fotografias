import { useEffect, useState } from "react";
import type { TestimonialData } from "../components/Testimonial.tsx";
import { getTestimonials } from "../sanity/utils.ts";
import TestimonialCarousel from "../components/TestimonialCarousel.tsx";

const TestimonialCarouselWrapper = () => {
    const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
    useEffect(() => {
        const fetchTestimonials = async () => {
            const response = await getTestimonials();
            const data: TestimonialData[] = response.map((item) => ({
                id: item._id,
                name: item.testimonial.clientName,
                comment: item.testimonial.comment,
                rating: 5,
                _id: item._id,
                _createdAt: item._createdAt,
                testimonial: {
                    clientName: item.testimonial.clientName,
                    comment: item.testimonial.comment,
                    clientImage: item.testimonial.clientImage,
                },
            }));
            setTestimonials(data);
        };
        fetchTestimonials();
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-4 py-8" id="testimonials">
            <h2 className="text-3xl font-bold text-center mb-8">
                O que nossos clientes dizem
            </h2>
            <p className="text-center text-gray-600 mb-4">
                Veja o que nossos clientes têm a dizer sobre nossos serviços de fotografia.
            </p>
            <TestimonialCarousel
                testimonials={testimonials}
                autoPlay={true}
                autoPlayInterval={5000}
                showDots={true}
                showArrows={true}
                slidesToShow={1}
                className="my-8"
            />
        </section>
    );
}
export default TestimonialCarouselWrapper;