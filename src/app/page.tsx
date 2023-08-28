import Image from "next/image";

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

// util conver date to year
const convertDateToYear = (date: string) => {
  return new Date(date).getFullYear();
};

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="relative cursor-pointer group">
      <Image
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        alt={movie.title}
        width={500}
        height={280}
        className="w-full rounded-md "
      />
      <div className="group-hover:hidden absolute w-full h-full  top-0 opacity-90 flex flex-col justify-end items-center bg-gradient-to-t from-gray-900">
        <Image src="/play.svg" width={80} height={80} alt="play icon" />
        <p className="text-center text-2xl tracking-widest my-8 uppercase font-semibold">
          {movie.title}
        </p>
      </div>
      <div className="group-hover:flex hidden absolute w-full h-full top-0  flex-col justify-end  bg-black/50 px-10">
        <div className="flex gap-3 items-center text-left">
          <Image src="/play.svg" width={40} height={40} alt="play icon" />
          <p className="text-xl tracking-widest uppercase font-semibold text-left">
            {movie.title}
          </p>
        </div>
        <div className="flex gap-3 justify-between text-xl">
          <div className="flex items-center gap-3">
            <Image
              src="/rating-star.svg"
              width={30}
              height={30}
              alt="play icon"
            />
            <p>{movie.vote_average}</p>
          </div>
          <p className="text-center tracking-widest my-6 uppercase font-semibold">
            {convertDateToYear(movie.release_date)}
          </p>
        </div>
      </div>
    </div>
  );
};

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
      <header className="flex justify-between p-6">
        <Image
          src="/hamburger-icon.svg"
          width={40}
          height={40}
          alt="hamburger icon"
        />
        <h1 className="text-3xl tracking-widest font-thin text-[#64EEBC]">
          <span className="font-bold">LITE</span>
          FLIX
        </h1>
        <Image src="/user-icon.svg" width={40} height={40} alt="search icon" />
      </header>
      <main>
        <section
          className={`h-[calc(100vh-6rem)] flex flex-col justify-end w-full bg-gradient-to-t from-[#242424] `}
        >
          <p className="text-xl tracking-widest font-thin text-center">
            ORIGINAL DE <span className="font-bold">LITEFLIX</span>
          </p>
          <p className="text-8xl text-center tracking-wider  mt-5 mb-20 text-[#64EEBC]">
            {featuredMovie.title}
          </p>
          <div className="flex flex-col items-center gap-6 ">
            <button className="flex  py-4 w-96 justify-center gap-5 bg-[#242424] tracking-widest text-2xl items-center ">
              <Image src="/play_2.svg" width={30} height={30} alt="play icon" />
              REPRODUCIR
            </button>
            <button className="flex border border-gray-400 py-4 w-96  justify-center gap-5 bg-[#242424] tracking-widest text-2xl items-center">
              <Image src="/plus.svg" width={30} height={30} alt="play icon" />
              MI LISTA
            </button>
          </div>
        </section>
        <section className="p-6">
          <div className="flex justify-center gap-3">
            <h3 className="text-3xl tracking-wider text-center mt-10 mb-10">
              VER: &nbsp;
              <span className="font-bold ">POPULARES</span>
            </h3>
            <Image
              src="/arrow.svg"
              width={20}
              height={20}
              alt="arrow down icon"
            />
          </div>
          <ul className="flex gap-5 flex-col">
            {popularMovies.map((movie) => (
              <li key={movie.id}>
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
