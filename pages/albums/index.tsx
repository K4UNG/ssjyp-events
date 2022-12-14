import React from "react";
import AlbumList from "../../components/album/AlbumList";
import { GetStaticProps, NextPage } from "next";
import client from "../../sanity";
import Head from "next/head";

export interface Data {
  name: string;
  logo: object;
  albums: {
    coverImage: object;
    title: string;
    slug: {
      current: string;
    };
  }[];
}

const AlbumsPage: NextPage<{ data: Data[] }> = ({ data }) => {
  return (
    <div className="container mx-auto p-4 space-y-8 min-h-[80vh] md:py-16 lg:max-w-[960px]">
      <Head>
        <title>Albums | SSJYP</title>
        <meta
          name="description"
          content="Active events and bonus rewards in Superstar JYPNation."
        />
      </Head>
      {data.map((item) => (
        <AlbumList key={item.name} data={item} />
      ))}
    </div>
  );
};

export default AlbumsPage;

export const getStaticProps: GetStaticProps = async () => {
  const data: Data[] | null =
    await client.fetch(`*[_type=='group'] | order(debut) {
      name,
      logo,
      info,
    'albums': *[_type=='album' && group._ref==^._id] | order(releastDate desc) {
        coverImage,
        title,
        slug
    },
  }`);

  if (!data) {
    return {
      notFound: true,
      revalidate: 1800,
    };
  }

  return {
    props: {
      data,
    },
    revalidate: 1800,
  };
};
