import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';

import useTheme from '@mui/material/styles/useTheme';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import Header from '../Header';
import CoverImage from '../CoverImage';
import DetailsBar from './DetailsBar';
import Actors from './Actors';
import Title from './Title';
import Image from './Image';
import Plot from './Plot';
import FooterData from './FooterData';

import { processFetchedMovie } from '../../assets/helpers';
import { useGetMovie } from '../../assets/apiFetcher';

import type { MovieType } from '../../assets/types';

/**
 * Renders page with movie details
 */
const Movie: React.FC = () => {
  const theme = useTheme();
  const match = useMatch('/movie/:id');
  const movieId = match !== null && match.params.id !== undefined ? match.params.id : "";
  const [movie, setMovie] = useState<MovieType | null>(null);

  const query = useGetMovie(movieId);

  useEffect(() => {
    if (query.isSuccess && query.data.Response === "True") {
      setMovie(processFetchedMovie(query.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data])

  return (
    <>
      <Header />

      {query.isLoading &&
        <Container maxWidth="xl" sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Container>
      }

      {(query.isError || (query.isSuccess && query.data.Response === "False")) &&
        <Container maxWidth="xl" sx={{ textAlign: "center" }}>
          <Typography>Movie not found.</Typography>
        </Container>
      }

      {(query.isSuccess && movie) &&
        <>
          {movie.image && <CoverImage imageUrl={movie.image} />}
          <Container maxWidth="xl" >
            <Stack direction={{ sm: "column", md: "row" }} spacing={3} sx={{ mb: theme.spacing(4) }}>
              <Image movie={movie} />
              <Box sx={{ width: "100%", pt: theme.spacing(1) }}>
                <Title movie={movie} />
                <Actors actors={movie.actors} />
                <DetailsBar movie={movie} />
                <Plot movie={movie} />
                <FooterData movie={movie} />
              </Box>
            </Stack>
          </Container>
        </>
      }
    </>
  )
}

export default Movie;