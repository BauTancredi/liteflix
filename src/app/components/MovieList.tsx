"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import { Category, Movie } from "../types";

import Dropdown from "./Dropdown";
import MovieCard from "./MovieCard";

interface MovieListProps {
  popularMovies: Movie[];
}

export default function MovieList({ popularMovies }: MovieListProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("popular");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (value: Category) => {
    setSelectedCategory(value);
    setIsDropdownOpen(false);
  };

  return (
    <section className="bg-[#242424] p-6 xl:absolute xl:right-0 xl:top-10 xl:bg-transparent xl:pr-16">
      <motion.div
        animate={{ opacity: 1 }}
        className="relative flex justify-center gap-3 "
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <h3 className="my-10 cursor-pointer text-center text-2xl font-thin tracking-widest xl:text-left xl:text-xl">
          VER: &nbsp;
          <span className="font-bold ">
            {selectedCategory === "popular" ? "POPULARES" : "MIS PELICULAS"}
          </span>
        </h3>
        <Image
          alt="arrow down icon"
          className={`cursor-pointer ${
            isDropdownOpen ? "rotate-180" : ""
          } transition-transform`}
          height={20}
          src="/assets/arrow.svg"
          width={20}
        />
        {isDropdownOpen && (
          <Dropdown
            selectCategory={handleSelect}
            selectedCategory={selectedCategory}
          />
        )}
      </motion.div>
      <motion.ul className="flex flex-col gap-5" transition={{ delay: 1 }}>
        {selectedCategory === "popular" &&
          popularMovies.map((movie, index) => (
            <motion.li
              key={movie.id}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 2, delay: index * 0.1 }}
            >
              <MovieCard movie={movie} />
            </motion.li>
          ))}
      </motion.ul>
    </section>
  );
}
