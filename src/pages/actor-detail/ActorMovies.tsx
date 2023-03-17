import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import Typography from "@mui/material/Typography";

import { useGetActorCreditsQuery } from "../../app/store/moviesApiSlice";
import {
  LoadMore,
  MoviesList,
  Section,
  SectionTitle,
} from "../../features/components";
import { ActorContext } from "../../app/context";
import { __pl } from "../../app/helpers";

/**
 * Renders movies related to actor
 */
const ActorMovies: React.FC = React.memo(() => {
  const actor = useContext(ActorContext);
  const perPage = useRef(20);
  const { data: credits, isSuccess } = useGetActorCreditsQuery(actor.id);
  const [loadedMovies, setLoadedMovies] = useState(12);

  const nextLoad = useMemo(
    () =>
      isSuccess && credits.length > 0
        ? credits.length - loadedMovies >= perPage.current
          ? perPage.current
          : credits.length - loadedMovies
        : 0,
    [credits?.length, isSuccess, loadedMovies]
  );

  const loadMoreMovies = useCallback(() => {
    setLoadedMovies(loadedMovies + perPage.current);
  }, [loadedMovies]);

  return isSuccess && credits.length > 0 ? (
    <Section spacing="large" darkBg>
      <SectionTitle variant="h2">
        Actor known in&nbsp;
        <Typography variant="inherit" component="span" color="primary.fancy">
          {credits.length} {__pl(["movie", "movies"], credits.length)}
        </Typography>
      </SectionTitle>

      <MoviesList movies={credits.slice(0, loadedMovies)} />

      <LoadMore nextLoad={nextLoad} onLoadMore={loadMoreMovies} />
    </Section>
  ) : null;
});

export default ActorMovies;
