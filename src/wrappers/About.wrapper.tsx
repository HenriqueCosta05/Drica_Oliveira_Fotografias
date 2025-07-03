import { useEffect, useState } from "react"
import { About } from "../components/About.tsx"
import type { AboutInfo } from "../sanity/types.ts";
import { getAboutInfo } from "../sanity/utils.ts";

const AboutWrapper = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<AboutInfo | null>(null);

    useEffect(() => {
        const fetchAboutInfo = async () => {
            try {
                const response = await getAboutInfo();
                console.log('Fetched about info:', response);
                setData(response);
            } catch (error) {
                console.error('Error fetching about info:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAboutInfo();
    }, []);

    if (loading || !data) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <section className="w-full my-32 h-screen relative mx-auto px-4">
            <div className="mx-auto">
                <div className="flex flex-row items-center justify-between text-center">
                    <div className="flex flex-col items-center justify-center sm:flex-wrap max-w-7xl mx-auto">
                        <About.Title title="Sobre mim" />
                        <About.Description text={data?.aboutInfo.history} />
                    </div>
                    <About.Image src={data.aboutInfo.profileImage} alt="About Us" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-7xl">
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