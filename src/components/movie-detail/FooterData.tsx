import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import type { MovieType } from '../../assets/types';

/**
 * Renders movie footer data
 */
const FooterData: React.FC<{ movie: MovieType }> = ({ movie }) => {
  return (
    <>
      {(movie.writer || movie.director) &&
        <Table sx={{ width: "auto", }}>
          <TableBody>
            {movie.writer && <TableRow>
              <TableCell size="small">Writer: </TableCell>
              <TableCell size="small">{movie.writer}</TableCell>
            </TableRow>}
            {movie.director && <TableRow>
              <TableCell size="small">Director: </TableCell>
              <TableCell size="small">{movie.director}</TableCell>
            </TableRow>}
          </TableBody>
        </Table>
      }
    </>
  )
}

export default FooterData;