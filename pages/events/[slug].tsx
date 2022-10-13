import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import React from "react";
import Event from "../../components/event/Event";
import client from "../../sanity";
import Head from "next/head";

export interface Event {
  name: string;
  endDate: string;
  detail: string;
  image: object;
  overview: string;
}

const EventPage: NextPage<{ data: Event[] }> = ({ data }) => {
  return (
    <div className="min-h-[80vh] container mx-auto lg:max-w-[960px] p-4 md:py-8">
      <Head>
        <title>{data[0].name} | SSJYP</title>
        <meta
          name="description"
          content="Active events and bonus rewards in Superstar JYPNation."
        />
      </Head>
      <Event data={data[0]} />
    </div>
  );
};

export default EventPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const data: { slug: { current: string } }[] = await client.fetch(
    "*[_type=='event']{slug}"
  );

  return {
    fallback: "blocking",
    paths: data.map((d) => ({
      params: {
        slug: d.slug.current,
      },
    })),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const data: Event[] | null = await client.fetch(
    `*[_type=='event' && slug.current=='${
      context.params!.slug
    }']{ name, endDate, detail, image, overview }`
  );

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
