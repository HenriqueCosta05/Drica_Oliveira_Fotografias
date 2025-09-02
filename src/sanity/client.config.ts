import imageUrlBuilder from "@sanity/image-url";

export const clientConfig = {
    projectId: "luh7pu5f",
    dataset: "production",
    title: "Adriana Oliveira Fotografias",
    apiVersion: "2025-07-01", 
    useCdn: true,
}

const builder = imageUrlBuilder(clientConfig);

export { builder };