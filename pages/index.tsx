import type { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/home/Hero";

const Home: NextPage = () => {
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

      <div className="container p-4">
        <Hero />
      </div>
    </div>
  );
};

export default Home;
