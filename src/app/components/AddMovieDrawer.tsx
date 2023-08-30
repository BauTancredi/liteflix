"use client";
import Image from "next/image";
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

import { useAddMovieDrawerStore } from "../store";

import Header from "./Header";

const baseStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  alignItems: "center",
  padding: "1.5rem",
  borderWidth: 1,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "75%",
};

const focusedStyle = {
  borderColor: "#64EEBC",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const AddMovie = () => {
  const openAddMovieDrawer = useAddMovieDrawerStore((state) => state.open);
  const toggleAddMovieDrawer = useAddMovieDrawerStore((state) => state.toggle);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { "image/*": [] } });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    openAddMovieDrawer && (
      <div className="absolute top-0 h-screen w-full bg-[#242424] ">
        <Header />
        <div className="px-6">
          <h3 className="my-20 text-center text-2xl tracking-widest text-[#64EEBC]">
            Agregar pelicula
          </h3>
          <form className="flex flex-col items-center gap-4">
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <Image alt="logo" height={20} src="/clip.svg" width={20} />
              <p>Agregar un archivo</p>
            </div>
            <input
              className="my-14 w-3/4 border-b-2 border-gray-300 bg-transparent text-center text-xl uppercase tracking-widest focus:border-[#64EEBC] focus:outline-none"
              placeholder="Titulo"
              type="text"
            />
            <button
              disabled
              className="w-3/4 bg-white py-4 text-[#242424]    transition-colors disabled:bg-gray-300"
            >
              <p className="text-xl uppercase tracking-widest">
                Subir pelicula
              </p>
            </button>
            <button
              className="w-3/4 border border-gray-400  bg-[#242424] py-4 text-2xl tracking-widest"
              onClick={toggleAddMovieDrawer}
            >
              <p className="text-xl uppercase tracking-widest">Salir</p>
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddMovie;
