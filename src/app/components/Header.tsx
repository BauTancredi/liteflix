"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { useDrawerStore, useAddMovieDrawerStore } from "../store";

const Header = () => {
  const toggleDrawer = useDrawerStore((state) => state.toggle);
  const openDrawer = useDrawerStore((state) => state.open);
  const toggleAddMovieDrawer = useAddMovieDrawerStore((state) => state.toggle);
  const openAddMovieDrawer = useAddMovieDrawerStore((state) => state.open);

  const handleClick = () => {
    if (openAddMovieDrawer) toggleAddMovieDrawer();
    toggleDrawer();
  };

  return (
    <>
      <motion.header
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 z-20 flex w-full justify-between bg-transparent p-6 xl:hidden"
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          alt="hamburger icon"
          className="cursor-pointer"
          height={40}
          src={openDrawer ? "/assets/close.svg" : "/assets/hamburger-icon.svg"}
          width={40}
          onClick={handleClick}
        />
        <h1 className="text-3xl font-thin tracking-widest text-[#64EEBC]">
          <span className="font-bold">LITE</span>
          FLIX
        </h1>
        <Image
          alt="search icon"
          height={40}
          src="/assets/user-icon.svg"
          width={40}
        />
      </motion.header>
      <header className="absolute z-20 hidden w-screen justify-between px-16 pt-8 xl:flex">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-16"
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-3xl font-thin tracking-widest text-[#64EEBC]">
            <span className="font-bold">LITE</span>
            FLIX
          </h1>
          <button
            className="flex items-center gap-4"
            onClick={toggleAddMovieDrawer}
          >
            <Image
              alt="play icon"
              className=""
              height={25}
              src="/assets/plus.svg"
              width={25}
            />
            <p className="cursor-pointer text-xl uppercase tracking-widest hover:text-[#64EEBC]">
              Agregar pelicula
            </p>
          </button>
        </motion.div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-16"
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            alt="hamburger icon"
            className="cursor-pointer"
            height={40}
            src={
              openDrawer ? "/assets/close.svg" : "/assets/hamburger-icon.svg"
            }
            width={40}
            onClick={handleClick}
          />
          <Image
            alt="search icon"
            height={40}
            src="/assets/bell.svg"
            width={40}
          />
          <Image
            alt="search icon"
            height={40}
            src="/assets/user-icon.svg"
            width={40}
          />
        </motion.div>
      </header>
    </>
  );
};

export default Header;
