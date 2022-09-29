import React from "react";
import { Artist } from "../../pages/artist/[slug]";
import Image from "next/image";
import { urlFor } from "../../sanity";
import Link from "next/link";
import BackBtn from "../ui/BackBtn";
import { getAge } from "../../util/util";

function Artist({ data }: { data: Artist }) {
  return (
    <div className="sm:grid content-center">
      <BackBtn />
      <div className="sm:grid sm:grid-cols-[1fr_1.3fr] sm:items-center sm:space-x-8">
        <div className="relative aspect-[4/5] border-[2px] border-black">
          <Image
            src={urlFor(data.image).url()}
            layout="fill"
            objectFit="cover"
            alt={data.name}
          />
        </div>
        <div className="mt-4 mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">
            <span className="font-bold uppercase">{data.name}</span> (
            {data.koreanName})
          </h1>
          <div className="md:text-lg space-y-1 lg:space-y-2">
            <div>
              <span className="font-bold text-lg md:text-xl">Birthdate: </span>
              {data.birthdate} ({getAge(data.birthdate)} years)
            </div>
            <div>
              <span className="font-bold text-lg md:text-xl">
                Nationality:{" "}
              </span>
              {data.nationality}
            </div>
            <p>
              <span className="font-bold text-lg md:text-xl">Fun Fact: </span>
              <br />
              {data.funfact}
            </p>
            <div className="font-bold text-lg md:text-xl">Members:</div>
            <div className="flex flex-wrap">
              {data.group.members.map((m) => {
                if (m.name === data.name || m.group.name !== data.group.name)
                  return;
                return (
                  <span key={m.slug.current}>
                    <Link href={"/artist/" + m.slug.current}>
                      <a className="mr-4 uppercase italic hover:font-bold font-dm text-base">
                        {m.name}
                      </a>
                    </Link>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artist;
