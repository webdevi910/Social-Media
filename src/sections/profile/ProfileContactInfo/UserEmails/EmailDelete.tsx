import { Box, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArrowLeft, CloseCircle, CloseSquare, Save2, TrushSquare } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'src/redux/store';
import { addedSocialMedia, userSocialMediasSelector } from 'src/redux/slices/profile/userSocialMedia-slice';
import { addedEmail, userEmailsSelector } from 'src/redux/slices/profile/userEmails-slice';
import { AudienceEnum } from 'src/@types/sections/serverTypes';
import { BottomSheet } from 'react-spring-bottom-sheet';

export default function EmailDeleteDialog() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);
  function handlerDiscardEmail() {
    dispatch(addedEmail({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  }

  const handleBackRoute = () => {
    dispatch(addedEmail({ audience: AudienceEnum.Public }));
    dispatch(addedSocialMedia({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  };

  return (
    <BottomSheet
        open={true}
        onDismiss={() => setOpenBottomSheet(false)}
        snapPoints={({ minHeight }) => [minHeight, minHeight]}
      >
      <Stack spacing={2} sx={{ py: 3 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2 }} alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              Are you sure to delete this Email?
            </Typography>
          </Box>

        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer' }}>
            <TrushSquare size="24" color={theme.palette.error.main} variant="Outline" />

            <Link href={'/profile/contact-info/user-emails/confirm-password-form'}>
              <Typography variant="body2" color="error">
                Delete Email
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer', maxWidth: 99 }}>
            <Save2 fontSize="24" variant="Outline" />

            <Typography variant="body2" color="text.primary" onClick={handlerDiscardEmail}>
              Discard
            </Typography>
          </Box>
        </Stack>
      </Stack>
      </BottomSheet>
  );
}