import React, { } from 'react';

import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TheatersIcon from '@mui/icons-material/Theaters';

import { __pl } from '../assets/helpers';

import type { MovieType } from '../assets/types';

/**
 * Renders placeholder of missing movie image 
 */
const MissingImagePlaceholder: React.FC<{ movie?: MovieType }> = ({ movie }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {movie && <Typography align="center" color="secondary" variant="h6" sx={{ p: theme.spacing(2, 1) }}>{movie.title}</Typography>}
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <TheatersIcon sx={{ opacity: 0.10, fontSize: "10rem" }} />
      </Box>
    </Box >
  )
}

export default MissingImagePlaceholder;