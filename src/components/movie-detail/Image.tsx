import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import type { MovieType } from '../../assets/types';

/**
 * Renders movie image
 */
const Image: React.FC<{ movie: MovieType }> = ({ movie }) => {
  const theme = useTheme();

  return (
    <>
      {movie.image &&
        <Box className="movie-image" sx={{ mb: theme.spacing(4) }}>
          <Card sx={{ borderRadius: 4, width: 300, maxWidth: "100%", m: theme.spacing(0, "auto") }}>
            <CardMedia
              component="img"
              image={movie.image}
              alt={movie.title}
            />
          </Card>
        </Box>
      }
    </>
  )
}

export default Image;