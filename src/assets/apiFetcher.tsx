import { useQuery } from 'react-query';
import axios from 'axios';

import { notify } from './helpers';

/** Assume the api key is stored in safe place in the real world */
const key = "55d07fcf";
const apiUrlBase = `http://www.omdbapi.com/?apikey=${key}`;

/**
 * Get all movies by the search keyword
 * @returns react query
 */
export const useFindMoviesQuery = (searchTerm: string, loadedPage: number | string, activeQuery: boolean) => {
  const getMovies = () => axios.get(`${apiUrlBase}&s=${searchTerm}&type=movie&page=${loadedPage}`).then(
    (response) => {
      return response.data;
    }
  ).catch((error) => {
    notify(error.message)
    throw new Error(error)
  }
  );

  return useQuery({
    queryKey: ['get_movies', searchTerm, loadedPage],
    queryFn: getMovies,
    // process query only only if there is search keyword and query is enabled by load button
    // prevent query processing on page load and rerender results displayed from local storage
    enabled: searchTerm !== "" && activeQuery,
  });
}

/**
 * Get all todos for dashboard page
 * @returns react query
 */
export const useGetMovie = (movieId: string) => {
  const getMovie = () => axios.get(`${apiUrlBase}&i=${movieId}&plot=full`).then(
    (response) => {
      return response.data;
    }
  ).catch((error) => {
    notify(error.message)
    throw new Error(error)
  }
  );

  return useQuery('get_movie', getMovie)
}
