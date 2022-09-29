import React, { useState, useRef, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { Event } from "../../pages";
import { urlFor } from "../../sanity";

function Hero({ data }: { data: Event[] }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [slide, setSlide] = useState(0);
  const slider = useRef<Slider>(null);

  const current = data[slide];

  useEffect(() => {
    slider.current?.slickGoTo(slide);
  }, [slide]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => {
        if (prev === data.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, []);

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
    <div className="overflow-x-hidden lg:my-8">
      <h1 className="font-caudex font-bold text-2xl mb-4 lg:text-2.5xl">
        Active Events
      </h1>

      <div className="border-[2px] border-black bg-white lg:grid lg:grid-cols-3">
        <Slider
          {...settings}
          ref={slider}
          onSwipe={swipeHandler}
          className="lg:col-span-2 h-60 lg:h-auto lg:min-h-60"
        >
          {data.map((item) => {
            return (
              <div className="relative w-full h-full" key={item.slug.current}>
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
            );
          })}
        </Slider>
        <div className="border-t-[2px] border-black p-4 text-center pt-2 lg:border-t-0 lg:border-l-[2px] lg:text-left lg:p-6">
          <div className="lg:mb-2 lg:flex lg:justify-between">
            <div className="space-x-2">
              {Array.from(Array(data.length).keys()).map((n) => (
                <button
                  key={n}
                  className={`h-2 bg-black rounded-full duration-250 transition-[background-color_width] lg:hover:bg-accent ${
                    slide === n ? "w-14 bg-accent" : "w-2"
                  }`}
                  onClick={() => {
                    setSlide(n);
                    slider.current?.slickGoTo(n);
                  }}
                />
              ))}
            </div>
            <div className="hidden lg:flex space-x-2">
              <button
                className="w-6 h-6 border border-black font-bold text-2xl [0] grid place-items-center hover:bg-black hover:text-white duration-150 transition-colors"
                onClick={prevSlide}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 p-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                className="w-6 h-6 border border-black font-bold text-2xl [0] grid place-items-center hover:bg-black hover:text-white duration-150 transition-colors"
                onClick={nextSlide}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 p-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <h2 className="text-2xl font-bold">{current.name}</h2>
          <p className="text-base leading-5 mb-6 mt-2">{current.overview}</p>
          <Link href={"/events/" + current.slug.current}>
            <a className="border-[2px] border-black uppercase font-bold py-1 px-6 transition-colors duration-150 hover:bg-black hover:text-white flex w-fit mx-auto items-center lg:mx-0">
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
