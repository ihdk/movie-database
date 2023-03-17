import React from "react";
import { Link } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import MovieGenres from "./MovieGenres";
import FavouriteButton from "./FavouriteButton";
import { MovieContext } from "../../app/context";
import { MovieDetails } from "../../app/types";
import { FancyButton, ImageWithOverlay, MovieScore } from "../components";

/**
 * Renders card with movie details
 */
const DetailCard: React.FC<{ movie: MovieDetails }> = React.memo(
  ({ movie }) => {
    const theme = useTheme();
    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
      : "";
    const backdrop = movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
      : poster;
    return (
      <MovieContext.Provider value={movie}>
        <Box
          className="movie-item detail-type"
          sx={{
            position: "relative",
            borderRadius: 1,
            overflow: "hidden",
            boxShadow: 3,
            background: theme.palette.background.defaultAlt,
          }}
        >
          <Link to={`/movie/${movie.id}`}>
            {poster && (
              <ImageWithOverlay
                image={backdrop}
                title={movie.title}
                color={theme.palette.background.defaultAlt}
              />
            )}

            <FavouriteButton size="large" floating />

            <Box sx={{ p: theme.spacing(2) }}>
              {poster ? (
                <Stack
                  spacing={2}
                  position="relative"
                  flexWrap="nowrap"
                  alignItems="flex-end"
                  sx={{
                    mb: theme.spacing(2),
                    mt: "-150px",
                  }}
                >
                  <Box
                    component="img"
                    height={200}
                    src={poster}
                    alt={movie.title}
                    sx={{ borderRadius: 1 }}
                  />
                  <Typography variant="h3" sx={{ mb: 0 }}>
                    {movie.title}
                  </Typography>
                </Stack>
              ) : (
                <Typography variant="h3" sx={{ mb: theme.spacing(2) }}>
                  {movie.title}
                </Typography>
              )}

              {movie.genre_ids && <MovieGenres genresIds={movie.genre_ids} />}

              <Divider sx={{ m: theme.spacing(2, 0) }} />

              <Stack spacing={1} justifyContent="space-between">
                <FancyButton variant="contained">Read more</FancyButton>
                {movie.vote_average > 0 && (
                  <MovieScore value={movie.vote_average * 10} />
                )}
              </Stack>
            </Box>
          </Link>
        </Box>
      </MovieContext.Provider>
    );
  }
);

export default DetailCard;
