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
import { Section, FullscreenLoader } from "../../features/components";
import { MovieContext } from "../../app/context";
import { useDocumentTitle } from "../../app/helpers";

/**
 * Renders page with movie details
 */
const Movie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: movie,
    isFetching,
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
      {isFetching && <FullscreenLoader />}
      {isSuccess && movie && (
        <MovieContext.Provider value={movie}>
          {movie.backdrop_path && (
            <Cover
              image={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            />
          )}
          <Content />
          <SimilarMovies />
        </MovieContext.Provider>
      )}
    </>
  );
};

const Cover: React.FC<{ image: string }> = React.memo(({ image }) => {
  return (
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
  );
});

export default Movie;
