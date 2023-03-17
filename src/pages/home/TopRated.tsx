import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useTopRatedQuery } from "../../app/store/moviesApiSlice";
import { SectionTitle } from "../../features/components";
import DetailCard from "../../features/movie/DetailCard";

/**
 * Renders top rated movies
 */
const TopRated: React.FC = React.memo(() => {
  const { data: movies, isSuccess, isError } = useTopRatedQuery();
  return (
    <>
      <SectionTitle variant="h2">Top rated movies</SectionTitle>

      {isError && <Typography>Failed to load</Typography>}

      {isSuccess &&
        (movies.length > 0 ? (
          <Grid container spacing={2}>
            {movies.map((movie, index) => (
              <Grid item key={`${index}-${movie.id}`} lg={4} sm={6} xs={12}>
                <DetailCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>Not found movies</Typography>
        ))}
    </>
  );
});

export default TopRated;
