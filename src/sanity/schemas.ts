export const Heroes = {
    title: 'Banners',
    name: 'Banners',
    type: 'document',
    fields: [
        {
            title: 'Banner',
            name: 'hero',
            type: 'object',
            fields: [
                {
                    title: 'Título do Banner',
                    name: 'title',
                    type: 'string'
                },
                {
                    title: 'Descrição do Banner',
                    name: 'description',
                    type: 'string'
                },
                {
                    title: 'Imagem de Fundo do Banner',
                    name: 'image',
                    type: 'image'
                },
                {
                    title: 'Texto do Botão do Banner',
                    name: 'buttonText',
                    type: 'string'
                },
                {
                    title: 'Link do Botão do Banner',
                    name: 'buttonLink',
                    type: 'string'
                }
            ]
        }
    ]
}

export const ServicesCard = {
    title: 'Serviços (Resumo)',
    name: 'Services',
    type: 'document',
    fields: [
        {
            title: 'Serviço',
            name: 'service',
            type: 'object',
            fields: [
                {
                    title: 'Título do Serviço',
                    name: 'title',
                    type: 'string'
                },
                {
                    title: 'Descrição (curta) do Serviço',
                    name: 'description',
                    type: 'text'
                },
                {
                    title: 'Imagem do Serviço',
                    name: 'image',
                    type: 'image'
                }
            ]
        }
    ]
}

export const ServicesExtended = {
    title: 'Serviços Detalhados',
    name: 'ServicesExtended',
    type: 'document',
    fields: [
        {
            title: 'Serviço Detalhado',
            name: 'serviceExtended',
            type: 'object',
            fields: [
                {
                    title: 'Título do Serviço',
                    name: 'title',
                    type: 'string'
                },
                {
                    title: 'Descrição do Serviço Detalhado',
                    name: 'description',
                    type: 'text'
                },
                {
                    title: 'Imagem do Serviço Detalhado',
                    name: 'image',
                    type: 'image'
                },
                {
                    title: 'Galeria de Imagens',
                    name: 'gallery',
                    type: 'array',
                    of: [{ type: 'image' }]
                },
                {
                    title: 'Preço do Serviço',
                    name: 'price',
                    type: 'number'
                },
                {
                    title: 'Testemunhos',
                    name: 'testimonials',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    title: 'Nome do Cliente',
                                    name: 'name',
                                    type: 'string'
                                },
                                {
                                    title: 'Comentário do Cliente',
                                    name: 'comment',
                                    type: 'text'
                                },
                                {
                                    title: 'Imagem do Cliente',
                                    name: 'clientImage',
                                    type: 'image'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export const Testimonials = {
    title: 'Depoimentos',
    name: 'Testimonials',
    type: 'document',
    fields: [
        {
            title: 'Depoimento',
            name: 'testimonial',
            type: 'object',
            fields: [
                {
                    title: 'Nome do Cliente',
                    name: 'clientName',
                    type: 'string'
                },
                {
                    title: 'Comentário do Cliente',
                    name: 'comment',
                    type: 'text'
                },
                {
                    title: 'Imagem do Cliente',
                    name: 'clientImage',
                    type: 'image'
                }
            ]
        }
    ]
}

export const Contact = {
    title: 'Contato',
    name: 'Contact',
    type: 'document',
    fields: [
        {
            title: 'Informações de Contato',
            name: 'contactInfo',
            type: 'object',
            fields: [
                {
                    title: 'Endereço de E-mail',
                    name: 'email',
                    type: 'string'
                },
                {
                    title: 'Número de Telefone',
                    name: 'phone',
                    type: 'string'
                },
                {
                    title: 'Endereço Físico',
                    name: 'address',
                    type: 'string'
                }
            ]
        }
    ]
}

export const About = {
    title: 'Sobre',
    name: 'About',
    type: 'document',
    fields: [
        {
            title: 'Informações Biográficas',
            name: 'aboutInfo',
            type: 'object',
            fields: [
                {
                    title: 'História',
                    name: 'history',
                    type: 'text'
                },
                {
                    title: 'Missão',
                    name: 'mission',
                    type: 'text'
                },
                {
                    title: 'Visão',
                    name: 'vision',
                    type: 'text'
                },
                {
                    title: 'Valores',
                    name: 'values',
                    type: 'array',
                    of: [{ type: 'string' }]
                },
                {
                    title: 'Imagem de Perfil',
                    name: 'profileImage',
                    type: 'image'
                },
            ]
        }
    ]
}

export const Gallery = {
    title: 'Galeria',
    name: 'Gallery',
    type: 'document',
    fields: [
        {
            title: 'Imagens da Galeria (Geral)',
            name: 'galleryImages',
            type: 'array',
            of: [{ type: 'image' }]
        }
    ]
}

export default [
    Heroes,
    ServicesCard,
    ServicesExtended,
    Testimonials,
    Contact,
    About,
    Gallery
] as const;