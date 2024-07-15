import { Box, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArrowLeft, CloseCircle, Save2, TrushSquare } from 'iconsax-react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'src/redux/store';
import { addedSocialMedia, userSocialMediasSelector } from 'src/redux/slices/profile/socialMedia-slice';
import { phoneNumberAdded, userPhoneNumberSelector } from 'src/redux/slices/profile/userPhoneNumber-slice';
import { websiteAdded, userWebsiteSelector } from 'src/redux/slices/profile/userWebsite-slice';
import { addedEmail, userEmailsSelector } from 'src/redux/slices/profile/contactInfo-slice-eli';
import { AudienceEnum } from 'src/@types/sections/serverTypes';
import { useUpsertWebsiteMutation } from 'src/_requests/graphql/profile/contactInfo/mutations/upsertWebsite.generated';
import { useUpsertPhoneNumberMutation } from 'src/_requests/graphql/profile/contactInfo/mutations/upsertPhoneNumber.generated';
import { useUpsertUserSocialMediaMutation } from 'src/_requests/graphql/profile/contactInfo/mutations/upsertUserSocialMedia.generated';
import { useSnackbar } from 'notistack';
import { useUpsertUserEmailMutation } from 'src/_requests/graphql/profile/contactInfo/mutations/upsertUserEmail.generated';

function DiscardDialog() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const userPhoneNumber = useSelector(userPhoneNumberSelector);
  const personSocialMedia = useSelector(userSocialMediasSelector);
  const personEmail = useSelector(userEmailsSelector);
  const personWebsite = useSelector(userWebsiteSelector);
  const [upsertUserPhoneNumber] = useUpsertPhoneNumberMutation();
  const [upsertUserWebsite] = useUpsertWebsiteMutation();
  const [upsertUserSocialMedia] = useUpsertUserSocialMediaMutation();
  const [upsertUserEmail] = useUpsertUserEmailMutation();

  function handlerDiscardEmail() {
    dispatch(addedEmail({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  }
  function handlerDiscardPhoneNumber() {
    dispatch(phoneNumberAdded({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  }
  function handlerDiscardSocialLink() {
    dispatch(addedSocialMedia({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  }
  function handlerDiscardWebsite() {
    dispatch(websiteAdded({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  }
  const handleSaveChangeEmail = async () => {
    const resData: any = await upsertUserEmail({
      filter: {
        dto: {
          id: personEmail?.id,
          email: personEmail?.email,
          audience: personEmail?.audience,
        },
      },
    });

    if (resData.data?.upsertUserEmail?.isSuccess) {
      router.push('/profile/contact-info');
      dispatch(addedEmail({ audience: AudienceEnum.Public }));
    }
    if (!resData.data?.upsertUserEmail?.isSuccess) {
      enqueueSnackbar(resData.data?.upsertUserEmail?.messagingKey, { variant: 'error' });
    }
  };

  const handleSaveChangePhoneNumber = async () => {
    const resData: any = await upsertUserPhoneNumber({
      filter: {
        dto: {
          id: userPhoneNumber?.id,
          phoneNumber: userPhoneNumber?.phoneNumber,
          audience: userPhoneNumber?.audience,
        },
      },
    });

    if (resData.data?.upsertUserPhoneNumber?.isSuccess) {
      router.push('/profile/contact-info');
      dispatch(phoneNumberAdded({ audience: AudienceEnum.Public }));
    }
    if (!resData.data?.upsertUserPhoneNumber?.isSuccess) {
      enqueueSnackbar(resData.data?.upsertUserPhoneNumber?.messagingKey, { variant: 'error' });
    }
  };

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

  const handleSaveChangeWebsite = async () => {
    const resData: any = await upsertUserWebsite({
      filter: {
        dto: {
          id: personWebsite?.id,
          webSiteUrl: personWebsite?.webSiteUrl,
          audience: personWebsite?.audience,
        },
      },
    });

    if (resData.data?.upsertUserWebsite?.isSuccess) {
      router.push('/profile/contact-info');
      dispatch(websiteAdded({ audience: AudienceEnum.Public }));
    }
    if (!resData.data?.upsertUserWebsite?.isSuccess) {
      enqueueSnackbar(resData.data?.upsertUserWebsite?.messagingKey, { variant: 'error' });
    }
  };

  const handleBackRoute = () => {
    dispatch(addedEmail({ audience: AudienceEnum.Public }));
    dispatch(addedSocialMedia({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  };

  const handleBackRouteWebsite = () => {
    dispatch(websiteAdded({ audience: AudienceEnum.Public }));
    router.back();
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
              Do you want to save changes?
            </Typography>
          </Box>

          <IconButton onClick={handleBackRoute}>
            <CloseCircle />
          </IconButton>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          {personEmail?.id && (
            <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer' }} onClick={handleSaveChangeEmail}>
              <Save2 fontSize="24" variant="Outline" />
              <Typography variant="body2" color="text.primary">
                Save Change
              </Typography>
            </Box>
          )}

          {personSocialMedia?.userName && (
            <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer' }} onClick={handleSaveChangeSocialLink}>
              <Save2 fontSize="24" variant="Outline" />
              <Typography variant="body2" color="text.primary">
                Save Change
              </Typography>
            </Box>
          )}

          {personEmail?.id && (
            <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer', maxWidth: 99 }} onClick={handlerDiscardEmail}>
              <TrushSquare size="24" color={theme.palette.error.main} variant="Outline" />
              <Typography variant="body2" color="error">
                Discard
              </Typography>
            </Box>
          )}
          {personSocialMedia?.userName && (
            <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer', maxWidth: 99 }} onClick={handlerDiscardSocialLink}>
              <TrushSquare size="24" color={theme.palette.error.main} variant="Outline" />
              <Typography variant="body2" color="error">
                Discard
              </Typography>
            </Box>
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default DiscardDialog;
