import React from 'react';

import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { useTopRatedQuery } from '../../app/store/moviesApiSlice';
import { SectionTitle } from '../../features/components';
import DetailCard from '../../features/movie/DetailCard';


/**
 * Renders top rated movies
 */
const TopRated: React.FC = React.memo(() => {
  const { data: movies, isSuccess, isLoading, isError } = useTopRatedQuery()
  return (
    <>
      <SectionTitle variant="h2" >Top rated movies</SectionTitle>
      {isError && <>Failed to load</>}

      {isLoading && <LoadingPlaceholder />}

      {(isSuccess && movies.length > 0) &&
        <Grid container spacing={2} >
          {movies.map((movie, index) =>
            <Grid item key={`${index}-${movie.id}`} lg={4} sm={6} xs={12}>
              <DetailCard movie={movie} />
            </Grid>
          )}
        </Grid>
      }
    </>
  )
})

const LoadingPlaceholder: React.FC = React.memo(() => {
  return (
    <Grid container spacing={2} >
      {Array.from(Array(6).keys()).map((key) => {
        return <Grid item key={`skeleton-${key}`} lg={4} md={6} sm={12} >
          <Skeleton variant='rounded' height={475} width="100%" animation="pulse" ></Skeleton>
        </Grid>
      })}
    </Grid >
  )
})

export default TopRated