import React from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

/**
 * Renders simple logo in header
 */
const Logo: React.FC = () => {
  return (
    <Box>
      <Link href="/" underline="none" color="inherit" >
        <Typography component="h1" variant="h4" sx={{ whiteSpace: 'nowrap', lineHeight: 1.5 }}>Movie Database</Typography>
      </Link>
    </Box>
  )
}

export default Logo;