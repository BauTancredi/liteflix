"use client";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Movie } from "../types";

interface FeaturedMovieProps {
  featuredMovie: Movie;
}

const FeaturedMovie = ({ featuredMovie }: FeaturedMovieProps) => {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      let imageToUse = "";

      if (screenWidth <= 1024) {
        imageToUse = `url(https://image.tmdb.org/t/p/original${featuredMovie.poster_path})`;
      } else {
        imageToUse = `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`;
      }

      // Update the backgroundImage state
      setBackgroundImage(imageToUse);
    }

    // Initial screen size check
    handleResize();

    // Add event listener to handle screen size changes
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [featuredMovie]);

  return (
    <>
      <section
        className={`flex h-screen w-full flex-col justify-end bg-gradient-to-t from-[#242424] xl:h-screen xl:w-screen xl:pb-32 xl:pl-16 xl:pt-16`}
        style={{
          backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <motion.p
          animate={{ opacity: 1, x: 0 }}
          className="text-center text-xl font-thin tracking-widest xl:text-left"
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          ORIGINAL DE <span className="font-bold">LITEFLIX</span>
        </motion.p>
        <motion.p
          animate={{ opacity: 1, x: 0 }}
          className="mb-20 mt-5 text-center  text-8xl tracking-widest text-[#64EEBC] xl:text-left xl:text-9xl"
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {featuredMovie.title}
        </motion.p>
        <motion.div
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-6 xl:flex-row"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button className="flex   w-3/4 items-center justify-center gap-5 bg-[#242424] py-4  xl:w-96">
            <Image
              alt="play icon"
              height={30}
              src="/assets/play.svg"
              width={30}
            />
            <p className="text-2xl font-light tracking-widest">REPRODUCIR</p>
          </button>
          <button className="flex w-3/4 items-center justify-center gap-5 border  border-gray-400 bg-[#242424] py-4 text-2xl tracking-widest xl:w-96">
            <Image
              alt="play icon"
              height={30}
              src="/assets/plus.svg"
              width={30}
            />
            <p className="text-2xl font-light tracking-widest text-white">
              MI LISTA
            </p>
          </button>
        </motion.div>
      </section>
    </>
  );
};

export default FeaturedMovie;
