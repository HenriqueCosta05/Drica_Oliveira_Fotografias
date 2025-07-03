export const Root = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={`overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 ${className || ''}`}>
            {children}
        </div>
    );
}

export const Title = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <h3 className={`text-xl font-medium text-slate-700 ${className || ''}`}>
            {children}
        </h3>
    );
}

export const Description = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <p className={`text-sm text-slate-500 ${className || ''}`}>
            {children}
        </p>
    );
}

export const Image = ({ src, alt, className }: { src: string; alt?: string; className?: string }) => {
    return (
        <img
            src={src}
            alt={alt || 'Card image'}
            className={`aspect-video w-full ${className || ''}`}
        />
    );
}

export const Card = {
    Root: Root,
    Title: Title,
    Description: Description,
    Image: Image,
}


