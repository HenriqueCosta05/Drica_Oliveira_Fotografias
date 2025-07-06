import React from "react";

interface PricingTableProps {
    children: React.ReactNode;
    className?: string;
    featured?: boolean;
}

interface PricingHeaderProps {
    children: React.ReactNode;
    className?: string;
}

interface PricingTitleProps {
    title: string;
    subtitle?: string;
    className?: string;
}

interface PricingPriceProps {
    currency?: string;
    amount: string | number;
    period?: string;
    className?: string;
}

interface PricingButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    variant?: 'primary' | 'secondary';
    className?: string;
}

interface PricingContentProps {
    children: React.ReactNode;
    className?: string;
}

interface PricingFeatureListProps {
    features: string[];
    className?: string;
}

interface PricingFooterProps {
    children: React.ReactNode;
    className?: string;
}

const PricingTableRoot: React.FC<PricingTableProps> = ({
    children,
    className = '',
    featured = false
}) => {
    const baseClasses = "mx-auto max-w-sm overflow-hidden rounded-xl bg-white text-gray-600 shadow-lg transition-all duration-300 hover:shadow-xl";
    const featuredClasses = featured
        ? "ring-2 ring-primary shadow-xl shadow-primary/20 scale-105"
        : "shadow-gray-200";

    return (
        <div className={`${baseClasses} ${featuredClasses} ${className}`}>
            <div className="flex flex-col h-full">
                {children}
            </div>
        </div>
    );
};

const PricingHeader: React.FC<PricingHeaderProps> = ({ children, className = '' }) => {
    return (
        <header className={`flex flex-col gap-6 p-6 text-gray-500 ${className}`}>
            {children}
        </header>
    );
};

const PricingTitle: React.FC<PricingTitleProps> = ({
    title,
    subtitle,
    className = ''
}) => {
    return (
        <h3 className={`text-xl font-bold text-gray-800 ${className}`}>
            {title}
            {subtitle && (
                <span className="block text-sm font-normal text-gray-500 mt-1">
                    {subtitle}
                </span>
            )}
        </h3>
    );
};

const PricingPrice: React.FC<PricingPriceProps> = ({
    currency = "R$",
    amount,
    period = "/sessão",
    className = ''
}) => {
    return (
        <h4 className={`${className}`}>
            <span className="text-2xl text-gray-600">{currency}</span>
            <span className="text-4xl lg:text-5xl font-bold tracking-tighter text-gray-800 transition-all duration-300 mx-1">
                {amount}
            </span>
            <span className="text-sm text-gray-500">{period}</span>
        </h4>
    );
};

const PricingButton: React.FC<PricingButtonProps> = ({
    children,
    onClick,
    href,
    variant = 'primary',
    className = ''
}) => {
    const baseClasses = "inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus:ring-2 focus:ring-offset-2";

    const variantClasses = {
        primary: "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-md hover:shadow-primary/30 focus:bg-primary-dark focus:ring-primary/20 transform hover:scale-105",
        secondary: "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:bg-gray-50 focus:ring-gray/20"
    };

    const content = (
        <span className="flex items-center gap-2">
            {children}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </span>
    );

    if (href) {
        return (
            <a href={href} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
                {content}
            </a>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        >
            {content}
        </button>
    );
};

const PricingContent: React.FC<PricingContentProps> = ({ children, className = '' }) => {
    return (
        <div className={`p-6 flex-grow ${className}`}>
            {children}
        </div>
    );
};

const PricingFeatureList: React.FC<PricingFeatureListProps> = ({ features, className = '' }) => {
    return (
        <ul className={`space-y-4 ${className}`}>
            {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 shrink-0 mt-0.5 text-primary"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                </li>
            ))}
        </ul>
    );
};

const PricingFooter: React.FC<PricingFooterProps> = ({ children, className = '' }) => {
    return (
        <footer className={`border-t border-gray-100 bg-gray-50 p-6 text-center text-sm ${className}`}>
            {children}
        </footer>
    );
};

export const PricingTable = Object.assign(PricingTableRoot, {
    Header: PricingHeader,
    Title: PricingTitle,
    Price: PricingPrice,
    Button: PricingButton,
    Content: PricingContent,
    FeatureList: PricingFeatureList,
    Footer: PricingFooter
});
