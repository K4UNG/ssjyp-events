import type { NextPage, InferGetStaticPropsType, GetStaticProps } from "next";
import Head from "next/head";
import Hero from "../components/home/Hero";
import Bonus from "../components/home/Bonus";
import client from "../sanity";

interface Album {
  title: string;
  releastDate: string;
  releaseMonth: number;
  coverImage: object;
  slug: {
    current: string;
  };
}

interface Artist {
  name: string;
  birthdate: string;
}

interface Data {
  name: string;
  logo: string;
  albums: Album[];
  artists: Artist[];
}

export interface DataProps {
  data: Data[];
}

const Home: NextPage<DataProps> = ({ data }) => {
  return (
    <div>
      <Head>
        <title>SSJYP Events</title>
        <meta
          name="description"
          content="Active events and bonuses in Superstart JYPNation game."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container p-4 mx-auto lg:max-w-[960px]">
        <Hero />
        <Bonus data={data} />
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const data: Data[] | null =
    await client.fetch(`*[_type=='group'] | order(debut) {
      name,
      logo,
      'albums': *[
        _type=='album'
        &&
        group._ref==^._id
                ] | order(releastDate desc) {
      title,
      releastDate,
      coverImage,
      slug,
      releaseMonth
    },
      'artists': *[
        _type=='artist'
        &&
        group._ref==^._id
      ] | order(birthdate) {
        name,
        birthdate
      }
  }`);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
    revalidate: 1800,
  };
};
