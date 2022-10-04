import React from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import client from "../../sanity";
import Album from "../../components/album/Album";
import Head from "next/head";

interface Album {
  title: string;
  songs: string[];
  coverImage: object;
  releastDate: string;
}

interface Props {
  data: Album;
}

const AlbumPage: NextPage<Props> = ({ data }) => {
  return (
    <div className="container grid mx-auto p-4 min-h-[80vh] md:py-12 lg:max-w-[960px]">
      <Head>
        <title>{data.title} | SSJYP</title>
        <meta
          name="description"
          content="Active events and bonus rewards in Superstar JYPNation."
        />
      </Head>
      <Album data={data} />
    </div>
  );
};

export default AlbumPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const data: { slug: { current: string } }[] = await client.fetch(
    "*[_type=='album']{slug}"
  );

  return {
    fallback: false,
    paths: data.map((d) => ({ params: { slug: d.slug.current } })),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const data: Album[] | null = await client.fetch(
    `*[_type=='album' && slug.current=='${context.params?.slug}']{ title, songs, coverImage, releastDate }`
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
