import React from "react";
import { Data } from "../../pages/artists";
import Image from "next/image";
import { urlFor } from "../../sanity";
import Members from "./Members";

function GroupItem({ data }: { data: Data }) {
  return (
    <div className="container mx-auto mb-16 lg:max-w-[960px]">
      <div className="grid grid-cols-3 md:grid-cols-[140px_auto]">
        <div className="relative w-24 aspect-square">
          <Image
            src={urlFor(data.logo).url()}
            alt={data.name}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="col-span-2 md:col-span-1 md:grid md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h2 className="font-bold text-2xl">{data.name}</h2>
            <div className="md:text-lg">
              <div>
                <span className="font-bold">Debut date: </span>
                {data.debut}
              </div>
              <div>
                <span className="font-bold">Members: </span>
                {data.members}
              </div>
              <div>
                <span className="font-bold">Albums: </span>
                {data.albums.length}
              </div>
            </div>
          </div>
          <p className="hidden md:block md:col-span-2 lg:col-span-3 md:text-lg">
            {data.info}
          </p>
        </div>
      </div>
      <p className="mt-4 md:hidden">{data.info}</p>
      <Members members={data.artists} />
    </div>
  );
}

export default GroupItem;
