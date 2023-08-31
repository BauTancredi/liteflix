"use client";
import React from "react";
import Image from "next/image";

import { useDrawerStore, useAddMovieDrawerStore } from "../store";
import { OPTIONS } from "../constants";

import Header from "./Header";

const Drawer = () => {
  const openDrawer = useDrawerStore((state) => state.open);
  const toggleDrawer = useAddMovieDrawerStore((state) => state.toggle);

  // disable scroll when drawer is open
  React.useEffect(() => {
    if (openDrawer) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [openDrawer]);

  return (
    openDrawer && (
      <>
        <div className="absolute top-0 h-screen w-full overflow-hidden bg-[#242424]">
          <Header />
          <div className="mt-10 px-6 lg:px-16">
            <ul className="flex flex-col gap-8">
              {OPTIONS.map((option) => (
                <li
                  key={option}
                  className="cursor-pointer text-xl font-thin tracking-widest hover:text-[#64EEBC]"
                >
                  {option}
                </li>
              ))}
            </ul>

            <button
              className="my-28 flex items-center gap-4"
              onClick={toggleDrawer}
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

            <button className="cursor-pointer text-xl font-thin uppercase tracking-widest hover:text-[#64EEBC]">
              <p>Cerrar Sesion</p>
            </button>
          </div>
        </div>
      </>
    )
  );
};

export default Drawer;
