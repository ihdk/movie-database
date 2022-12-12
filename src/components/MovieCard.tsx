import React from 'react';

import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import FavouriteButton from './FavouriteButton';
import MissingImagePlaceholder from './MissingImagePlaceholder';
import { useIsFavouriteMovie } from '../assets/helpers'

import type { MovieType } from '../assets/types';

/**
 * Renders movie card in the grid
 */
const MovieCard: React.FC<{ movie: MovieType }> = ({ movie }) => {
  const theme = useTheme();
  const isFavourite = useIsFavouriteMovie(movie.id);

  return (
    <Grid item width={{ xs: "50%", sm: "25%", md: "20%" }}>{/* used percentage css instead of grid system to show 5 items per row*/}
      <Box sx={{
        position: "relative",
        height: "100%",
        '&:hover > .favourite-button-wrapper': {
          display: "block",
        }
      }}>
        <Box className="favourite-button-wrapper" sx={{
          p: theme.spacing(1),
          position: "absolute", top: 0, right: 0, zIndex: 1,
          display: isFavourite ? "block" : "none",
        }}>
          <FavouriteButton movie={movie} />
        </Box>
        <Link href={`/movie/${movie.id}`} underline="none">
          <Card sx={{
            position: "relative",
            height: "100%",
          }}>
            {movie.image !== ""
              ? (
                <CardMedia
                  component="img"
                  height="400"
                  image={movie.image !== "" ? movie.image : require('../assets/images/missing_image.png')}
                  alt={movie.title}
                />
              )
              : (
                <MissingImagePlaceholder movie={movie} />
              )
            }
          </Card>
        </Link>
      </Box>
    </Grid >
  )
}

export default MovieCard;