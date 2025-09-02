import { useEffect, useState } from "react";
import { PricingTable } from "../components/PricingTable.tsx";
import { getPopularPricingPlans } from "../sanity/utils.ts";
import type { PricingPlan } from "../sanity/types.ts";

const PricingWrapper = () => {
    const [pricing, setPricing] = useState<PricingPlan[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPricing = async () => {
            try {
                setLoading(true);
                const response = await getPopularPricingPlans();
                setPricing(response);
                setError(null);
            } catch (error) {
                console.error("Error fetching pricing plans:", error);
                setError("Erro ao carregar os planos de preços");
            } finally {
                setLoading(false);
            }
        };
        fetchPricing();
    }, []);

    const formatPrice = (price: number, priceType: string) => {
        const formattedPrice = price.toLocaleString('pt-BR');
        switch (priceType) {
            case 'starting_from':
                return `A partir de ${formattedPrice}`;
            case 'per_hour':
                return `${formattedPrice}/hora`;
            case 'consultation':
                return 'Consulta';
            default:
                return formattedPrice;
        }
    };

    const getPeriodText = (priceType: string, duration?: string) => {
        switch (priceType) {
            case 'per_hour':
                return 'por hora';
            case 'consultation':
                return 'consulta';
            default:
                return duration || 'por sessão';
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-4 text-gray-600">Carregando planos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center text-red-600">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!pricing || pricing.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center text-gray-600">
                    <p>Nenhum plano disponível no momento.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="mb-12 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 text-center">
                    Planos de Preços
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto md:text-center text-left">
                    Escolha o plano que melhor se adapta às suas necessidades
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-6 ">
                {pricing.map((plan) => {
                    const planData = plan.pricingPlan;
                    const features = planData.featuresIncluded.map(item => item.feature);

                    return (
                        <PricingTable
                            key={plan._id}
                            featured={planData.isPopular}
                            className={pricing.length === 1 ? "max-w-md mx-auto" : ""}
                        >
                            <PricingTable.Header>
                                <PricingTable.Title
                                    title={planData.title}
                                    subtitle={planData.shortDescription}
                                />
                                <PricingTable.Price
                                    currency="R$"
                                    amount={formatPrice(planData.price, planData.priceType)}
                                    period={getPeriodText(planData.priceType, planData.duration)}
                                />
                                <PricingTable.Button
                                    variant={planData.isPopular ? "primary" : "secondary"}
                                    href="/#contato"
                                >
                                    Agendar Sessão
                                </PricingTable.Button>
                            </PricingTable.Header>

                            <PricingTable.Content>
                                <PricingTable.FeatureList features={features} />

                                {(planData.deliveryTime || planData.specialNotes) && (
                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        {planData.deliveryTime && (
                                            <div className="flex items-center gap-2 mb-3">
                                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm text-gray-600">
                                                    Entrega: {planData.deliveryTime}
                                                </span>
                                            </div>
                                        )}
                                        {planData.specialNotes && (
                                            <div className="text-xs text-gray-500 italic">
                                                {planData.specialNotes}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </PricingTable.Content>
                        </PricingTable>
                    );
                })}
            </div>

            <div className="mt-16 text-center">
                <div className="bg-gray-50 rounded-xl p-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Não encontrou o que procura?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Entre em contato conosco para criar um pacote personalizado
                    </p>
                    <a
                        href="/#contato"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
                    >
                        Solicitar Orçamento Personalizado
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PricingWrapper;