export type Hero = {
    _id: string;
    _createdAt: string;
    hero: {
        title: string;
        description: string;
        image: {
            asset: {
                _ref: string;
                _type: string;
            };
        };
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
        image: {
            asset: {
                _ref: string;
                _type: string;
            };
        };
    }
}

export type ServiceExtended = {
    _id: string;
    _createdAt: string;
    serviceExtended: {
        title: string;
        description: string;
        image: {
            asset: {
                _ref: string;
                _type: string;
            };
        };
        gallery: {
            images: {
                asset: {
                    _ref: string;
                    _type: string;
                };
            }[];
            price: string;
            testimonials: {
                name: string;
                comment: string;
                image: {
                    asset: {
                        _ref: string;
                        _type: string;
                    };
                };
            }[];
        }
    }
}

export type Testimonial = {
    _id: string;
    _createdAt: string;
    testimonial: {
        name: string;
        comment: string;
        image: {
            asset: {
                _ref: string;
                _type: string;
            };
        };
    }
}
