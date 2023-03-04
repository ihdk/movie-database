export type ThemeType = "dark" | "light";
export type SearchResultsView = "grid" | "list";

export interface MovieDetails {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime: string;
  genre_ids: number[];
  genres: {
    id: number;
    name: string;
  }[];
  credits: {
    cast: ActorDetails[];
    crew: CrewDetails[];
  };
  images: {
    logos: any[];
  };
}

export interface ActorDetails {
  id: number;
  name: string;
  character: string;
  profile_path: string;
  biography: string;
  popularity: number;
  homepage: string;
  birthday: string;
  deathday: string;
  place_of_birth: string;
}

export interface CrewDetails {
  id: number;
  name: string;
  profile_path: string;
  job: string;
}

export interface Genres {
  [key: number]: string;
}
