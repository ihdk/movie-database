import React from "react";

import Typography from "@mui/material/Typography";

import { useTopRatedQuery } from "../../app/store/moviesApiSlice";
import { MoviesList, SectionTitle } from "../../features/components";

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
          <MoviesList view="detail" movies={movies} />
        ) : (
          <Typography>Not found movies</Typography>
        ))}
    </>
  );
});

export default TopRated;
