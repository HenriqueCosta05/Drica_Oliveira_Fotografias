import { useEffect, useState } from "react";
import { useAsyncLoading } from "../hooks/useLoading.ts";
import Form from "../components/Form.tsx";
import { getFormBySlug, getServiceById } from "../sanity/utils.ts";
import type { FormConfig, FormField, ServiceExtended } from "../sanity/types.ts";

interface ServiceFormWrapperProps {
    formId: string;
    serviceId?: string;
    className?: string;
    showTitle?: boolean;
    showDescription?: boolean;
    showContactInfo?: boolean;
    contactInfo?: {
        phone?: string;
        email?: string;
        hours?: string;
    };
}

const ServiceFormWrapper = ({
    formId,
    serviceId,
    className = "",
    showTitle = true,
    showDescription = true,
    showContactInfo = true,
    contactInfo = {
        phone: "+55 (11) 99999-9999",
        email: "contato@aofotografia.com",
        hours: "Seg - Sex: 9h às 18h"
    }
}: ServiceFormWrapperProps) => {
    const {
        isLoading: isLoadingForm,
        data: formConfig,
        error: formError,
        execute: executeFormFetch
    } = useAsyncLoading<FormConfig>({
        onError: (error) => {
            console.error('Error fetching form config:', error);
        }
    });

    const {
        isLoading: isLoadingService,
        data: serviceData,
        error: serviceError,
        execute: executeServiceFetch
    } = useAsyncLoading<ServiceExtended | null>({
        onError: (error) => {
            console.error('Error fetching service data:', error);
        }
    });

    useEffect(() => {
        if (formId) {
            executeFormFetch(() => getFormBySlug(formId) as Promise<FormConfig>);
        }
    }, [formId]);

    useEffect(() => {
        if (serviceId) {
            executeServiceFetch(() => getServiceById(serviceId));
        }
    }, [serviceId]);

    const getFieldType = (fieldType: FormField['fieldType']): 'text' | 'email' | 'tel' | 'password' | 'url' => {
        switch (fieldType) {
            case 'email':
                return 'email';
            case 'phone':
                return 'tel';
            case 'number':
            case 'date':
            default:
                return 'text';
        }
    };

    const getFieldValidation = (field: FormField) => {
        const validations: Array<(value: string) => string | undefined> = [];

        if (field.isRequired) {
            validations.push(Form.validators.required());
        }

        if (field.fieldType === 'email') {
            validations.push(Form.validators.email());
        }

        if (field.fieldType === 'phone') {
            validations.push(Form.validators.phone());
        }

        if (field.validation?.minLength) {
            validations.push(Form.validators.minLength(field.validation.minLength));
        }

        if (field.validation?.maxLength) {
            validations.push(Form.validators.maxLength(field.validation.maxLength));
        }

        return validations.length > 0 ? (value: string) => {
            if (!value.trim() && !field.isRequired) {
                return undefined;
            }

            for (const validation of validations) {
                const error = validation(value);
                if (error) return error;
            }
            return undefined;
        } : undefined;
    };

    const getFieldWidthClass = (width: FormField['width']) => {
        switch (width) {
            case 'half':
                return 'md:w-1/2';
            case 'third':
                return 'md:w-1/3';
            case 'two-thirds':
                return 'md:w-2/3';
            default:
                return 'w-full';
        }
    };

    const isLoading = isLoadingForm || isLoadingService;
    const error = formError || serviceError;

    const getEmailSubject = () => {
        if (serviceData?.serviceExtended?.title) {
            return `Nova prospecção - ${serviceData.serviceExtended.title} - Adriana Oliveira Fotografia`;
        }
        return `Nova prospecção - Adriana Oliveira Fotografia (${formConfig?.formConfig.title || 'Geral'})`;
    };

    if (isLoading) {
        return (
            <section className={`relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 overflow-hidden ${className}`}>
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
                            <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                        <div className="h-12 bg-gray-200 rounded w-96 mx-auto animate-pulse mb-6"></div>
                        <div className="h-6 bg-gray-200 rounded w-[600px] mx-auto animate-pulse"></div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl transform rotate-1"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl transform -rotate-1"></div>

                        <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                            <div className="p-8 md:p-12">
                                <div className="max-w-2xl mx-auto space-y-6">
                                    <div className="space-y-4">
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <div key={i} className="space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="h-12 bg-gray-200 rounded w-32 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error || !formConfig) {
        return (
            <section className={`relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 overflow-hidden ${className}`}>
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
                            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-contrast mb-6">
                            Vamos Criar Algo <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">Incrível</span> Juntos
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Pronto para capturar seus momentos mais especiais? Entre em contato conosco e vamos transformar suas ideias em memórias inesquecíveis.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl transform rotate-1"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl transform -rotate-1"></div>

                        <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                            <div className="p-8 md:p-12">
                                <div className="max-w-2xl mx-auto text-center py-12 bg-red-50 rounded-lg">
                                    <div className="text-red-500 text-4xl mb-4">⚠️</div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold text-red-700">
                                            Erro ao carregar formulário
                                        </h3>
                                        <p className="text-red-600">
                                            Não foi possível carregar o formulário solicitado.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (formId) executeFormFetch(() => getFormBySlug(formId) as Promise<FormConfig>);
                                            if (serviceId) executeServiceFetch(() => getServiceById(serviceId));
                                        }}
                                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                                    >
                                        Tentar novamente
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const sortedFields = [...formConfig.formConfig.fields].sort(
        (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
    );

    return (
        <section className={`relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 overflow-hidden ${className}`} id="contato">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-contrast mb-6">
                        Vamos Criar Algo <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">Incrível</span> Juntos
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Pronto para capturar seus momentos mais especiais? Entre em contato conosco e vamos transformar suas ideias em memórias inesquecíveis.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl transform rotate-1"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl transform -rotate-1"></div>

                    <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                        <div className="p-8 md:p-12">
                            <div className="max-w-2xl mx-auto space-y-6">
                                {(showTitle || showDescription) && (
                                    <div className="text-center space-y-4 mb-8">
                                        {showTitle && (
                                            <h3 className="text-2xl md:text-3xl font-bold text-contrast">
                                                {serviceData?.serviceExtended?.title
                                                    ? `${formConfig.formConfig.title}`
                                                    : formConfig.formConfig.title
                                                }
                                            </h3>
                                        )}
                                        {showDescription && (
                                            <div className="space-y-2">
                                                {formConfig.formConfig.description && (
                                                    <p className="text-gray-600">
                                                        {formConfig.formConfig.description}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <Form className="space-y-6" action="https://formsubmit.co/ajax/dricacristina2@yahoo.com.br" method="POST">
                                    {/* Hidden formsubmit.co configuration fields */}
                                    <input type="hidden" name="_subject" value={getEmailSubject()} />
                                    <input type="hidden" name="_captcha" value="false" />
                                    {serviceData && (
                                        <input type="hidden" name="servico_solicitado" value={serviceData.serviceExtended.title} />
                                    )}

                                    <Form.Feedback
                                        className="mb-6"
                                        successMessage="Formulário enviado com sucesso! Entraremos em contato em breve."
                                        errorMessage="Erro ao enviar formulário. Tente novamente."
                                    />

                                    <div className="space-y-6">
                                        {sortedFields.map((field, index) => {
                                            const fieldWidthClass = getFieldWidthClass(field.width);
                                            const validation = getFieldValidation(field);

                                            if (field.fieldType === 'textarea') {
                                                return (
                                                    <div key={field.fieldName} className={fieldWidthClass}>
                                                        <Form.Textarea
                                                            name={field.fieldName}
                                                            label={field.label}
                                                            placeholder={field.placeholder}
                                                            required={field.isRequired}
                                                            validation={validation}
                                                            rows={4}
                                                        />
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div key={field.fieldName} className={fieldWidthClass}>
                                                    <Form.Input
                                                        name={field.fieldName}
                                                        label={field.label}
                                                        type={getFieldType(field.fieldType)}
                                                        placeholder={field.placeholder}
                                                        required={field.isRequired}
                                                        validation={validation}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="pt-4">
                                        <Form.Submit className="w-full md:w-auto">
                                            {formConfig.formConfig.submitSettings?.buttonText || 'Enviar'}
                                        </Form.Submit>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

                {showContactInfo && (
                    <div className="grid md:grid-cols-3 gap-6 mt-16">
                        <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                            </div>
                            <h3 className="font-semibold text-contrast mb-2">Telefone</h3>
                            <p className="text-gray-600">{contactInfo.phone}</p>
                        </div>

                        <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <h3 className="font-semibold text-contrast mb-2">Email</h3>
                            <p className="text-gray-600">{contactInfo.email}</p>
                        </div>

                        <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="font-semibold text-contrast mb-2">Horário</h3>
                            <p className="text-gray-600">{contactInfo.hours}</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ServiceFormWrapper;
