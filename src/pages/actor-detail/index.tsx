import React from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Content from './Content';
import ActorMovies from './ActorMovies';
import Header from '../Header';
import Footer from '../Footer';
import { useGetActorDetailsQuery, useMovieQueryError } from '../../app/store/moviesApiSlice';
import { ContentWrapper, PageWrapper, Section } from '../../features/components';
import { ActorContext, MovieContext } from '../../features/context';


/**
 * Renders page with movie details
 */
const Actor: React.FC = React.memo(() => {
  const { id } = useParams<{ id: string }>();
  const { data: actor, isSuccess, isError, error } = useGetActorDetailsQuery(id)
  useMovieQueryError(isError, error);
  console.log(actor)

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


const Cover: React.FC<{ image: string }> = React.memo(({ image }) => {
  return image
    ? <Box sx={{
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
        background: (theme) => theme.palette.background.overlayDark
      }
    }} />
    : null
})


export default Actor