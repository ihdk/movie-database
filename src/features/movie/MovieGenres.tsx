import React from 'react';

import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { useGetGenresQuery } from '../../app/store/moviesApiSlice';


/**
 * Renders movie genres
 */
const MovieGenres: React.FC<{ genresIds: number[], isMovieContent?: boolean }> = React.memo(({ genresIds, isMovieContent = false }) => {
  const theme = useTheme()
  const { data: genresData, isSuccess } = useGetGenresQuery()
  return (isSuccess && genresData)
    ? (
      <Stack spacing={0.5}>
        {
          genresData && genresIds.map(genreId =>
            <Box key={genresData[genreId]} sx={{ p: theme.spacing(0.5, 0) }}>
              <Chip label={genresData[genreId]} size="small" sx={{ ...(isMovieContent && { color: theme.palette.text.movieContent }) }} />
            </Box>
          )
        }
      </Stack>
    )
    : null
})

export default MovieGenres;