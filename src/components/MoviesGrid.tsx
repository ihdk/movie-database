import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';

import MovieCard from './MovieCard';

import type { MovieType } from '../assets/types';

/**
 * Renders grid with movies
 */
const MoviesGrid: React.FC<{ movies: MovieType[] }> = ({ movies }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={2} sx={{ pb: theme.spacing(2) }}>
      {movies.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} />
      })}
    </Grid>
  )
}

export default MoviesGrid;