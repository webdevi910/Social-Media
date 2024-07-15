import { IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArrowLeft } from 'iconsax-react';
import React from 'react';
import ContactInfoMain from 'src/sections/profile/ProfileContactInfo/ContactInfoMain';
import { useRouter } from 'next/router';
export default function ContactInfoMainForm() {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2 }}>
        <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
          <ArrowLeft color={theme.palette.text.secondary} />
        </IconButton>
        <Typography variant="subtitle1" color="text.primary">
          Contact Info
        </Typography>
      </Stack>
      <ContactInfoMain />
    </Stack>
  );
}
