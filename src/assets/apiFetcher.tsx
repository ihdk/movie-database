import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { notify } from './helpers';
import { updateLoadedPage, updateLoadedMovies, resetLoadedMovies, setTotalMovies, setActiveQuery } from '../store/slice'

/** Assume the api key is stored in safe place in the real world */
const key = "55d07fcf";
const apiUrlBase = `https://www.omdbapi.com/?apikey=${key}`;

/**
 * Get all movies by the search keyword
 * @returns react query
 */
export const useFindMoviesQuery = (searchTerm: string, loadedPage: number | string, activeQuery: boolean) => {
  const dispatch = useDispatch();
  const getMovies = () => axios.get(`${apiUrlBase}&s=${searchTerm}&type=movie&page=${loadedPage}`).then(
    (response) => {
      if (response.data.Response === "True") {
        // success query, returned found movies
        dispatch(updateLoadedMovies({ data: response.data.Search, reset: loadedPage === 1 }))
        dispatch(setTotalMovies(response.data.totalResults))
      }

      if (response.data.Response === 'False') {
        // success query, but not found results in database
        notify(response.data.Error);
        dispatch(updateLoadedPage(0))
        dispatch(setTotalMovies(0))
        dispatch(resetLoadedMovies())
        dispatch(setActiveQuery(false))
      }
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
 * Get movie by its ID
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