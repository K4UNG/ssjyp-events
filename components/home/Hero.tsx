import React, { useState, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

const data = [
  {
    name: "ITZY 'TING TING TING'",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis purus eget diam dictum, in tempus enim imperdiet. Fusce iaculis at leo vitae tincidunt",
    slug: "itzy-ting",
    image: "/event.webp",
  },
  {
    name: "ITZY not shy",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis purus eget diam dictum, in tempus enim imperdiet. Fusce iaculis",
    slug: "itzy-ting",
    image: "/event.webp",
  },
];

function Hero() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 150,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [slide, setSlide] = useState(0);
  const slider = useRef<Slider>(null);

  const current = data[slide];

  function swipeHandler(dir: string) {
    if (dir === "left" && slide !== data.length - 1) {
      setSlide((prev) => prev + 1);
    } else if (dir === "right" && slide !== 0) {
      setSlide((prev) => prev - 1);
    }
  }

  function nextSlide() {
    if (slide === data.length - 1) {
      setSlide(0);
      return;
    }
    slider.current?.slickNext();
    setSlide((prev) => prev + 1);
  }

  function prevSlide() {
    if (slide === 0) {
      setSlide(data.length - 1);
      return;
    }
    slider.current?.slickPrev();
    setSlide((prev) => prev - 1);
  }

  return (
    <div className="overflow-x-hidden">
      <h1 className="font-caudex font-bold text-2xl mb-4">Active Events</h1>

      <div className="border-[2px] border-black bg-white">
        <Slider {...settings} ref={slider} onSwipe={swipeHandler}>
          {data.map((item) => {
            return (
              <div className="relative w-full h-full" key={item.slug}>
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
            );
          })}
        </Slider>
        <div className="border-top-[2px] border-black p-4 text-center pt-2">
          <div>
            <div className="space-x-2">
              {Array.from(Array(data.length).keys()).map((n) => (
                <button
                  key={n}
                  className={`h-2 bg-black rounded-full duration-250 transition-[background-color_width] hover:bg-accent ${
                    slide === n ? "w-14 bg-accent" : "w-2"
                  }`}
                  onClick={() => {
                    setSlide(n);
                    slider.current?.slickGoTo(n);
                  }}
                />
              ))}
            </div>
          </div>
          <h2 className="text-2xl font-bold">{current.name}</h2>
          <p className="text-base leading-5 mb-6 mt-2">{current.overview}</p>
          <Link href={"/events/" + current.slug}>
            <a className="border-[2px] border-black uppercase font-bold py-1 px-6 transition-colors duration-150 hover:bg-black hover:text-white">
              Learn more
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
