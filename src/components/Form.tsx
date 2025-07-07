import React, { useState } from 'react';
import type { ReactNode } from 'react';

// Form context for managing form state
interface FormContextValue {
    values: Record<string, string>;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    handleChange: (name: string, value: string) => void;
    handleBlur: (name: string) => void;
    setError: (name: string, error: string) => void;
    clearError: (name: string) => void;
}

const FormContext = React.createContext<FormContextValue | null>(null);

const useFormContext = () => {
    const context = React.useContext(FormContext);
    if (!context) {
        throw new Error('Form components must be used within a Form component');
    }
    return context;
};

interface FormProps {
    children: ReactNode;
    onSubmit?: (values: Record<string, string>) => void;
    initialValues?: Record<string, string>;
    className?: string;
}

const Form = ({ children, onSubmit, initialValues = {}, className = "" }: FormProps) => {
    const [values, setValues] = useState<Record<string, string>>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleChange = (name: string, value: string) => {
        setValues(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleBlur = (name: string) => {
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const setError = (name: string, error: string) => {
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const clearError = (name: string) => {
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(values);
        }
    };

    const contextValue: FormContextValue = {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setError,
        clearError,
    };

    return (
        <FormContext.Provider value={contextValue}>
            <form onSubmit={handleSubmit} className={className}>
                {children}
            </form>
        </FormContext.Provider>
    );
};

interface InputFieldProps {
    name: string;
    label: string;
    type?: 'text' | 'email' | 'tel' | 'password' | 'url';
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    validation?: (value: string) => string | undefined;
}

const InputField = ({
    name,
    label,
    type = 'text',
    placeholder,
    required = false,
    disabled = false,
    className = "",
    validation
}: InputFieldProps) => {
    const { values, errors, touched, handleChange, handleBlur, setError } = useFormContext();
    
    const value = values[name] || '';
    const error = errors[name];
    const isTouched = touched[name];
    const hasError = error && isTouched;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        handleChange(name, newValue);
        
        if (validation) {
            const validationError = validation(newValue);
            if (validationError) {
                setError(name, validationError);
            }
        }
    };

    const handleInputBlur = () => {
        handleBlur(name);
        
        if (validation) {
            const validationError = validation(value);
            if (validationError) {
                setError(name, validationError);
            }
        }
    };

    return (
        <div className={`relative my-6 ${className}`}>
            <input
                id={name}
                type={type}
                name={name}
                placeholder={placeholder || label.toLowerCase()}
                value={value}
                className={`peer relative h-12 w-full rounded border px-4 text-sm transition-all outline-none autofill:bg-white placeholder-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
                    hasError
                        ? 'border-red-500 text-red-500 focus:border-red-500 invalid:focus:border-red-500'
                        : 'border-gray-300 text-gray-700 focus:border-primary invalid:border-red-500 invalid:text-red-500 invalid:focus:border-red-500'
                }`}
                style={{
                    '--tw-border-color': hasError ? '#ef4444' : undefined,
                } as React.CSSProperties}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                required={required}
                disabled={disabled}
            />
            <label
                htmlFor={name}
                className={`absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-disabled:cursor-not-allowed peer-disabled:before:bg-transparent ${
                    hasError
                        ? 'text-red-500 peer-focus:text-red-500 peer-invalid:text-red-500 peer-invalid:peer-focus:text-red-500'
                        : 'text-gray-500 peer-focus:text-primary peer-invalid:text-red-500 peer-invalid:peer-focus:text-red-500 peer-disabled:text-gray-400'
                } ${required ? "after:text-red-500 after:content-['\\00a0*'] peer-required:after:text-red-500 peer-required:after:content-['\\00a0*']" : ''}`}
                style={{
                    color: hasError ? '#ef4444' : undefined,
                    '--tw-text-opacity': 1,
                } as React.CSSProperties}
            >
                {label}
            </label>
            {hasError && (
                <div className="mt-1 text-xs text-red-500">
                    {error}
                </div>
            )}
        </div>
    );
};

interface TextareaFieldProps {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    rows?: number;
    className?: string;
    validation?: (value: string) => string | undefined;
}

const TextareaField = ({
    name,
    label,
    placeholder,
    required = false,
    disabled = false,
    rows = 4,
    className = "",
    validation
}: TextareaFieldProps) => {
    const { values, errors, touched, handleChange, handleBlur, setError } = useFormContext();
    
    const value = values[name] || '';
    const error = errors[name];
    const isTouched = touched[name];
    const hasError = error && isTouched;

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        handleChange(name, newValue);
        
        if (validation) {
            const validationError = validation(newValue);
            if (validationError) {
                setError(name, validationError);
            }
        }
    };

    const handleTextareaBlur = () => {
        handleBlur(name);
        
        if (validation) {
            const validationError = validation(value);
            if (validationError) {
                setError(name, validationError);
            }
        }
    };

    return (
        <div className={`relative my-6 ${className}`}>
            <textarea
                id={name}
                name={name}
                placeholder={placeholder || label.toLowerCase()}
                value={value}
                rows={rows}
                className={`peer relative w-full rounded border px-4 py-3 text-sm transition-all outline-none resize-none placeholder-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
                    hasError
                        ? 'border-red-500 text-red-500 focus:border-red-500'
                        : 'border-gray-300 text-gray-700 focus:border-primary'
                }`}
                onChange={handleTextareaChange}
                onBlur={handleTextareaBlur}
                required={required}
                disabled={disabled}
            />
            <label
                htmlFor={name}
                className={`absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-disabled:cursor-not-allowed peer-disabled:before:bg-transparent ${
                    hasError
                        ? 'text-red-500 peer-focus:text-red-500'
                        : 'text-gray-500 peer-focus:text-primary peer-disabled:text-gray-400'
                } ${required ? "after:text-red-500 after:content-['\\00a0*']" : ''}`}
            >
                {label}
            </label>
            {hasError && (
                <div className="mt-1 text-xs text-red-500">
                    {error}
                </div>
            )}
        </div>
    );
};

interface SubmitButtonProps {
    children: ReactNode;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    variant?: 'primary' | 'secondary';
}

const SubmitButton = ({
    children,
    loading = false,
    disabled = false,
    className = "",
    variant = 'primary'
}: SubmitButtonProps) => {
    const baseClasses = "relative px-6 py-3 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    
    const variantClasses = {
        primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500"
    };

    return (
        <button
            type="submit"
            disabled={disabled || loading}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        >
            {loading && (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </span>
            )}
            <span className={loading ? 'invisible' : ''}>
                {children}
            </span>
        </button>
    );
};

interface FormSectionProps {
    title?: string;
    description?: string;
    children: ReactNode;
    className?: string;
}

const FormSection = ({ title, description, children, className = "" }: FormSectionProps) => {
    return (
        <div className={`space-y-6 ${className}`}>
            {(title || description) && (
                <div className="space-y-2">
                    {title && (
                        <h3 className="text-lg font-semibold text-contrast">
                            {title}
                        </h3>
                    )}
                    {description && (
                        <p className="text-sm text-gray-600">
                            {description}
                        </p>
                    )}
                </div>
            )}
            {children}
        </div>
    );
};

export const validators = {
    required: (message = 'Este campo é obrigatório') => (value: string) => {
        return value.trim() ? undefined : message;
    },
    email: (message = 'Email inválido') => (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? undefined : message;
    },
    minLength: (min: number, message?: string) => (value: string) => {
        return value.length >= min ? undefined : message || `Mínimo ${min} caracteres`;
    },
    maxLength: (max: number, message?: string) => (value: string) => {
        return value.length <= max ? undefined : message || `Máximo ${max} caracteres`;
    },
    phone: (message = 'Número de telefone inválido') => (value: string) => {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(value.replace(/\D/g, '')) ? undefined : message;
    }
};

export default Object.assign(Form, {
    Input: InputField,
    Textarea: TextareaField,
    Submit: SubmitButton,
    Section: FormSection,
    validators
});
