import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
// material
import { Box, Card, Typography, Stack } from '@mui/material';

export default function AppTotalInstalled() {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, background: 'rgb(138, 118, 49)', color: '#fff' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <PersonAddAltRoundedIcon sx={{ fontSize: '70px' }} />
        </Stack>

        <Typography variant="subtitle2" sx={{ fontSize: '23px' }}>
          Open Projects
        </Typography>
      </Box>
      <Typography sx={{ fontSize: '35px', marginTop: '-43px' }} variant="subtitle2">
        10
      </Typography>
    </Card>
  );
}
