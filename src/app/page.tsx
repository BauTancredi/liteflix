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
  vote_average: number;
  release_date: string;
}

// const MovieCard = ({ movie }: { movie: Movie }) => {
//   return (
//     <div>
//       <Image
//         src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//         alt={movie.title}
//         width={100}
//         height={100}
//       />
//     </div>
//   );
// };

export default async function Home() {
  const data = await getPopularMovies();
  const data2 = await getFeaturedMovie();

  const popularMovies: Movie[] = data.data.results.splice(0, 4);
  const featuredMovie: Movie = data2.res.results[0];

  return (
    <main className="">
      <ul>
        {popularMovies.map((movie) => (
          <li key={movie.id}>{/* <MovieCard movie={movie} /> */}</li>
        ))}
      </ul>
    </main>
  );
}
