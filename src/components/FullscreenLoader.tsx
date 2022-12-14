import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * Renders fullscreen loader icon
 */
const FullscreenLoader: React.FC = () => {
  return (
    <Box sx={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}><CircularProgress /></Box>
  )
}

export default FullscreenLoader;