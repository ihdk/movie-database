import React, { useContext } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useSimilarMoviesQuery } from "../../app/store/moviesApiSlice";
import { Section, SectionTitle } from "../../features/components";
import { MovieContext } from "../../features/context";
import DetailCard from "../../features/movie/DetailCard";

/**
 * Renders similar movies to already opened movie detail
 */
const SimilarMovies: React.FC = React.memo(() => {
  const movie = useContext(MovieContext);
  const { data: movies, isSuccess } = useSimilarMoviesQuery(movie.id);

  return isSuccess && movies.length > 0 ? (
    <Section spacing="large">
      <SectionTitle variant="h2">
        Something similar to{" "}
        <Typography variant="inherit" component="span" color="primary.fancy">
          {movie.title}
        </Typography>
      </SectionTitle>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item key={movie.id} lg={4} sm={6} xs={12}>
            <DetailCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Section>
  ) : null;
});

export default SimilarMovies;
