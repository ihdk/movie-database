import React, { useContext } from 'react';

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import FavouriteButton from '../FavouriteButton';

import MovieGenres from './MovieGenres';
import { FancyButton, ImageWithOverlay, MovieScore } from '../components';
import { MovieContext } from '../context';


const getPopupPosition = (cardRef: React.RefObject<HTMLDivElement>) => {
  if (cardRef.current) {
    const data = cardRef.current.getBoundingClientRect()
    const cardHalfWidth = data.width / 2;
    const leftOffset = data.x;
    const rightOffset = window.innerWidth - data.right;

    if (leftOffset < cardHalfWidth) {
      return "right"
    } else if (rightOffset < cardHalfWidth) {
      return "left"
    }

  }
  return "center"
}

/**
 * Renders card detail on hover
 */
const CardPopup: React.FC<{ opened: boolean, cardRef: React.RefObject<HTMLDivElement> }> = React.memo(({ opened, cardRef }) => {
  const theme = useTheme();
  const movie = useContext(MovieContext)
  const position = getPopupPosition(cardRef)
  const backdrop = movie.backdrop_path || movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path ? movie.backdrop_path : movie.poster_path}` : "";

  return (
    <Box
      className={`card-popup ${opened ? "is-opened" : ""}`}
      sx={{
        width: "200%",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        opacity: 0,
        transition: "opacity 0.4s",
        zIndex: 5,
        ...(opened && { opacity: 1 }),
        ...(!opened && { pointerEvents: "none" }),
        ...(position === "right" && { left: 0 }),
        ...(position === "left" && { right: 0 }),
        ...(position === "center" && { left: "-50%" }),
      }}>
      <Zoom in={opened} timeout={300}>
        <Box borderRadius={1} sx={{
          background: theme.palette.background.defaultAlt,
          boxShadow: 4,
          overflow: "hidden",
        }}>

          {backdrop && <ImageWithOverlay image={backdrop} title={movie.title} color={theme.palette.background.defaultAlt} />}

          <Box sx={{ p: theme.spacing(2) }}>
            <Stack spacing={1} flexWrap="nowrap" justifyContent="space-between" sx={{ pb: theme.spacing(1) }}>
              <Typography variant="h3" sx={{ m: 0 }}>{movie.title}</Typography>
              <FavouriteButton size="medium" />
            </Stack>

            <MovieGenres genresIds={movie.genre_ids} />
            <Divider sx={{ m: theme.spacing(2, 0) }} />

            <Stack spacing={1} justifyContent="space-between">
              <FancyButton variant="contained" >Read more</FancyButton>
              {movie.vote_average > 0 && <MovieScore value={movie.vote_average * 10} />}
            </Stack>
          </Box>

        </Box>
      </Zoom>
    </Box >
  )
})

export default CardPopup;