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
  const open = useAddMovieDrawerStore((state) => state.open);
  const toggle = useAddMovieDrawerStore((state) => state.toggle);
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
    open && (
      <div className="bg-[#242424] h-screen absolute top-0 w-full ">
        <Header />
        <div className="px-6">
          <h3 className="text-center tracking-widest text-[#64EEBC] text-2xl my-20">
            Agregar pelicula
          </h3>
          <form className="flex flex-col gap-4 items-center">
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <Image src="/clip.svg" width={20} height={20} alt="logo" />
              <p>Agregar un archivo</p>
            </div>
            <input
              type="text"
              placeholder="Titulo"
              className="bg-transparent border-b-2 border-gray-300 text-center w-3/4 focus:outline-none focus:border-[#64EEBC] my-14 uppercase text-xl tracking-widest"
            />
            <button
              disabled
              className="bg-white transition-colors disabled:bg-gray-300 py-4    text-[#242424] w-3/4"
            >
              <p className="tracking-widest text-xl uppercase">
                Subir pelicula
              </p>
            </button>
            <button
              onClick={toggle}
              className="border border-gray-400 py-4  bg-[#242424] tracking-widest text-2xl w-3/4"
            >
              <p className="tracking-widest text-xl uppercase">Salir</p>
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddMovie;
