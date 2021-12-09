import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
