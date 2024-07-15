import { Box, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArrowLeft, CloseCircle, Save2, TrushSquare } from 'iconsax-react';
import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'src/redux/store';
import { phoneNumberAdded, userPhoneNumberSelector } from 'src/redux/slices/profile/userPhoneNumber-slice';
import { websiteAdded, userWebsiteSelector } from 'src/redux/slices/profile/userWebsite-slice';
import { AudienceEnum } from 'src/@types/sections/serverTypes';
import { useUpsertWebsiteMutation } from 'src/_requests/graphql/profile/contactInfo/mutations/upsertWebsite.generated';
import { useUpsertPhoneNumberMutation } from 'src/_requests/graphql/profile/contactInfo/mutations/upsertPhoneNumber.generated';
import { useSnackbar } from 'notistack';

function Discard() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const userPhoneNumber = useSelector(userPhoneNumberSelector);
  const personWebsite = useSelector(userWebsiteSelector);
  const [upsertUserPhoneNumber] = useUpsertPhoneNumberMutation();
  const [upsertUserWebsite] = useUpsertWebsiteMutation();

  function handlerDiscardPhoneNumber() {
    dispatch(phoneNumberAdded({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  }

  function handlerDiscardWebsite() {
    dispatch(websiteAdded({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  }

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
      // console.log('messagingKey', resData.data?.upsertUserEmail?.messagingKey);
      enqueueSnackbar(resData.data?.upsertUserPhoneNumber?.messagingKey, { variant: 'error' });
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

    if (resData.data?.upsertWebSite?.isSuccess) {
      router.push('/profile/contact-info');
      dispatch(websiteAdded({ audience: AudienceEnum.Public }));
    }
    if (!resData.data?.upsertWebSite?.isSuccess) {
      // console.log('messagingKey', resData.data?.upsertUserSocialMedia?.messagingKey);
      enqueueSnackbar(resData.data?.upsertWebSite?.messagingKey, { variant: 'error' });
    }
  };

  const handleBackRoute = () => {
    dispatch(websiteAdded({ audience: AudienceEnum.Public }));
    router.back();
  };

  return (
    <Dialog fullWidth={true} open={true} keepMounted onClose={handleBackRoute}>
      <Stack spacing={2} sx={{ py: 3 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2 }} alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ p: 0 }} onClick={handleBackRoute}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              Do you want to save changes?
            </Typography>
          </Box>

          <IconButton>
            <CloseCircle />
          </IconButton>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          {userPhoneNumber?.id && (
            <>
              <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer' }} onClick={handleSaveChangePhoneNumber}>
                <Save2 fontSize="24" variant="Outline" />
                <Typography variant="body2" color="text.primary">
                  Save Change
                </Typography>
              </Box>
              <Box
                sx={{ display: 'flex', gap: 2, cursor: 'pointer', maxWidth: 99 }}
                onClick={handlerDiscardPhoneNumber}
              >
                <TrushSquare size="24" color={theme.palette.error.main} variant="Outline" />
                <Typography variant="body2" color="error">
                  Discard
                </Typography>
              </Box>
            </>
          )}

          {personWebsite?.webSiteUrl && (
            <>
              <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer' }} onClick={handleSaveChangeWebsite}>
                <Save2 fontSize="24" variant="Outline" />
                <Typography variant="body2" color="text.primary">
                  Save Change
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer', maxWidth: 99 }} onClick={handlerDiscardWebsite}>
                <TrushSquare size="24" color={theme.palette.error.main} variant="Outline" />
                <Typography variant="body2" color="error">
                  Discard
                </Typography>
              </Box>
            </>
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default Discard;
