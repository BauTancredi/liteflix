"use client";
import Image from "next/image";

import { Category } from "../types";

interface DropdownProps {
  selectedCategory: Category;
  selectCategory: (category: Category) => void;
}

const Dropdown = ({ selectedCategory, selectCategory }: DropdownProps) => {
  return (
    <div className="absolute -bottom-20 z-10 w-96 bg-[#242424] px-6 py-4">
      <div className="mb-2 flex items-center justify-between">
        <p
          className={`cursor-pointer text-2xl tracking-widest ${
            selectedCategory === "popular" ? "" : "font-thin"
          }`}
          onClick={() => selectCategory("popular")}
        >
          Populares
        </p>
        {selectedCategory === "popular" && (
          <Image
            alt="arrow down icon"
            height={20}
            src="/checkmark.svg"
            width={20}
          />
        )}
      </div>
      <div className="mb-2 flex items-center justify-between">
        <p
          className={`cursor-pointer text-2xl tracking-widest ${
            selectedCategory === "my-movies" ? "" : "font-thin"
          }`}
          onClick={() => selectCategory("my-movies")}
        >
          Mis peliculas
        </p>
        {selectedCategory === "my-movies" && (
          <Image
            alt="arrow down icon"
            height={20}
            src="/checkmark.svg"
            width={20}
          />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
