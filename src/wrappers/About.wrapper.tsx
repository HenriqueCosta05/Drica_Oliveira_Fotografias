import { useEffect } from "react"
import { About } from "../components/About.tsx"
import type { AboutInfo } from "../sanity/types.ts";
import { getAboutInfo } from "../sanity/utils.ts";
import { useAsyncLoading } from "../hooks/useLoading.ts";
import { LoadingSkeleton, ImageWithLoading } from "../components/Loading.tsx";

const AboutWrapper = () => {
    const {
        isLoading,
        data,
        error,
        execute
    } = useAsyncLoading<AboutInfo>({
        onError: (error) => {
            console.error('Error fetching about info:', error);
        }
    });

    useEffect(() => {
        execute(async () => {
            const result = await getAboutInfo();
            if (!result) throw new Error("No about info found");
            return result;
        });
    }, []); 

    if (isLoading) {
        return (
            <section className="w-full my-40 relative px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8 md:gap-16">
                        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                            <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
                            <LoadingSkeleton rows={4} className="w-full max-w-2xl" />
                        </div>
                        <div className="flex-shrink-0 mb-8 md:mb-0">
                            <div className="w-48 h-48 md:w-64 md:h-64 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="space-y-4">
                                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                                <LoadingSkeleton rows={3} />
                            </div>
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
                        <h2 className="text-xl font-semibold text-red-700 mb-2">Erro ao carregar informações</h2>
                        <p className="text-red-600 mb-4">Não foi possível carregar as informações sobre nós.</p>
                        <button
                            onClick={() => execute(async () => {
                                const result = await getAboutInfo();
                                if (!result) throw new Error("No about info found");
                                return result;
                            })}
                            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                            Tentar novamente
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (!data) {
        return (
            <section className="w-full my-40 relative px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                        <div className="text-gray-400 text-4xl mb-4">📄</div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma informação disponível</h2>
                        <p className="text-gray-600">As informações sobre nós não estão disponíveis no momento.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full my-40 relative px-4" id="sobre">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8 md:gap-16">
                    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                        <About.Title title="Sobre mim" />
                        <About.Description text={data?.aboutInfo.history} />
                    </div>
                    <div className="flex-shrink-0 mb-8 md:mb-0">
                        <ImageWithLoading
                            src={data.aboutInfo.profileImage}
                            alt="Sobre mim"
                            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-lg shadow-lg"
                            placeholderClassName="w-48 h-48 md:w-64 md:h-64"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    <About.Feature
                        title="Missão"
                        description={data?.aboutInfo.mission || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                    />
                    <About.Feature
                        title="Visão"
                        description={data?.aboutInfo.vision || "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                    />
                    <About.Feature
                        title="Valores"
                        description={data?.aboutInfo.values || "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
                    />
                </div>
            </div>
        </section>
    );
}
export default AboutWrapper;