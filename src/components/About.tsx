
interface TitleProps {
    title?: string;
}

interface DescriptionProps {
    text?: string;
}

interface ImageProps {
    src?: string;
    alt?: string;
}

const Title = (Props: TitleProps) => (
    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        {Props.title || 'About Us'}
    </h1>
);

const Description = (Props: DescriptionProps) => (
    <p className="text-lg md:text-xl mb-8 text-left">
        {Props.text || 'We are a team of passionate photographers dedicated to capturing the beauty of life.'}
    </p>
);

const Feature = ({ title, description }: { title: string; description: string }) => (
    <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center rounded bg-primary p-2 text-white">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
                aria-label="Dashboard icon"
                role="graphics-symbol"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
            </svg>
        </div>
        <div className="flex w-full min-w-0 flex-col items-center justify-center gap-0 text-base">
            <h3 className="mb-2 py-2 text-lg leading-6 text-slate-700">
                {title}
            </h3>
            <p className="text-slate-500">
                {description}
            </p>
        </div>
    </div>
);

const Image = (Props: ImageProps) => (
    <img
        src={Props.src || '/default-image.jpg'}
        alt={Props.alt || 'About Us'}
        className="rounded-lg shadow-lg w-full max-w-[400px] object-cover mx-auto"
    />
);

export const About = {
    Title: Title,
    Description: Description,
    Image: Image,
    Feature: Feature,
}