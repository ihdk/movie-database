import React from 'react';

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { ContentWrapper, FancyButton, PageWrapper, Section } from '../../features/components';
import Footer from '../Footer';
import Header from '../Header';


/**
 * Renders 404 page
 */
const NothingFound: React.FC = () => {
  const theme = useTheme();
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper sx={{ textAlign: "center" }}>
        <Section spacing='large'>
          <Typography component="h1" variant="h4" sx={{ mb: theme.spacing(4) }} >Oops! That page can’t be found.</Typography>
          <FancyButton href="/" size='large'>Go back to home</FancyButton>
        </Section>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  )
}

export default NothingFound;