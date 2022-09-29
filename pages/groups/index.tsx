import { NextPage, GetStaticProps } from "next";
import React from "react";
import client from "../../sanity";
import GroupItem from "../../components/groups/GroupItem";

interface Artist {
  name: string;
  avatar: object;
  slug: {
    current: string;
  };
}

export interface Data {
  name: string;
  logo: object;
  info: string;
  members: number;
  debut: string;
  artists: Artist[];
  albums: object[];
}

interface Props {
  data: Data[];
}

const GroupsPage: NextPage<Props> = ({ data }) => {
  return (
    <div className="container mx-auto p-4 min-h-[80vh] md:py-16">
      {data.map((item) => {
        return <GroupItem key={item.name} data={item} />;
      })}
    </div>
  );
};

export default GroupsPage;

export const getStaticProps: GetStaticProps = async () => {
  const data: Data[] | null =
    await client.fetch(`*[_type=='group'] | order(debut) {
      name,
      logo,
      info,
      members,
      debut,
    'albums': *[_type=='album' && group._ref==^._id]{},
      'artists': *[
        _type=='artist'
        &&
        group._ref==^._id
      ] | order(birthdate) {
        name,
        avatar,
        slug
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
