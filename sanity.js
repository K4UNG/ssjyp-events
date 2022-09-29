import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

const config = {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-09-29",
  useCdn: true,
};

const client = createClient(config);

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export default client;
