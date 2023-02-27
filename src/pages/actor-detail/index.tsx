import React from 'react';
import { useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';

import Content from './Content';
import ActorMovies from './ActorMovies';
import Header from '../Header';
import Footer from '../Footer';
import { useGetActorDetailsQuery, useMovieQueryError } from '../../app/store/moviesApiSlice';
import { ContentWrapper, PageWrapper, Section } from '../../features/components';
import { ActorContext } from '../../features/context';


/**
 * Renders page with movie details
 */
const Actor: React.FC = React.memo(() => {
  const { id } = useParams<{ id: string }>();
  const { data: actor, isSuccess, isError, error } = useGetActorDetailsQuery(id)
  useMovieQueryError(isError, error);

  return (
    <PageWrapper >
      <Header />
      <ContentWrapper>
        {isError &&
          <Section>
            <Typography>Actor loading failed.</Typography>
          </Section>
        }
        {(isSuccess && actor) &&
          <ActorContext.Provider value={actor}>
            <Content />
            <ActorMovies />
          </ActorContext.Provider>
        }
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  )
})

export default Actor