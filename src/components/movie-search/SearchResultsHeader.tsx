import { useSelector } from 'react-redux'

import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { __pl } from '../../assets/helpers';

import type { MovieType } from '../../assets/types';
import type { RootStoreStateType } from '../../store/store';


/**
 * Renders search results header with information about number of found movies
 */
const SearchResultsHeader: React.FC = () => {
  const theme = useTheme();
  const total = useSelector<RootStoreStateType, number>((state) => state.local.totalMovies);
  const loadedMovies = useSelector<RootStoreStateType, MovieType[]>((state) => state.local.loadedMovies);

  return (
    <Box className="search-results-header">
      <Typography component="h2" variant="h5">Found {total} {__pl(["movie", "movies"], total)} </Typography>
      <Typography sx={{ mb: theme.spacing(2) }}>Showing {loadedMovies.length} of {total}</Typography>
    </Box>
  )
}

export default SearchResultsHeader;