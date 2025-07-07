import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'primary' | 'secondary' | 'white' | 'gray';
    className?: string;
}

interface LoadingSkeletonProps {
    className?: string;
    rows?: number;
    avatar?: boolean;
}

interface LoadingOverlayProps {
    isVisible: boolean;
    message?: string;
    children?: React.ReactNode;
}

interface LoadingPlaceholderProps {
    type: 'image' | 'text' | 'card' | 'hero' | 'gallery';
    className?: string;
    count?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    color = 'primary',
    className = ''
}) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16'
    };

    const colorClasses = {
        primary: 'border-primary',
        secondary: 'border-secondary',
        white: 'border-white',
        gray: 'border-gray-400'
    };

    return (
        <div className={`${sizeClasses[size]} ${className}`}>
            <div className={`animate-spin rounded-full border-2 border-t-transparent ${colorClasses[color]} h-full w-full`}></div>
        </div>
    );
};

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
    className = '',
    rows = 3,
    avatar = false
}) => {
    return (
        <div className={`animate-pulse ${className}`}>
            {avatar && (
                <div className="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
            )}
            <div className="space-y-3">
                {Array.from({ length: rows }).map((_, index) => (
                    <div key={index} className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        {index === rows - 1 && (
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    isVisible,
    message = 'Carregando...',
    children
}) => {
    if (!isVisible) return <>{children}</>;

    return (
        <div className="relative">
            {children}
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-40">
                <div className="flex flex-col items-center space-y-4">
                    <LoadingSpinner size="lg" color="primary" />
                    <p className="text-gray-600 font-medium">{message}</p>
                </div>
            </div>
        </div>
    );
};

export const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = ({
    type,
    className = '',
    count = 1
}) => {
    const renderPlaceholder = () => {
        switch (type) {
            case 'image':
                return (
                    <div className={`bg-gray-200 animate-pulse rounded-lg ${className}`}>
                        <div className="flex items-center justify-center h-full">
                            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                );
            case 'text':
                return <LoadingSkeleton className={className} rows={3} />;
            case 'card':
                return (
                    <div className={`bg-white border rounded-lg p-6 animate-pulse ${className}`}>
                        <LoadingPlaceholder type="image" className="h-48 mb-4" />
                        <LoadingSkeleton rows={2} />
                    </div>
                );
            case 'hero':
                return (
                    <div className={`bg-gray-200 animate-pulse ${className}`}>
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center space-y-4">
                                <div className="h-8 bg-gray-300 rounded w-64 mx-auto"></div>
                                <div className="h-4 bg-gray-300 rounded w-48 mx-auto"></div>
                                <div className="h-10 bg-gray-300 rounded w-32 mx-auto"></div>
                            </div>
                        </div>
                    </div>
                );
            case 'gallery':
                return (
                    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ${className}`}>
                        {Array.from({ length: count }).map((_, index) => (
                            <LoadingPlaceholder
                                key={index}
                                type="image"
                                className="aspect-square"
                            />
                        ))}
                    </div>
                );
            default:
                return <LoadingSkeleton className={className} />;
        }
    };

    return <>{renderPlaceholder()}</>;
};

export const PageLoading: React.FC<{ message?: string }> = ({
    message = 'Carregando página...'
}) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center space-y-6">
                <LoadingSpinner size="xl" color="primary" />
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-700">{message}</h2>
                    <p className="text-gray-500">Por favor, aguarde...</p>
                </div>
            </div>
        </div>
    );
};

export const ImageWithLoading: React.FC<{
    src: string;
    alt: string;
    className?: string;
    placeholderClassName?: string;
    onLoad?: () => void;
    onError?: () => void;
}> = ({ src, alt, className = '', placeholderClassName = '', onLoad, onError }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [hasError, setHasError] = React.useState(false);

    const handleLoad = () => {
        setIsLoading(false);
        onLoad?.();
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
        onError?.();
    };

    return (
        <div className="relative">
            {isLoading && (
                <LoadingPlaceholder
                    type="image"
                    className={`absolute inset-0 ${placeholderClassName}`}
                />
            )}
            {hasError ? (
                <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
                    <span className="text-gray-400 text-sm">Erro ao carregar imagem</span>
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                    onLoad={handleLoad}
                    onError={handleError}
                />
            )}
        </div>
    );
};
