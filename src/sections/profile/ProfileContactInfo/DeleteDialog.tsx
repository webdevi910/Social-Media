import { Box, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArrowLeft, CloseCircle, CloseSquare, Save2, TrushSquare } from 'iconsax-react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'src/redux/store';
import { addedSocialMedia, userSocialMediasSelector } from 'src/redux/slices/profile/userSocialMedia-slice';
import { useDeleteUserSocialMediaMutation } from 'src/_requests/graphql/profile/contactInfo/mutations/deleteUserSocialMedia.generated';
import { addedEmail, userEmailsSelector } from 'src/redux/slices/profile/userEmails-slice';
import { AudienceEnum } from 'src/@types/sections/serverTypes';
import { useSnackbar } from 'notistack';

function ConfirmDelete() {
  const router = useRouter();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const personSocialMedia = useSelector(userSocialMediasSelector);
  const personEmail = useSelector(userEmailsSelector);
  const [deleteUserSocialMedia] = useDeleteUserSocialMediaMutation();
  const dispatch = useDispatch();

  function handlerDiscardEmail() {
    dispatch(addedEmail({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  }
  function handlerDiscardSocialLink() {
    dispatch(addedSocialMedia({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  }
  const handleDeleteSocialLink = async () => {
    const resDataDelete: any = await deleteUserSocialMedia({
      filter: {
        dto: {
          id: personSocialMedia?.id,
        },
      },
    });

    if (resDataDelete?.data?.deleteUserSocialMedia?.isSuccess) {
      router.push('/profile/contact-info');
      dispatch(addedSocialMedia({ audience: AudienceEnum.Public }));
    }
    if (!resDataDelete?.data?.deleteUserSocialMedia?.isSuccess) {
      enqueueSnackbar(resDataDelete.data?.upsertUserSocialMedia?.messagingKey, { variant: 'error' });
    }
  };
  const handleBackRoute = () => {
    dispatch(addedEmail({ audience: AudienceEnum.Public }));
    dispatch(addedSocialMedia({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  };

  return (
    <Dialog fullWidth={true} open={true} keepMounted onClose={handleBackRoute}>
      <Stack spacing={2} sx={{ py: 3 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2 }} alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              {personSocialMedia?.id && 'Are you sure to delete this Socila Link?'}
              {personEmail?.id && 'Are you sure to delete this Email?'}
            </Typography>
          </Box>

          <IconButton onClick={handleBackRoute}>
            <CloseCircle />
          </IconButton>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer' }}>
            <TrushSquare size="24" color={theme.palette.error.main} variant="Outline" />
            {personSocialMedia?.id && (
              <Typography variant="body2" color="error" onClick={() => handleDeleteSocialLink()}>
                Delete Socila Link
              </Typography>
            )}
            {personEmail?.id && (
              <Link href={'/profile/confirm-password-form'}>
                <Typography variant="body2" color="error">
                  Delete Email
                </Typography>
              </Link>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer', maxWidth: 99 }}>
            <Save2 fontSize="24" variant="Outline" />
            {personSocialMedia?.id && (
              <Typography variant="body2" color="text.primary" onClick={handlerDiscardSocialLink}>
                Discard
              </Typography>
            )}
            {personEmail?.id && (
              <Typography variant="body2" color="text.primary" onClick={handlerDiscardEmail}>
                Discard
              </Typography>
            )}
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default ConfirmDelete;
