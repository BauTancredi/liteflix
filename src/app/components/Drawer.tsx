"use client";
import React from "react";
import Image from "next/image";

import { useDrawerStore, useAddMovieDrawerStore } from "../store";

import Header from "./Header";

const options = [
  "Inicio",
  "Series",
  "Peliculas",
  "Agregadas recientemente",
  "Populares",
  "Mis Peliculas",
  "Mi lista",
];

const Drawer = () => {
  const open = useDrawerStore((state) => state.open);
  const toggle = useAddMovieDrawerStore((state) => state.toggle);

  // disable scroll when drawer is open
  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [open]);

  return (
    open && (
      <>
        <div className="absolute top-0 h-screen w-full overflow-hidden bg-[#242424]">
          <Header />
          <div className="mt-10 px-6">
            <ul className="flex flex-col gap-8">
              {options.map((option) => (
                <li
                  key={option}
                  className="cursor-pointer text-xl font-thin tracking-widest hover:text-[#64EEBC]"
                >
                  {option}
                </li>
              ))}
            </ul>

            <button className="my-28 flex items-center gap-4" onClick={toggle}>
              <Image
                alt="play icon"
                className=""
                height={25}
                src="/plus.svg"
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
