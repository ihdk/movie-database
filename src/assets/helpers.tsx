import React from 'react';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';

import type { MovieType } from './types';
import { useSelector } from 'react-redux';
import { RootStore } from '../store/store';
/**
 * Simple plural text for internal use, ignore localization possibilities in this example
 * 
 * @param text array of singular and plural form
 * @param count number of items
 * @returns string
 */
export const __pl: (text: string[], count: number) => string = (text, count) => {
  return count === 1 ? text[0] : text[1];
}

/**
 * Displays notification message
 * 
 * @param message notification message text
 * @param title notification title text
 */
export const notify = (message: string, title?: string) => {
  toast.error(<>
    {title && <Typography variant="body1" fontWeight={600} display="block">{title}</Typography>}
    <Typography variant="body2" display="block">{message}</Typography>
  </>)
}

export const processFetchedMovie: (data: any) => MovieType = (data) => {
  return {
    id: data.imdbID,
    title: data.Title && isAvailable(data.Title) ? data.Title : "",
    plot: data.Plot && isAvailable(data.Plot) ? data.Plot : "",
    image: data.Poster && isAvailable(data.Poster) ? data.Poster : "",
    actors: data.Actors && isAvailable(data.Actors) ? data.Actors : "",
    genre: data.Genre && isAvailable(data.Genre) ? data.Genre : "",
    runtime: data.Runtime && isAvailable(data.Runtime) ? data.Runtime : "",
    language: data.Language && isAvailable(data.Language) ? data.Language : "",
    writer: data.Writer && isAvailable(data.Writer) ? data.Writer : "",
    director: data.Director && isAvailable(data.Director) ? data.Director : "",
    year: data.Director && isAvailable(data.Year) ? data.Year : "",
    
  }
}

const isAvailable = (value: string) => {
  return value.toLowerCase() !== 'n/a'
}

export const useIsFavouriteMovie = (movieId: string) => {
  const favouriteMovies = useSelector<RootStore, MovieType[]>((state) => state.local.favouriteMovies);
  let isFavourite = false;
  favouriteMovies.map((item) => {
    if (item.id === movieId) isFavourite = true;
  })
  return isFavourite;
}

