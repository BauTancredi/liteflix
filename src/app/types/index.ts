export interface Movie {
  id: number | string;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

export type Category = "popular" | "my-movies";
