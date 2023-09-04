"use client";
import Image from "next/image";
import React, { useMemo, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import appFirebase from "../firebaseConfig";
import { useAddMovieDrawerStore } from "../store";

import Spinner from "./Spinner";

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
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  const openAddMovieDrawer = useAddMovieDrawerStore((state) => state.open);
  const toggleAddMovieDrawer = useAddMovieDrawerStore((state) => state.toggle);

  const db = getFirestore(appFirebase);
  const storage = getStorage(appFirebase);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { "image/*": [] }, onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMovie = {
      title,
      imgUrl: "",
    };

    try {
      setLoading(true);

      const url = await handleImageUpload();

      newMovie.imgUrl = url;

      await addDoc(collection(db, "movies"), newMovie);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    setFinished(true);
    setLoading(false);
  };

  const handleImageUpload = async () => {
    const storageRef = ref(storage, `movies/${file?.name}`);

    await uploadBytes(storageRef, file as Blob);

    const url = await getDownloadURL(storageRef);

    return url;
  };

  const handleExit = () => {
    setTitle("");
    setFile(null);
    setFinished(false);
    toggleAddMovieDrawer();
  };

  return (
    openAddMovieDrawer && (
      <div className="absolute top-0 h-screen w-full bg-[#242424] ">
        <div className="px-6 py-20">
          {!finished ? (
            <>
              <h3 className="my-20 text-center text-2xl tracking-widest text-[#64EEBC]">
                Agregar pelicula
              </h3>
              <form
                className="flex flex-col items-center gap-4"
                onSubmit={handleSubmit}
              >
                <div {...getRootProps({ style })}>
                  <input {...getInputProps()} />
                  <Image
                    alt="logo"
                    height={20}
                    src="/assets/clip.svg"
                    width={20}
                  />
                  <p>Agregar un archivo</p>
                </div>
                <input
                  className="my-14 w-3/4 border-b-2 border-gray-300 bg-transparent text-center text-xl uppercase tracking-widest focus:border-[#64EEBC] focus:outline-none"
                  placeholder="Titulo"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button
                  className="flex w-3/4 justify-center bg-white    py-4 text-[#242424] transition-colors disabled:bg-gray-300"
                  disabled={!title || !file}
                  type="submit"
                >
                  {!loading ? (
                    <p className="flex justify-center text-xl  uppercase tracking-widest">
                      Subir pelicula
                    </p>
                  ) : (
                    <Spinner />
                  )}
                </button>
                <button
                  className="w-3/4 border border-gray-400  bg-[#242424] py-4 text-2xl tracking-widest"
                  onClick={() => {
                    handleExit();
                  }}
                >
                  <p className="text-xl uppercase tracking-widest">Salir</p>
                </button>
              </form>
            </>
          ) : (
            <div className="my-20 flex flex-col items-center gap-4">
              <p className="text-center text-2xl tracking-widest text-[#64EEBC]">
                Felicitaciones
              </p>
              <p className="my-20 text-center">
                Tu pelicula fue agregada correctamente
              </p>
              <button
                className="w-3/4 bg-white py-4 text-[#242424]"
                onClick={toggleAddMovieDrawer}
              >
                Ir al home
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default AddMovie;
