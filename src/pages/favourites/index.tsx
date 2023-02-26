import React from 'react';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { ContentWrapper, PageWrapper, Section } from '../../features/components';
import DetailCard from '../../features/movie/DetailCard';
import Header from '../Header';
import Footer from '../Footer';

import { RootStoreStateType } from '../../app/store/store';
import { MovieDetails } from '../../app/types';


/**
 * Renders page with selected favourite movies
 */
const Favourites: React.FC = () => {
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <Section>
          <Typography component="h1" variant="h2">Favourite movies</Typography>
          <FavouritesList />
        </Section>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  )
}


const FavouritesList: React.FC = () => {
  const favouriteMovies = useSelector<RootStoreStateType, MovieDetails[]>((state) => state.local.favouriteMovies);
  return favouriteMovies.length > 0
    ? <Grid container spacing={2}>
      {favouriteMovies.map((movie, index) =>
        <Grid item key={`${index}-${movie.id}`} lg={4} md={6} sm={12}>
          <DetailCard movie={movie} />
        </Grid>
      )}
    </Grid>
    : <Typography>Your list is empty</Typography>
}


export default Favourites;