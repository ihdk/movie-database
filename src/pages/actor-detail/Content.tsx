import React, { useContext } from 'react';
import dayjs from 'dayjs';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';

import { Section } from '../../features/components';
import { ActorContext } from '../../features/context';


/**
 * Renders actor content
*/
const Content: React.FC = React.memo(() => {
  const actor = useContext(ActorContext);
  return (
    <>
      <Section color="text.movieContent">
        <Grid container spacing={5}>
          {actor.profile_path &&
            <Grid item md={4} sm={5} xs={12}>
              <Poster />
            </Grid>
          }
          <Grid item md={8} sm={7} xs={12}>
            <Section spacing="none" component="div" disableGutters>
              <Title />
            </Section>

            <Section spacing="tiny" component="div" disableGutters>
              <DataLine />
            </Section>

            {actor.biography &&
              <Section spacing="tiny" component="div" disableGutters>
                <Typography variant="h3">Biography</Typography>
                <Typography sx={{ whiteSpace: "pre-line" }}>{actor.biography}</Typography>
              </Section>
            }

            {actor.popularity > 0 &&
              <Section spacing="tiny" component="div" disableGutters>
                <ActorPopularity value={actor.popularity} />
              </Section>
            }

          </Grid>
        </Grid >
      </Section>
    </>
  )
})

const Poster: React.FC = React.memo(() => {
  const actor = useContext(ActorContext);
  return (
    <Box textAlign="center" width="100%">
      <Box
        component="img"
        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
        alt={actor.name}
        boxShadow={5}
        sx={{ borderRadius: 1, maxWidth: "100%" }}
      />
    </Box>
  )
})


const Title: React.FC = React.memo(() => {
  const theme = useTheme();
  const actor = useContext(ActorContext);
  return (
    <>
      <Typography variant="h1" sx={{
        mt: actor.profile_path ? theme.spacing(6) : 0,
        mb: 0
      }}
      >{actor.name}</Typography>

      {actor.homepage && <Typography variant="subtitle2" component="a" href={actor.homepage} target="_blank" color={theme.palette.primary.fancy}>{actor.homepage}</Typography>}
    </>
  )
})


const DataLine: React.FC = React.memo(() => {
  const actor = useContext(ActorContext);
  return (
    <Stack
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
    >
      {actor.known_for_department && <Typography>{actor.known_for_department}</Typography>}

      {actor.place_of_birth && <Typography>{actor.place_of_birth}</Typography>}

      {actor.birthday && <Typography>Born {dayjs(actor.birthday).format('DD. MMM YYYY')}</Typography>}
      {actor.deathday && <Typography>Died in {dayjs(actor.deathday).format('DD. MMM YYYY')}</Typography>}
    </Stack >
  )
})

export const ActorPopularity: React.FC<{ value: number }> = React.memo(({ value }) => {
  return (
    <Stack spacing={1}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          value={value}
          variant="determinate"
          size={100}
          sx={{
            color: (theme) => theme.palette.primary.fancy,
            background: (theme) => theme.palette.background.light,
            borderRadius: "100%",
            padding: "5px",
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h3"
            component="div"
            color="text.primary"
            sx={{ m: 0 }}
          >{`${Math.round(value)}%`}</Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          variant="h4"
          component="div"
          textTransform="uppercase"
          sx={{ m: 0 }}
        >Popularity</Typography>
      </Box>
    </Stack>
  );
})

export default Content;