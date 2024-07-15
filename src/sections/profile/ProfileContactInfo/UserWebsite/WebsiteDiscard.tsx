import { Box, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArrowLeft, CloseCircle, Save2, TrushSquare } from 'iconsax-react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'src/redux/store';
import { addedSocialMedia, userSocialMediasSelector } from 'src/redux/slices/profile/socialMedia-slice';

import { addedEmail, userEmailsSelector } from 'src/redux/slices/profile/contactInfo-slice-eli';
import { AudienceEnum } from 'src/@types/sections/serverTypes';

import { useUpsertUserSocialMediaMutation } from 'src/_requests/graphql/profile/contactInfo/mutations/upsertUserSocialMedia.generated';
import { useSnackbar } from 'notistack';

export default function SocialLinkDiscardDialog() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const personSocialMedia = useSelector(userSocialMediasSelector);

  const [upsertUserSocialMedia] = useUpsertUserSocialMediaMutation();

  function handlerDiscardSocialLink() {
    dispatch(addedSocialMedia({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  }

  const handleSaveChangeSocialLink = async () => {
    const resData: any = await upsertUserSocialMedia({
      filter: {
        dto: {
          id: personSocialMedia?.id,
          userName: personSocialMedia?.userName,
          socialMediaId: personSocialMedia?.socialMediaDto?.id,
          audience: personSocialMedia?.audience,
        },
      },
    });

    if (resData.data?.upsertUserSocialMedia?.isSuccess) {
      router.push('/profile/contact-info');
      dispatch(addedSocialMedia({ audience: AudienceEnum.Public }));
    }
    if (!resData.data?.upsertUserSocialMedia?.isSuccess) {
      enqueueSnackbar(resData.data?.upsertUserSocialMedia?.messagingKey, { variant: 'error' });
    }
  };

  const handleBackRoute = () => {
    dispatch(addedEmail({ audience: AudienceEnum.Public }));
    dispatch(addedSocialMedia({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  };

  return (
    <Stack spacing={2} sx={{ py: 3 }}>
      <Stack direction="row" spacing={2} sx={{ px: 2 }} alignItems="center" justifyContent="space-between">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
            <ArrowLeft />
          </IconButton>
          <Typography variant="subtitle1" color="text.primary">
            Do you want to save changes?
          </Typography>
        </Box>

        <IconButton onClick={handleBackRoute}>
          <CloseCircle />
        </IconButton>
      </Stack>
      <Divider />
      <Stack spacing={2} sx={{ px: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer' }} onClick={handleSaveChangeSocialLink}>
          <Save2 fontSize="24" variant="Outline" />
          <Typography variant="body2" color="text.primary">
            Save Change
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer', maxWidth: 99 }} onClick={handlerDiscardSocialLink}>
          <TrushSquare size="24" color={theme.palette.error.main} variant="Outline" />
          <Typography variant="body2" color="error">
            Discard
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}
