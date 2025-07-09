import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface FormContextValue {
    values: Record<string, string>;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    requiredFields: Set<string>;
    fieldValidations: Record<string, (value: string) => string | undefined>;
    isSubmitting: boolean;
    submitSuccess: boolean;
    submitError: string | null;
    handleChange: (name: string, value: string) => void;
    handleBlur: (name: string) => void;
    setError: (name: string, error: string) => void;
    clearError: (name: string) => void;
    validateField: (name: string, validation?: (value: string) => string | undefined) => void;
    registerField: (name: string, required: boolean, validation?: (value: string) => string | undefined) => void;
    isFormValid: () => boolean;
    setValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    setTouched: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    setSubmitSuccess: React.Dispatch<React.SetStateAction<boolean>>;
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
    validateOnSubmit?: boolean;
    action: string;
    method?: 'POST' | 'GET';
}

const Form = ({ children, onSubmit, initialValues = {}, className = "", validateOnSubmit = true, action, method = "POST" }: FormProps) => {
    const [values, setValues] = useState<Record<string, string>>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [requiredFields, setRequiredFields] = useState<Set<string>>(new Set());
    const [fieldValidations, setFieldValidations] = useState<Record<string, (value: string) => string | undefined>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

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

    const validateField = (name: string, validation?: (value: string) => string | undefined) => {
        if (validation) {
            const value = values[name] || '';
            const validationError = validation(value);
            if (validationError) {
                setError(name, validationError);
                return false;
            } else {
                clearError(name);
                return true;
            }
        }
        return true;
    };

    const registerField = (name: string, required: boolean, validation?: (value: string) => string | undefined) => {
        if (required) {
            setRequiredFields(prev => new Set([...prev, name]));
        }
        if (validation) {
            setFieldValidations(prev => ({ ...prev, [name]: validation }));
        }
    };

    const isFormValid = () => {
        if (requiredFields.size === 0) {
            return true;
        }

        for (const fieldName of requiredFields) {
            const value = values[fieldName] || '';
            if (!value.trim()) {
                return false;
            }
        }

        for (const fieldName of Object.keys(fieldValidations)) {
            const value = values[fieldName] || '';
            const validation = fieldValidations[fieldName];
            if (validation && value.trim() && validation(value)) {
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        if (onSubmit) {
            e.preventDefault();
            setIsSubmitting(true);
            setSubmitError(null);
            setSubmitSuccess(false);

            try {
                await onSubmit(values);
                setSubmitSuccess(true);
            } catch (error) {
                setSubmitError(error instanceof Error ? error.message : 'Erro ao enviar formulário');
            } finally {
                setIsSubmitting(false);
            }
        } else {
            // For FormSubmit.co AJAX endpoint
            e.preventDefault();
            setIsSubmitting(true);
            setSubmitError(null);
            setSubmitSuccess(false);

            try {
                const formData = new FormData();

                // Add all form values
                Object.entries(values).forEach(([key, value]) => {
                    if (value.trim()) formData.append(key, value);
                });

                // Add hidden fields from the form
                const hiddenInputs = (e.target as HTMLFormElement).querySelectorAll('input[type="hidden"]');
                hiddenInputs.forEach((input) => {
                    const hiddenInput = input as HTMLInputElement;
                    if (hiddenInput.name && hiddenInput.value) {
                        formData.append(hiddenInput.name, hiddenInput.value);
                    }
                });

                const response = await fetch(action, {
                    method: method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const result = await response.json();

                if (response.ok || result.success) {
                    setSubmitSuccess(true);
                    setValues({});
                    setTouched({});
                    setErrors({});
                } else {
                    throw new Error(result.message || 'Falha ao enviar formulário');
                }
            } catch (error) {
                setSubmitError(error instanceof Error ? error.message : 'Erro ao enviar formulário');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const contextValue: FormContextValue = {
        values,
        errors,
        touched,
        requiredFields,
        fieldValidations,
        isSubmitting,
        submitSuccess,
        submitError,
        handleChange,
        handleBlur,
        setError,
        clearError,
        validateField,
        registerField,
        isFormValid,
        setValues,
        setTouched,
        setErrors,
        setSubmitSuccess,
    };

    return (
        <FormContext.Provider value={contextValue}>
            <form onSubmit={handleSubmit} className={className} action={action} method={method} noValidate>
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
    const { values, errors, touched, handleChange, handleBlur, setError, registerField } = useFormContext();

    const value = values[name] || '';
    const error = errors[name];
    const isTouched = touched[name];
    const hasError = error && isTouched;

    useEffect(() => {
        registerField(name, required, validation);
    }, [name, required, validation]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        handleChange(name, newValue);

        if (validation && isTouched) {
            const validationError = validation(newValue);
            if (validationError) {
                setError(name, validationError);
            }
        }
    };

    const handleInputBlur = () => {
        handleBlur(name);

        if (validation && value.trim()) {
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
                className={`peer relative h-12 w-full rounded border px-4 text-sm transition-all outline-none autofill:bg-white placeholder-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${hasError
                    ? 'border-red-500 text-red-500 focus:border-red-500'
                    : 'border-gray-300 text-gray-700 focus:border-primary'
                    }`}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                required={required}
                disabled={disabled}
            />
            <label
                htmlFor={name}
                className={`absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-disabled:cursor-not-allowed peer-disabled:before:bg-transparent ${hasError
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
    const { values, errors, touched, handleChange, handleBlur, setError, registerField } = useFormContext();

    const value = values[name] || '';
    const error = errors[name];
    const isTouched = touched[name];
    const hasError = error && isTouched;

    useEffect(() => {
        registerField(name, required, validation);
    }, [name, required, validation, registerField]);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        handleChange(name, newValue);

        if (validation && isTouched) {
            const validationError = validation(newValue);
            if (validationError) {
                setError(name, validationError);
            }
        }
    };

    const handleTextareaBlur = () => {
        handleBlur(name);

        if (validation && value.trim()) {
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
                className={`peer relative w-full rounded border px-4 py-3 text-sm transition-all outline-none resize-none placeholder-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${hasError
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
                className={`absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-disabled:cursor-not-allowed peer-disabled:before:bg-transparent ${hasError
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

interface SelectFieldProps {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    required?: boolean;
    disabled?: boolean;
    className?: string;
    validation?: (value: string) => string | undefined;
}

const SelectField = ({
    name,
    label,
    options,
    required = false,
    disabled = false,
    className = "",
    validation
}: SelectFieldProps) => {
    const { values, errors, touched, handleChange, handleBlur, setError, registerField } = useFormContext();

    const value = values[name] || '';
    const error = errors[name];
    const isTouched = touched[name];
    const hasError = error && isTouched;

    useEffect(() => {
        registerField(name, required, validation);
    }, [name, required, validation, registerField]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        handleChange(name, newValue);

        if (validation && isTouched) {
            const validationError = validation(newValue);
            if (validationError) {
                setError(name, validationError);
            }
        }
    };

    const handleSelectBlur = () => {
        handleBlur(name);

        if (validation && value.trim()) {
            const validationError = validation(value);
            if (validationError) {
                setError(name, validationError);
            }
        }
    };

    return (
        <div className={`relative my-6 ${className}`}>
            <select
                id={name}
                name={name}
                value={value}
                className={`peer relative w-full rounded border px-4 py-3 text-sm transition-all outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${hasError
                    ? 'border-red-500 text-red-500 focus:border-red-500'
                    : 'border-gray-300 text-gray-700 focus:border-primary'
                    }`}
                onChange={handleSelectChange}
                onBlur={handleSelectBlur}
                required={required}
                disabled={disabled}
            >
                <option value="" disabled>{label}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <label
                htmlFor={name}
                className={`absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-disabled:cursor-not-allowed peer-disabled:before:bg-transparent ${hasError
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
    const { isFormValid, isSubmitting } = useFormContext();
    const isDisabled = disabled || loading || isSubmitting || !isFormValid();
    const showLoading = loading || isSubmitting;

    const baseClasses = "relative px-6 py-3 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    const variantClasses = {
        primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500"
    };

    return (
        <button
            type="submit"
            disabled={isDisabled}
            className={`${baseClasses} ${variantClasses[variant]} ${className}${isDisabled
                ? ' opacity-50 cursor-not-allowed' + (variant === 'primary' ? ' bg-gray-400 hover:bg-gray-400' : ' bg-gray-200 hover:bg-gray-200')
                : ''
                }`}
        >
            {showLoading && (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </span>
            )}
            <span className={showLoading ? 'invisible' : ''}>
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

interface FormFeedbackProps {
    className?: string;
    successMessage?: string;
    errorMessage?: string;
    showOnSuccess?: boolean;
    showOnError?: boolean;
}

const FormFeedback = ({
    className = "",
    successMessage = "Formulário enviado com sucesso!",
    errorMessage = "Erro ao enviar formulário. Tente novamente.",
    showOnSuccess = true,
    showOnError = true
}: FormFeedbackProps) => {
    const { isSubmitting, submitSuccess, submitError, values, setValues, setTouched, setErrors, setSubmitSuccess } = useFormContext();

    const handleReset = () => {
        setSubmitSuccess(false);
        setValues({});
        setTouched({});
        setErrors({});
    };

    if (isSubmitting) {
        return (
            <div className={`flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg ${className}`}>
                <svg className="animate-spin h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-blue-700 font-medium">Enviando formulário...</span>
            </div>
        );
    }

    if (submitSuccess && showOnSuccess) {
        return (
            <div className={`p-4 bg-green-50 border border-green-200 rounded-lg ${className}`}>
                <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-green-700 font-medium">{successMessage}</span>
                </div>
                <button
                    onClick={handleReset}
                    className="text-sm text-green-600 hover:text-green-700 underline"
                >
                    Enviar outro formulário
                </button>
            </div>
        );
    }

    if (submitError && showOnError) {
        return (
            <div className={`flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span className="text-red-700 font-medium">{submitError || errorMessage}</span>
            </div>
        );
    }

    return null;
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
    Feedback: FormFeedback,
    validators
});
