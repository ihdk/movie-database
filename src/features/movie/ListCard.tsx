import React, { useContext, useRef, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Fade from '@mui/material/Fade';
import TheatersIcon from '@mui/icons-material/Theaters';
import Typography from '@mui/material/Typography';

import CardPopup from './CardPopup';
import { MovieContext } from '../context';
import { MovieDetails } from '../../app/types';
import { TableCell, TableRow } from '@mui/material';
import MovieGenres from './MovieGenres';
import { FancyButton, MovieScore } from '../components';
import FavouriteButton from '../FavouriteButton';


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


const Poster: React.FC = React.memo(() => {
  const theme = useTheme();
  const movie = useContext(MovieContext)
  return (
    <Box position="relative">
      {movie.poster_path
        ?
        <Box
          component="img"
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          sx={{
            maxWidth: 100,
            display: "block",
            borderRadius: 1,
            [theme.breakpoints.down('md')]: {
              maxHeight: 350,
            },
            [theme.breakpoints.down('sm')]: {
              maxHeight: 330,
            },
          }}
        />
        : <MissingImagePlaceholder />
      }
    </Box>
  )
})


const MissingImagePlaceholder: React.FC = React.memo(() => {
  const theme = useTheme();
  const movie = useContext(MovieContext)
  return (
    <Box sx={{
      height: "100%",
      minHeight: 350,
      background: theme.palette.background.defaultAlt,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 1,
      [theme.breakpoints.down('md')]: {
        minHeight: 350,
      },
      [theme.breakpoints.down('sm')]: {
        minHeight: 330,
      },
    }}>
      {movie && <Typography align="center" color="text.primary" variant="h6" sx={{ p: theme.spacing(2, 1), zIndex: 1 }}>{movie.title}</Typography>}
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <TheatersIcon sx={{ opacity: 0.1, fontSize: "10rem" }} />
      </Box>
    </Box >
  )
})

export default ListCard;