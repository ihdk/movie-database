import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

/**
 * Renders simple logo in header
 */
const Logo: React.FC = () => {
  const theme = useTheme();
  return (
    <Box className="logo">
      <Link href="/" underline="none" color="inherit" >
        <Typography component="div" variant="h4" sx={{
          whiteSpace: 'nowrap', 
          lineHeight: 1.5,
          background: theme.palette.background.fancy,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>Movie Database</Typography>
      </Link>
    </Box>
  )
}

export default Logo;