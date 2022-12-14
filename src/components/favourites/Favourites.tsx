import { useSelector } from 'react-redux'

import useTheme from '@mui/material/styles/useTheme';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Header from '../Header';
import CoverImage from '../CoverImage';
import MoviesGrid from '../MoviesGrid';

import type { RootStore } from '../../store/store';
import type { MovieType } from '../../assets/types';

/**
 * Renders page with selected favourite movies
 */
const Favourites: React.FC = () => {
  const theme = useTheme();
  const bg = require('../../assets/images/bg.jpg');
  const favouriteMovies = useSelector<RootStore, MovieType[]>((state) => state.local.favouriteMovies);

  return (
    <>
      <CoverImage imageUrl={bg} />
      <Header />
      <Container maxWidth="xl">
        <Typography component="h1" variant="h4" sx={{ mb: theme.spacing(2) }}>My favourite movies</Typography>
        {favouriteMovies.length > 0
          ? <MoviesGrid movies={favouriteMovies} />
          : <Typography>Your list is empty</Typography>
        }
      </Container>
    </>
  )
}

export default Favourites;