import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

import useTheme from '@mui/material/styles/useTheme';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import MoviesGrid from '../MoviesGrid';
import { useFindMoviesQuery } from '../../assets/apiFetcher';
import { updateLoadedPage, setActiveQuery } from '../../store/slice'
import { __pl } from '../../assets/helpers';

import type { MovieType } from '../../assets/types';
import type { RootStore } from '../../store/store';


/**
 * Renders search results with movies
 */
const SearchResults: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const searchTerm = useSelector<RootStore, string>((state) => state.local.searchTerm);
  const total = useSelector<RootStore, number>((state) => state.local.totalMovies);
  const loadedMovies = useSelector<RootStore, MovieType[]>((state) => state.local.loadedMovies);
  const loadedPage = useSelector<RootStore, number>((state) => state.local.loadedPage);

  /** keep query in idle state while we don't need query to fetch data */
  const activeQuery = useSelector<RootStore, boolean>((state) => state.app.activeQuery);

  const query = useFindMoviesQuery(searchTerm, loadedPage, activeQuery);

  const handleLoadMore = () => {
    dispatch(setActiveQuery(true))
    dispatch(updateLoadedPage(loadedPage + 1))
  }

  const LoadMore = () => {
    if (loadedMovies.length >= total) return null;

    const nextLoad = total - loadedMovies.length >= 10 ? 10 : total - loadedMovies.length

    return (
      <Box sx={{ p: theme.spacing(4, 0), textAlign: "center" }}>
        <LoadingButton loading={query.isLoading} variant="contained" size="large" onClick={handleLoadMore} sx={{
          whiteSpace: "nowrap",
          background: theme.palette.background.fancy,
          color: theme.palette.primary.main,
          p: theme.spacing(2, 6)
        }}>
          Load next {nextLoad} {__pl(["movie", "movies"], nextLoad)}
        </LoadingButton>
      </Box >
    )
  }

  return (
    <>
      {/* show loader only while the first set of movies is loading */}
      {(query.isLoading && loadedMovies.length === 0) && <Box textAlign="center"><CircularProgress /></Box>}

      {loadedMovies.length > 0 &&
        <Box>
          <Typography component="h2" variant="h5">Found {total} {__pl(["movie", "movies"], total)} </Typography>
          <Typography sx={{ mb: theme.spacing(2) }}>Showing {loadedMovies.length} of {total}</Typography>
          <MoviesGrid movies={loadedMovies} />
          <LoadMore />
        </Box>
      }
    </>
  );

}

export default SearchResults;