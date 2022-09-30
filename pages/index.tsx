import type { NextPage, GetStaticProps } from "next";
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

export interface Data {
  name: string;
  logo: string;
  albums: Album[];
  artists: Artist[];
}

export interface Event {
  name: string;
  slug: {
    current: string;
  };
  image: object;
  overview: string;
  detail: string;
  endDate: string;
}

interface DataProps {
  data: Data[];
  events: Event[];
}

const Home: NextPage<DataProps> = ({ data, events }) => {
  return (
    <div>
      <Head>
        <title>Home | SSJYP</title>
        <meta
          name="description"
          content="Active events and bonus rewards in Superstar JYPNation."
        />
      </Head>

      <div className="container p-4 mx-auto lg:max-w-[960px]">
        <Hero data={events} />
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
      slug
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

  const events: Event[] = await client.fetch(
    "*[_type=='event']{name, slug, image, overview, detail, endDate}"
  );

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
      events,
    },
    revalidate: 1800,
  };
};
