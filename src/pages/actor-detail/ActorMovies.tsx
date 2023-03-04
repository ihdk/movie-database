import React, { useCallback, useContext, useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useGetActorCreditsQuery } from "../../app/store/moviesApiSlice";
import { LoadMore, Section, SectionTitle } from "../../features/components";
import { ActorContext } from "../../features/context";
import GridCard from "../../features/movie/GridCard";
import { __pl } from "../../app/helpers";

/**
 * Renders movies of actor
 */
const ActorMovies: React.FC = React.memo(() => {
  const actor = useContext(ActorContext);
  const { data: credits, isSuccess } = useGetActorCreditsQuery(actor.id);
  const perPage = 20;
  const [loadedMovies, setLoadedMovies] = useState(12);

  const nextLoad =
    isSuccess && credits.length > 0
      ? credits.length - loadedMovies >= perPage
        ? perPage
        : credits.length - loadedMovies
      : 0;

  const loadMoreMovies = useCallback(() => {
    setLoadedMovies(loadedMovies + perPage);
  }, [loadedMovies]);

  return isSuccess && credits.length > 0 ? (
    <Section spacing="large" darkBg>
      <SectionTitle variant="h2">
        Actor known in{" "}
        <Typography variant="inherit" component="span" color="primary.fancy">
          {credits.length} {__pl(["movie", "movies"], credits.length)}
        </Typography>
      </SectionTitle>
      <Grid container spacing={2}>
        {credits.slice(0, loadedMovies).map((movie) => (
          <Grid item key={movie.id} lg={2} md={3} sm={4} xs={6}>
            <GridCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      <LoadMore nextLoad={nextLoad} onLoadMore={loadMoreMovies} />
    </Section>
  ) : null;
});

export default ActorMovies;
