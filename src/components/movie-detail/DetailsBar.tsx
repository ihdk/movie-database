import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import type { MovieType } from '../../assets/types';

/**
 * Renders bar with movie information
 */
const DetailsBar: React.FC<{ movie: MovieType }> = ({ movie }) => {
  const theme = useTheme();

  return (
    <>
      <Divider sx={{ m: theme.spacing(2, 0) }} />
      <Stack
        direction={{ xs: "row", sm: "row" }}
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
        sx={{
          alignItems: "center",
          [theme.breakpoints.down('sm')]: {
            flexWrap: "wrap",
            justifyContent: "center",
            '& > *': {
              pt: theme.spacing(1),
              pb: theme.spacing(1)
            }
          }
        }}
      >
        {movie.genre &&
          <Stack direction="row" spacing={1}>
            {movie.genre.split(",").map((g: string) => {
              return <Chip key={g.trim()} label={g.trim()} size="small" />
            })}
          </Stack>
        }
        {movie.language &&
          <Chip label={movie.language} size="small" />
        }
        {movie.runtime &&
          <Box sx={{ display: "flex" }}>
            <AccessTimeIcon fontSize="small" sx={{ mr: theme.spacing(1) }} />
            <Typography variant="body2" >{movie.runtime}</Typography>
          </Box>
        }
        {movie.year &&
          <Box sx={{ display: "flex" }}>
            <CalendarMonthIcon fontSize="small" sx={{ mr: theme.spacing(1) }} />
            <Typography variant="body2" >{movie.year}</Typography>
          </Box>
        }
      </Stack>
      <Divider sx={{ m: theme.spacing(2, 0) }} />
    </>
  )
}

export default DetailsBar;