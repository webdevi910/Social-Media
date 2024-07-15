import { Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { CloseSquare } from 'iconsax-react';
import { useRouter } from 'next/router';

function MainProfileEditDialog() {
  const theme = useTheme();
  const router = useRouter()
  return (
    <Dialog fullWidth maxWidth="sm" open>
      <Stack sx={{ mb: 2, px: 2, pt: 3 }} direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1">ٍEdit Profile</Typography>
        <Stack direction="row" spacing={2}>
          <IconButton sx={{ padding: 0 }} onClick={() => router.push('/profile/user')}>
            <CloseSquare color={theme.palette.text.primary} />
          </IconButton>
        </Stack>
      </Stack>
      <Divider />
    </Dialog>
  );
}

export default MainProfileEditDialog;
