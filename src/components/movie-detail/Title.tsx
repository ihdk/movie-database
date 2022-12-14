import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import FavouriteButton from '../FavouriteButton';
import type { MovieType } from '../../assets/types';

/**
 * Renders movie title
 */
const Title: React.FC<{ movie: MovieType }> = ({ movie }) => {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "space-between" }}>
      <Typography component="h1" variant="h4">{movie.title}</Typography>
      <FavouriteButton movie={movie} />
    </Stack>
  )
}

export default Title;