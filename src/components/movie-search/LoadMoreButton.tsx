import { useSelector, useDispatch } from 'react-redux'

import useTheme from '@mui/material/styles/useTheme';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

import { useFindMoviesQuery } from '../../assets/apiFetcher';
import { updateLoadedPage, setActiveQuery } from '../../store/slice'
import { __pl } from '../../assets/helpers';

import type { MovieType } from '../../assets/types';
import type { RootStoreStateType } from '../../store/store';


/**
 * Renders load more movies button
 */
const LoadMoreButton: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const searchTerm = useSelector<RootStoreStateType, string>((state) => state.local.searchTerm);
  const total = useSelector<RootStoreStateType, number>((state) => state.local.totalMovies);
  const loadedMovies = useSelector<RootStoreStateType, MovieType[]>((state) => state.local.loadedMovies);
  const loadedPage = useSelector<RootStoreStateType, number>((state) => state.local.loadedPage);

  /** keep query in idle state while we don't need query to fetch data */
  const activeQuery = useSelector<RootStoreStateType, boolean>((state) => state.app.activeQuery);

  const query = useFindMoviesQuery(searchTerm, loadedPage, activeQuery);

  const handleLoadMore = () => {
    dispatch(setActiveQuery(true))
    dispatch(updateLoadedPage(loadedPage + 1))
  }

  const nextLoad = total - loadedMovies.length >= 10 ? 10 : total - loadedMovies.length

  return (
    <>
      {nextLoad > 0 &&
        <Box sx={{ p: theme.spacing(4, 0), textAlign: "center" }}>
          <LoadingButton className="load-more-button" loading={query.isLoading} variant="contained" size="large" onClick={handleLoadMore} sx={{
            whiteSpace: "nowrap",
            background: theme.palette.background.fancy,
            color: theme.palette.primary.main,
            p: theme.spacing(2, 6)
          }}>
            Load next {nextLoad} {__pl(["movie", "movies"], nextLoad)}
          </LoadingButton>
        </Box >
      }
    </>
  )
}

export default LoadMoreButton;