import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit";

import { notify } from "../helpers";
import { setSearchTerm } from "./localStorageSlice";
import { Genres, MovieDetails, CrewDetails, ActorDetails } from "../types";

interface MoviesApiResponse {
  results: MovieDetails[];
  page: number;
  total_results: number;
  total_pages: number;
}

interface MoviesApiError {
  status: number;
  data: {
    status_code: number;
    status_message: string;
    success: boolean;
  };
}

interface GenresApiResponse {
  genres: {
    id: number;
    name: string;
  }[];
}

interface ActorCreditsApiResponse {
  id: number;
  cast: MovieDetails[];
  crew: CrewDetails[];
}

export const moviesApiSlice = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.themoviedb.org/3/`,
  }) as BaseQueryFn<string | FetchArgs, unknown, MoviesApiError, {}>,
  endpoints: (builder) => ({
    getMovies: builder.query<
      MoviesApiResponse,
      { searchTerm: string; page?: number }
    >({
      query: ({ searchTerm, page = 1 }) =>
        `search/movie?api_key=0c3f0750ff16ca7c4b32ebb707051867&append_to_response=credits&query=${searchTerm}&page=${page}`,
      onQueryStarted(searchData, { dispatch }) {
        // do not update search term on load more action
        if (searchData.page === undefined) {
          dispatch(setSearchTerm(searchData.searchTerm));
        }
      },
      transformResponse: (response: MoviesApiResponse) => {
        if (response.results.length === 0)
          notify({ text: "Movie not found!", options: { type: "error" } });
        return response;
      },
    }),

    getMovieDetails: builder.query<MovieDetails, string | undefined>({
      query: (id) => {
        if (id === undefined) throw new Error("Not defined movie ID");
        return `movie/${id}?api_key=0c3f0750ff16ca7c4b32ebb707051867&include_image_language=en&append_to_response=credits,videos,images`;
      },
      transformResponse: (response: MovieDetails) => {
        // filter only some from too many results
        response.credits.crew = response.credits.crew.filter((person) => {
          return [
            "Writer",
            "Director",
            "Producer",
            "Characters",
            "Screenplay",
          ].includes(person.job);
        });

        // store genre ids, movies api query returns different results for genres in different queries (search query, top rated query ....)
        response.genre_ids = response.genres.map((genre) => genre.id);

        // show only actors with profile image
        response.credits.cast = response.credits.cast.filter(
          (person) => person.profile_path
        );
        return response;
      },
    }),

    getActorDetails: builder.query<ActorDetails, string | undefined>({
      query: (id) => {
        if (id === undefined) throw new Error("Not defined actor ID");
        return `person/${id}?api_key=0c3f0750ff16ca7c4b32ebb707051867`;
      },
    }),

    getActorCredits: builder.query<MovieDetails[], number>({
      query: (id) => {
        if (id === undefined) throw new Error("Not defined actor ID");
        return `person/${id}/movie_credits?api_key=0c3f0750ff16ca7c4b32ebb707051867`;
      },
      transformResponse: (response: ActorCreditsApiResponse) => {
        return response.cast;
      },
    }),

    nowPlaying: builder.query<MovieDetails[], void>({
      query: () =>
        `movie/now_playing?api_key=0c3f0750ff16ca7c4b32ebb707051867&page=1`,
      transformResponse: (response: MoviesApiResponse) => {
        return response.results;
      },
    }),

    topRated: builder.query<MovieDetails[], void>({
      query: () =>
        `movie/top_rated?api_key=0c3f0750ff16ca7c4b32ebb707051867&page=1`,
      transformResponse: (response: MoviesApiResponse) => {
        return response.results.slice(0, 9);
      },
    }),

    similarMovies: builder.query<MovieDetails[], number>({
      query: (id) =>
        `movie/${id}/similar?api_key=0c3f0750ff16ca7c4b32ebb707051867&page=1`,
      transformResponse: (response: MoviesApiResponse) => {
        return response.results.slice(0, 6);
      },
    }),

    getGenres: builder.query<Genres, void>({
      query: () => `genre/movie/list?api_key=0c3f0750ff16ca7c4b32ebb707051867`,
      transformResponse: (response: GenresApiResponse) => {
        const remapped = {} as Genres;
        response.genres.forEach((data) => {
          remapped[data.id] = data.name;
        });
        return remapped;
      },
    }),
  }),
});

export const useMovieQueryError = (
  isError: boolean,
  error: MoviesApiError | SerializedError | undefined
) => {
  if (isError && error) {
    if ("data" in error) {
      notify({ text: error.data.status_message, options: { type: "error" } });
    } else {
      const errMsg =
        "message" in error
          ? error.message
          : "error" in error
          ? error.error
          : JSON.stringify(error);
      notify({ text: errMsg as string, options: { type: "error" } });
    }
  }
};

export const {
  useLazyGetMoviesQuery,
  useGetMovieDetailsQuery,
  useGetActorDetailsQuery,
  useGetActorCreditsQuery,
  useNowPlayingQuery,
  useTopRatedQuery,
  useSimilarMoviesQuery,
  useGetGenresQuery,
} = moviesApiSlice;
