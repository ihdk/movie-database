import { useSelector } from 'react-redux'

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import MoviesGrid from '../MoviesGrid';
import SearchResultsHeader from './SearchResultsHeader';
import { useFindMoviesQuery } from '../../assets/apiFetcher';
import { __pl } from '../../assets/helpers';

import type { MovieType } from '../../assets/types';
import type { RootStoreStateType } from '../../store/store';
import LoadMoreButton from './LoadMoreButton';


/**
 * Renders search results with movies
 */
const SearchResults: React.FC = () => {

  const searchTerm = useSelector<RootStoreStateType, string>((state) => state.local.searchTerm);
  const loadedMovies = useSelector<RootStoreStateType, MovieType[]>((state) => state.local.loadedMovies);
  const loadedPage = useSelector<RootStoreStateType, number>((state) => state.local.loadedPage);

  /** keep query in idle state while we don't need query to fetch data */
  const activeQuery = useSelector<RootStoreStateType, boolean>((state) => state.app.activeQuery);

  const query = useFindMoviesQuery(searchTerm, loadedPage, activeQuery);

  return (
    <>
      {/* show loader only while the first set of movies is loading */}
      {(query.isLoading && loadedMovies.length === 0) && <Box textAlign="center"><CircularProgress /></Box>}

      {loadedMovies.length > 0 &&
        <Box className="search-results">
          <SearchResultsHeader />
          <MoviesGrid movies={loadedMovies} />
          <LoadMoreButton />
        </Box>
      }
    </>
  )
}

export default SearchResults;