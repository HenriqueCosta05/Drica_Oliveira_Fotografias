export type Hero = {
    _id: string;
    _createdAt: string;
    hero: {
        classNames: any;
        title: string;
        description: string;
        image: string;
        buttonText: string;
        buttonLink: string;
    }
}

export type Service = {
    _id: string;
    _createdAt: string;
    service: {
        title: string;
        description: string;
        image: string;
        serviceId: string;
    }
}

export type ServiceExtended = {
    _id: string;
    _createdAt: string;
    serviceExtended: {
        title: string;
        description: string;
        image: string;
        gallery: string[];
        price: number;
        testimonials: {
            name: string;
            comment: string;
            clientImage: string;
        }[];
    }
}

export type Testimonial = {
    _id: string;
    _createdAt: string;
    testimonial: {
        clientName: string;
        comment: string;
        clientImage: string;
    }
}

export type ContactInfo = {
    _id: string;
    _createdAt: string;
    contactInfo: {
        email: string;
        phone: string;
        address: string;
    }
}

export type AboutInfo = {
    _id: string;
    _createdAt: string;
    aboutInfo: {
        history: string;
        mission: string;
        vision: string;
        values: string;
        profileImage: string;
    }
}

export type GalleryImages = {
    _id: string;
    _createdAt: string;
    galleryImages: {
        asset: {
            _ref: string;
            _type: string;
        };
    }[]
}

export type PricingPlan = {
    _id: string;
    _createdAt: string;
    pricingPlan: {
        title: string;
        shortDescription: string;
        price: number;
        priceType: 'fixed' | 'starting_from' | 'per_hour' | 'consultation';
        image?: string;
        featuresIncluded: {
            feature: string;
            isHighlight: boolean;
        }[];
        category: 'wedding' | 'couples' | 'family' | 'children' | 'maternity' | 'corporate' | 'events' | 'portraits' | 'other';
        duration?: string;
        deliveryTime?: string;
        specialNotes?: string;
        isPopular: boolean;
        displayOrder?: number;
    }
}

export type FormField = {
    fieldType: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'file' | 'number';
    fieldName: string;
    label: string;
    placeholder?: string;
    isRequired: boolean;
    options?: {
        value: string;
        label: string;
    }[];
    validation?: {
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
        errorMessage?: string;
    };
    displayOrder?: number;
    width: 'full' | 'half' | 'third' | 'two-thirds';
}

export type FormConfig = {
    _id: string;
    _createdAt: string;
    formConfig: {
        title: string;
        description?: string;
        slug: {
            current: string;
        };
        isActive: boolean;
        isPrimary: boolean;
        fields: FormField[];
        submitSettings: {
            buttonText: string;
            successMessage: string;
            recipientEmail: string;
            emailSubject: string;
        };
        styling?: {
            primaryColor?: string;
            formStyle: 'modern' | 'classic' | 'minimal' | 'elegant';
            backgroundImage?: string;
        };
    }
}
