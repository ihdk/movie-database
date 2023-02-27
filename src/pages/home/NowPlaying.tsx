import React from 'react';

import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';

import { useNowPlayingQuery } from '../../app/store/moviesApiSlice';
import { SectionTitle } from '../../features/components';
import GridCard from '../../features/movie/SimpleCard';
import Swiper from '../../features/Swiper';


/**
 * Renders search results with movies
 */
const NowPlaying: React.FC = React.memo(() => {
  const { data: movies, isSuccess, isLoading, isError } = useNowPlayingQuery()
  return (
    <>
      <Container maxWidth="xl">
        <SectionTitle variant="h2" >Now in cinemas</SectionTitle>
        {isLoading && <LoadingPlaceholder />}
        {isError && <>Failed to load</>}
      </Container>

      {
        isSuccess &&
        <Swiper slides={movies.map((movie, index) => <GridCard key={`${index}-${movie.id}`} movie={movie} />)} />
      }

    </>
  )
})

const LoadingPlaceholder: React.FC = React.memo(() =>
  <Skeleton variant='rounded' height={350} width="100%" animation="pulse" ></Skeleton>
)


export default NowPlaying