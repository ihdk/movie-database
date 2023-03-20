import React, { useContext } from "react";

import Typography from "@mui/material/Typography";

import { useSimilarMoviesQuery } from "../../app/store/moviesApiSlice";
import { MoviesList, Section, SectionTitle } from "../../features/components";
import { MovieContext } from "../../app/context";

/**
 * Renders similar movies to already opened movie detail
 */
const SimilarMovies: React.FC = React.memo(() => {
  const movie = useContext(MovieContext);
  const { data: movies, isSuccess } = useSimilarMoviesQuery(movie.id);

  return isSuccess && movies.length > 0 ? (
    <Section spacing="large">
      <SectionTitle variant="h2">
        Something similar to&nbsp;
        <Typography variant="inherit" component="span" color="primary.fancy">
          {movie.title}
        </Typography>
      </SectionTitle>
      <MoviesList view="detail" movies={movies} />
    </Section>
  ) : null;
});

export default SimilarMovies;
