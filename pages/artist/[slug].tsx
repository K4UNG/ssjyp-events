import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import client from "../../sanity";
import Artist from "../../components/artist/Artist";
import Head from "next/head";

export interface Artist {
  name: string;
  koreanName: string;
  birthdate: string;
  funfact: string;
  image: object;
  nationality: string;
  group: {
    name: string;
    members: {
      name: string;
      slug: {
        current: string;
      };
      group: {
        name: string;
      };
    }[];
  };
}

const ArtistPage: NextPage<{ data: Artist }> = ({ data }) => {
  return (
    <div className="container grid mx-auto p-4 min-h-[80vh] md:py-12 lg:max-w-[960px]">
      <Head>
        <title>{data.name} | SSJYP</title>
        <meta
          name="description"
          content="Active events and bonus rewards in Superstar JYPNation."
        />
      </Head>
      <Artist data={data} />
    </div>
  );
};

export default ArtistPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const data: { slug: { current: string } }[] = await client.fetch(
    "*[_type=='artist']{slug}"
  );

  return {
    fallback: false,
    paths: data.map((d) => ({ params: { slug: d.slug.current } })),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const data: Artist[] | null = await client.fetch(
    `*[_type=='artist' && slug.current=='${context.params?.slug}']{ name, koreanName, nationality, birthdate, funfact, image, group->{name, 'members': *[_type=='artist'] | order(birthdate) {name, slug, group->{name}}} }`
  );

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data[0],
    },
    revalidate: 3600,
  };
};
