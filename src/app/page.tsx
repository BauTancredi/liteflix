import Image from "next/image";

import Drawer from "./components/Drawer";
import MovieList from "./components/MovieList";
import Header from "./components/Header";
import AddMovie from "./components/AddMovie";

const getPopularMovies = async () => {
  const result = await fetch(process.env.URL + "/api/popular", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (result.ok) {
    return result.json();
  }

  return [];
};

const getFeaturedMovie = async () => {
  const result = await fetch(process.env.URL + "/api/featured", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (result.ok) {
    return result.json();
  }

  return [];
};

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

export default async function Home() {
  const data = await getPopularMovies();
  const data2 = await getFeaturedMovie();

  const popularMovies: Movie[] = data.data.results.splice(0, 4);
  const featuredMovie: Movie = data2.res.results[3];

  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.poster_path})`,
        backgroundSize: "130%",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <main>
        <section
          className={`h-[calc(100vh-6rem)] flex flex-col justify-end w-full bg-gradient-to-t from-[#242424]`}
        >
          <p className="text-xl tracking-widest font-thin text-center">
            ORIGINAL DE <span className="font-bold">LITEFLIX</span>
          </p>
          <p className="text-8xl text-center tracking-widest  mt-5 mb-20 text-[#64EEBC]">
            {featuredMovie.title}
          </p>
          <div className="flex flex-col items-center gap-6 ">
            <button className="flex  py-4 w-96 justify-center gap-5 bg-[#242424]  items-center">
              <Image src="/play_2.svg" width={30} height={30} alt="play icon" />
              <p className="tracking-widest text-2xl font-light">REPRODUCIR</p>
            </button>
            <button className="flex border border-gray-400 py-4 w-96  justify-center gap-5 bg-[#242424] tracking-widest text-2xl items-center">
              <Image src="/plus.svg" width={30} height={30} alt="play icon" />
              <p className="tracking-widest text-2xl font-light">MI LISTA</p>
            </button>
          </div>
        </section>
        <MovieList popularMovies={popularMovies} />
        <Drawer />
        <AddMovie />
      </main>
    </div>
  );
}
