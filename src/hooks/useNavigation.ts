import { useState, useEffect } from 'react';

export const useNavigation = () => {
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id], div[id]');
            const scrollPosition = window.scrollY + 100;

            sections.forEach((section) => {
                const element = section as HTMLElement;
                const { top, height } = element.getBoundingClientRect();
                const sectionTop = top + window.scrollY;
                const sectionBottom = sectionTop + height;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    setActiveSection(element.id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return { activeSection, scrollToSection };
};
