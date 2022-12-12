import React from 'react';

import useTheme from '@mui/material/styles/useTheme';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Header from '../Header';

/**
 * Renders Nothing found page
 */
const NothingFound: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ textAlign: "center" }}>
        <Typography component="h1" variant="h4" sx={{ mb: theme.spacing(4) }} >Oops! That page can’t be found.</Typography>
        <Button href="/" sx={{ background: theme.palette.background.fancy }}>Go back to search</Button>
      </Container>
    </>
  )
}

export default NothingFound;