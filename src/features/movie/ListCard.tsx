import React from 'react';

import Link from '@mui/material/Link';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { TableCell, TableRow } from '@mui/material';

import { MovieContext } from '../context';
import { MovieDetails } from '../../app/types';
import MovieGenres from './MovieGenres';
import FavouriteButton from '../FavouriteButton';
import { FancyButton, MovieScore } from '../components';


/**
 * Renders simple movie card in list view
 */
const ListCard: React.FC<{ movie: MovieDetails }> = React.memo(({ movie }) => {

  return (
    <MovieContext.Provider value={movie}>
      <Fade in={true}>
        <TableRow className="movie-item">

          <TableCell>
            <Link href={`/movie/${movie.id}`} underline="none" >
              <Typography variant="h6" component="p">{movie.title}</Typography>
            </Link>
          </TableCell>
          <TableCell>
            {movie.genre_ids && <MovieGenres genresIds={movie.genre_ids} />}

          </TableCell>
          <TableCell>
            {movie.vote_average > 0 && <MovieScore value={movie.vote_average * 10} />}
          </TableCell>
          <TableCell>
            <FavouriteButton size="medium" />
          </TableCell>
          <TableCell>
            <FancyButton href={`/movie/${movie.id}`} variant="contained" size="small" >Read more</FancyButton>
          </TableCell>
        </TableRow>
      </Fade>
    </MovieContext.Provider>
  )
})

export default ListCard;