import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { useLazyGetMoviesQuery, useMovieQueryError } from '../../app/store/moviesApiSlice';
import { __pl } from '../../app/helpers';
import { RootStoreStateType } from '../../app/store/store';
import { MovieDetails } from '../../app/types';
import { FancyLoadingButton, Section } from '../components';
import SimpleCard from '../movie/SimpleCard';


/**
 * Renders search results with movies
 */
const SearchResults: React.FC = () => {
  const theme = useTheme();
  const totalMovies = useSelector<RootStoreStateType, number>((state) => state.local.totalMovies);
  const movies = useSelector<RootStoreStateType, MovieDetails[]>((state) => state.local.movies);

  const nextLoad = useMemo(() => { return totalMovies - movies.length >= 20 ? 20 : totalMovies - movies.length }, [totalMovies, movies.length])

  return movies.length > 0
    ?
    <Box className="search-results" sx={{ mt: theme.spacing(4) }}>

      <Section component="div" className="search-results-header" disableGutters>
        <TitleTotal total={totalMovies} />
        <TitleShowing showing={movies.length} total={totalMovies} />
      </Section>

      <Grid container spacing={2}>
        {movies.map((movie, index) => {
          return (
            <Grid item key={`${index}-${movie.id}`} lg={2} md={3} sm={4} xs={6} >
              <SimpleCard movie={movie} />
            </Grid>
          )
        })}
      </Grid>

      {nextLoad > 0 && <LoadMore nextLoad={nextLoad} />}

    </Box>
    : null
}

const TitleTotal: React.FC<{ total: number }> = React.memo(({ total }) => {
  const text = `Found ${total} ${__pl(["movie", "movies"], total)}`
  return <Typography variant="subtitle1" component="p">{text}</Typography>
})

const TitleShowing: React.FC<{ showing: number, total: number }> = React.memo(({ showing, total }) => {
  const text = `Showing ${showing} of ${total}`
  return <Typography variant="subtitle2" component="p">{text}</Typography>
})

const LoadMore: React.FC<{ nextLoad: number }> = React.memo(({ nextLoad }) => {
  const searchTerm = useSelector<RootStoreStateType, string>((state) => state.local.searchTerm);
  const loadedPage = useSelector<RootStoreStateType, number>((state) => state.local.loadedPage);
  const [triggerGetMovies, { isError, error, isFetching }] = useLazyGetMoviesQuery()
  useMovieQueryError(isError, error);

  const onLoadMore = () => {
    triggerGetMovies({ searchTerm: searchTerm, page: loadedPage + 1 })
  }

  return nextLoad > 0
    ? <Section component="div" spacing="small" sx={{ textAlign: "center" }}>
      <FancyLoadingButton className="load-more-button" loading={isFetching} variant="contained" size="large" onClick={onLoadMore}>
        {nextLoad} more {__pl(["movie", "movies"], nextLoad)}
      </FancyLoadingButton>
    </Section >
    : null
})

export default SearchResults;