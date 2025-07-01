import React from 'react';

type HeroProps = {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink?: string;
};

const HeroCarousel: React.FC<HeroProps> = ({ title, subtitle, buttonText, buttonLink = '#contact' }) => {
    return (
        <section className="bg- py-20 text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                <p className="text-gray-700 mb-6">{subtitle}</p>
                <a
                    href={buttonLink}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg inline-block"
                >
                    {buttonText}
                </a>
            </div>
        </section>
    );
};

export default Hero;
