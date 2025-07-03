import { useEffect, useState } from "react"
import { getServices } from "../sanity/utils.ts";
import type { Service } from "../sanity/types.ts";
import { Card } from "../components/ServiceCard.tsx";

const ServiceCardWrapper = () => {

    const [serviceCards, setServiceCards] = useState<Service[]>([]);
    useEffect(() => {
        const fetchServiceCards = async () => {
            try {
                const response = await getServices();
                console.log('Fetched service cards:', response);
                setServiceCards(response);
            } catch (error) {
                console.error('Error fetching service cards:', error);
            }
        };
        fetchServiceCards();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card) => (
               <Card.Root key={card._id} className="p-4">
                    <Card.Image src={card.service.image} alt={card.service.title} className="mb-4" />
                    <Card.Title className="mb-2">{card.service.title}</Card.Title>
                    <Card.Description>{card.service.description}</Card.Description>
                </Card.Root>
            ))}
        </div>
    )
}