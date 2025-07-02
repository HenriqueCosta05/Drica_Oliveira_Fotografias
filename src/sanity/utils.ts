import { createClient } from "@sanity/client"
import groq from "groq"
import { clientConfig } from "./client.config.ts"
import type { AboutInfo, ContactInfo, GalleryImages, Hero, Service, ServiceExtended, Testimonial } from "./types.ts"

export const getHeroes = async (): Promise<Hero[]> => {
    return createClient(clientConfig).fetch(
        groq`*[_type == "Banners"] | order(_createdAt desc) {
            _id,
            _createdAt,
            hero {
                title,
                description,
                "image": image.asset->url + "?w=600&h=600&fit=crop&crop=center&q=100&fm=webp",
                "imageMobile": image.asset->url + "?w=1080&h=1920&fit=crop&crop=center&q=85&fm=webp",
                buttonText,
                buttonLink
            }
        }`
    )
}

export const getServices = async (): Promise<Service[]> => {
    return createClient(clientConfig).fetch(
        groq`*[_type == "Services"] | order(_createdAt desc) {
            _id,
            _createdAt,
            service {
                title,
                description,
                "image": image.asset->url
            }
        }`
    )
}

export const getDetailedServices = async (): Promise<ServiceExtended[]> => {
    return createClient(clientConfig).fetch(
        groq`*[_type == "ServicesExtended"] | order(_createdAt desc) {
            _id,
            _createdAt,
            serviceExtended {
                title,
                description,
                "image": image.asset->url,
                "gallery": gallery[].asset->url,
                price,
                testimonials[] {
                    name,
                    comment,
                    "clientImage": clientImage.asset->url
                }
            }
        }`
    )
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
    return createClient(clientConfig).fetch(
        groq`*[_type == "Testimonials"] | order(_createdAt desc) {
            _id,
            _createdAt,
            testimonial {
                clientName,
                comment,
                "clientImage": clientImage.asset->url
            }
        }`
    )
}

export const getContactInfo = async (): Promise<ContactInfo[]> => {
    return createClient(clientConfig).fetch(
        groq`*[_type == "Contact"] | order(_createdAt desc) {
            _id,
            _createdAt,
            contactInfo {
                email,
                phone,
                address
            }
        }`
    )
}

export const getAboutInfo = async (): Promise<AboutInfo[]> => {
    return createClient(clientConfig).fetch(
        groq`*[_type == "About"] | order(_createdAt desc) {
            _id,
            _createdAt,
            aboutInfo {
                history,
                mission,
                vision,
                values,
                "profileImage": profileImage.asset->url
            }
        }`
    )
}

export const getGalleryImages = async (): Promise<GalleryImages[]> => {
    return createClient(clientConfig).fetch(
        groq`*[_type == "Gallery"] | order(_createdAt desc) {
            _id,
            _createdAt,
            "galleryImages": galleryImages[].asset->url
        }`
    )
}
