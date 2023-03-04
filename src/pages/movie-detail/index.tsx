import React from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Content from "./Content";
import SimilarMovies from "./SimilarMovies";
import {
  useGetMovieDetailsQuery,
  useMovieQueryError,
} from "../../app/store/moviesApiSlice";
import { Section } from "../../features/components";
import { MovieContext } from "../../features/context";
import { useDocumentTitle } from "../../app/helpers";

/**
 * Renders page with movie details
 */
const Movie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: movie,
    isSuccess,
    isError,
    error,
  } = useGetMovieDetailsQuery(id);
  useMovieQueryError(isError, error);
  useDocumentTitle(movie ? movie.title : "");

  return (
    <>
      {isError && (
        <Section>
          <Typography>Movie loading failed.</Typography>
        </Section>
      )}
      {isSuccess && movie && (
        <MovieContext.Provider value={movie}>
          <Cover
            image={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : ""
            }
          />
          <Content />
          <SimilarMovies />
        </MovieContext.Provider>
      )}
    </>
  );
};

const Cover: React.FC<{ image: string }> = React.memo(({ image }) => {
  return image ? (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        height: "120vh",
        width: "100%",
        backgroundImage: `url("${image}")`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        zIndex: -1,
        "&:after": {
          content: '""',
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          background: (theme) => theme.palette.background.overlayDark,
        },
      }}
    />
  ) : null;
});

export default Movie;
