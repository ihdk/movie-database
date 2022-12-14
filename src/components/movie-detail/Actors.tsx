import useTheme from '@mui/material/styles/useTheme';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import PeopleIcon from '@mui/icons-material/People';

/**
 * Renders movie actors
 */
const Actors: React.FC<{ actors: string }> = ({ actors }) => {
  const theme = useTheme();

  return (
    <>
      {actors && <Stack direction="row" spacing={1} sx={{ mt: theme.spacing(1) }}>
        <PeopleIcon fontSize="small" />
        <Typography variant="body2">{actors}</Typography>
      </Stack>}
    </>
  )
}

export default Actors;