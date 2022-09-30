import React from "react";
import { Event } from "../../pages/events/[slug]";
import BackBtn from "../ui/BackBtn";
import Image from "next/image";
import { urlFor } from "../../sanity";

interface Props {
  data: Event;
}

function Event({ data }: Props) {
  return (
    <div className="text-center font-caudex">
      <BackBtn />
      <div className="relative aspect-[2/1] md:aspect-[3/1] mb-4 border-[2px] border-black">
        <Image
          src={urlFor(data.image).url()}
          alt={data.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="font-dm text-sm">
        <span className="font-bold mb-4">Available until: </span>
        {data.endDate}
      </div>
      <h1 className="font-bold text-3xl md:text-4xl mt-2 mb-6">{data.name}</h1>
      <p className="text-lg my-4">{data.overview}</p>
      {data.detail && <p className="md:text-lg my-4">{data.detail}</p>}
    </div>
  );
}

export default Event;
