import imageUrlBuilder from "@sanity/image-url";

export const clientConfig = {
    projectId: process.env.VITE_PROJECT_ID || "",
    dataset: process.env.VITE_DATASET || "production",
    title: "Adriana Oliveira Fotografias",
    apiVersion: "2025-07-01", // use current UTC date - see "specifying API version"!
    useCdn: true, // `false` if you want to ensure fresh data
}

const builder = imageUrlBuilder(clientConfig)
