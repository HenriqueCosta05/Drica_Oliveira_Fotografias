import { createClient } from "@sanity/client"
import groq from "groq"
import { clientConfig } from "./client.config.ts"
import { Heroes, ServicesCard, ServicesExtended, Testimonials } from "./schemas.ts"

export const getHeroes = async (): Promise<Heroes[]> => {
    return createClient(clientConfig).fetch(
        groq`*[_type == "hero"] | order(_createdAt desc) {
            _id,
            title,
            description,
            "image": image.asset->url,
            buttonText,
            buttonLink
            }
            `
    )
}

export const getServices = async (): Promise<ServicesCard[]> => {
    return createClient(clientConfig).fetch(
        groq`*[_type == "Services"] | order(_createdAt desc) {
            _id,
            service {
                title,
                description,
                "image": image.asset->url
            }
        }`
    )
}

export const getDetailedServices = async (): Promise<ServicesExtended[]> => {
    return createClient(clientConfig).fetch(
        groq`*[_type == "ServicesExtended"] | order(_createdAt desc) {
            _id,
            service {
                title,
                description,
                gallery,
                price,
                testimonials,
            }
        }`
    )
}

export const getTestimonials = async (): Promise<Testimonials[]> => {
    return createClient(clientConfig).fetch(
        groq`*[_type == "Testimonials"] | order(_createdAt desc) {
            _id,
            name,
            comment,
            "image": image.asset->url
        }`
    )
}