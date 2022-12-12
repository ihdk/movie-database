import React from 'react';

import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { MovieType } from '../../assets/types';

/**
 * Renders movie plot
 */
const Plot: React.FC<{ movie: MovieType }> = ({ movie }) => {
  const theme = useTheme();

  return (
    <>
      {movie.plot &&
        <Box sx={{ mb: theme.spacing(4) }}>
          <Typography component="p" color="secondary">{movie.plot}</Typography>
        </Box>}
    </>
  )
}

export default Plot;