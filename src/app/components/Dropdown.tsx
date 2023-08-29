"use client";
import { useState } from "react";

import Image from "next/image";

interface DropdownProps {
  selectedCategory: "popular" | "my-movies";
  selectCategory: (category: "popular" | "my-movies") => void;
}

const Dropdown = ({ selectedCategory, selectCategory }: DropdownProps) => {
  return (
    <div className="absolute -bottom-20 z-10 w-96 bg-[#242424] py-4 px-6">
      <div className="flex items-center mb-2 justify-between">
        <p
          className="text-2xl tracking-widest cursor-pointer"
          onClick={() => selectCategory("popular")}
        >
          Populares
        </p>
        {selectedCategory === "popular" && (
          <Image
            src="/checkmark.svg"
            width={20}
            height={20}
            alt="arrow down icon"
          />
        )}
      </div>
      <div className="flex items-center mb-2 justify-between">
        <p
          className="text-2xl tracking-widest cursor-pointer"
          onClick={() => selectCategory("my-movies")}
        >
          Mis peliculas
        </p>
        {selectedCategory === "my-movies" && (
          <Image
            src="/checkmark.svg"
            width={20}
            height={20}
            alt="arrow down icon"
          />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
