import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// next
import Link from 'next/link';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
// @mui
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  Dialog,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'src/redux/store';
import { useUpsertUserSocialMediaMutation } from 'src/_requests/graphql/profile/contactInfo/mutations/upsertUserSocialMedia.generated';
import { addedSocialMedia, userSocialMediasSelector } from 'src/redux/slices/profile/userSocialMedia-slice';
// components
import { ArrowLeft, CloseCircle, EyeSlash, Eye, ArrowDown2, Image } from 'iconsax-react';
import { AudienceEnum, SocialMedia } from 'src/@types/sections/serverTypes';
import { useSnackbar } from 'notistack';

import { useGetSocialMediasQuery } from 'src/_requests/graphql/profile/contactInfo/queries/getSocialMedias.generated';
import SocialLinkDelete from 'src/sections/profile/ProfileContactInfo/userSocialLinks/SocialLinkDelete';
import SocialLinkPlatform from 'src/sections/profile/ProfileContactInfo/userSocialLinks/SocialLinkPlatform';

type SocialMediaValueProps = {
  id?: string;
  socialMediaDto: SocialMedia;
  audience: AudienceEnum;
  userName: string;
};

function AddSocialLinkNewForm() {

  const { enqueueSnackbar } = useSnackbar();
  const [upsertUserSocialMedia, { isLoading }] = useUpsertUserSocialMediaMutation();
  const router = useRouter();
  const personSocialMedia = useSelector(userSocialMediasSelector);
  const theme = useTheme();
  const dispatch = useDispatch();

  const { data, isFetching } = useGetSocialMediasQuery({
    filter: {
      all: true,
    },
  });

  const handleSelectPlatform = (social: SocialMedia) => {
    dispatch(
      addedSocialMedia({
        ...personSocialMedia,
        socialMediaDto: social,
      })
    );
    router.back();
  };
  // useEffect(() => {
  //   if(!personSocialMedia) router.push('/profile/contact-info')
  // },[personSocialMedia, router]);

  const SocialLinkSchema = Yup.object().shape({
    userName: Yup.string().required('Please fill out this field.'),
  });

  const defaultValues = {
    id: personSocialMedia?.id,
    socialMediaDto: personSocialMedia?.socialMediaDto || undefined,
    audience: personSocialMedia?.audience || AudienceEnum.Public,
    userName: personSocialMedia?.userName || '',
  };

  const methods = useForm<SocialMediaValueProps>({
    mode: 'onChange',
    resolver: yupResolver(SocialLinkSchema),
    defaultValues,
  });
  const {
    control,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors, isDirty, isValid },
  } = methods;

  const handleNavigation = (url: string) => {
    dispatch(addedSocialMedia(getValues()));
    router.push(url);
  };

  const handlePlatformClick = () => {
    dispatch(addedSocialMedia(getValues()));
    router.push('/profile/contact-info/user-social-links/social-media-platform');
  };

  // useEffect(() => {
  //   trigger(['userName']);
  // }, []);
  // click on closeicon and go to Discard or profile
  function closeHandler() {
    const errorLength = Object.keys(errors).length;
    if (errorLength) {
      dispatch(addedSocialMedia({ audience: AudienceEnum.Public }));
      router.push('/profile/user');
    } else {
      handleNavigation('/profile/socialLink-discard-saveChange');
    }
  }

  const onSubmit = async (data: SocialMediaValueProps) => {
    const { id, userName, audience, socialMediaDto } = data;
    const resData: any = await upsertUserSocialMedia({
      filter: {
        dto: {
          id: id,
          userName: userName,
          socialMediaId: socialMediaDto?.id,
          audience: audience,
        },
      },
    });
    if (resData.data?.upsertUserSocialMedia?.isSuccess) {
      dispatch(
        addedSocialMedia({
          id: id,
          userName: userName,
          socialMediaDto: socialMediaDto,
          audience: audience,
        })
      );
      router.push('/profile/contact-info');
      dispatch(addedSocialMedia({ audience: AudienceEnum.Public }));
    }
    if (!resData.data?.upsertUserSocialMedia?.isSuccess) {
      enqueueSnackbar(resData.data?.upsertUserSocialMedia?.messagingKey, { variant: 'error' });
    }
  };
  const handleBackRoute = () => {
    dispatch(addedSocialMedia({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ justifyContent: 'space-between', p: 2 }}>
            <Typography variant="subtitle1" color="text.primary">
              <IconButton sx={{ p: 0, mr: 2 }} onClick={handleBackRoute}>
                <ArrowLeft />
              </IconButton>
              {!personSocialMedia?.id ? 'Add Social Link' : 'Edit Social Link'}
            </Typography>
            {!personSocialMedia?.id && (
              <LoadingButton
                type="submit"
                size="small"
                variant="contained"
                loading={isLoading}
                disabled={!isDirty || !isValid}
              >
                Add
              </LoadingButton>
            )}
          </Stack>

          {!personSocialMedia?.id ? (
            <Stack spacing={2} sx={{ px: 2 }}>
              <Typography variant="subtitle2" color="text.primary">
                Social Link
              </Typography>
              <Button
                fullWidth
                size="small"
                startIcon={<ArrowDown2 size="16" />}
                variant="contained"
                onClick={handlePlatformClick}
                // onClick={() => setOpenBottomSheet(true)}
              >
                <Typography variant="button">{personSocialMedia?.socialMediaDto?.title || 'Platform'}</Typography>
              </Button>
              <RHFTextField autoComplete="UserName" placeholder="Username" type="text" name="userName" size="small" />
            </Stack>
          ) : (
            <Stack spacing={2} sx={{ px: 2 }}>
              <Typography variant="subtitle2" color="text.primary">
                {personSocialMedia?.socialMediaDto?.title}
              </Typography>
              <Typography variant="body2" color="text.primary">
                {personSocialMedia?.userName}
              </Typography>
            </Stack>
          )}
          <Divider />
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              justifyContent: 'end',
              px: 2,
              ...(!!personSocialMedia?.id && {
                justifyContent: 'space-between !important',
              }),
            }}
          >
            {!!personSocialMedia?.id && (
              <Link href={'/profile/contact-info/user-social-links/social-link-delete'} passHref>
                <Button variant="text" color="error" sx={{ px: 6 }}>
                  Delete
                </Button>
              </Link>
            )}

            <Controller
              name="audience"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      upsertUserSocialMedia({
                        filter: {
                          dto: {
                            userName: personSocialMedia?.userName,
                            id: personSocialMedia?.id,
                            socialMediaId: personSocialMedia?.socialMediaDto?.id,
                            audience: e.target.value as AudienceEnum,
                          },
                        },
                      });
                    }}
                    sx={{ maxHeight: 40 }}
                    renderValue={(value) => (
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Eye />
                        <Typography variant="body2" color="text.primary">
                          {value}
                        </Typography>
                      </Stack>
                    )}
                  >
                    {Object.keys(AudienceEnum).map((_audience) => (
                      <MenuItem value={AudienceEnum[_audience as keyof typeof AudienceEnum]} key={_audience}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography>{_audience}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Stack>
        </Stack>
      </FormProvider>

      {/* {!personSocialMedia?.id ? <SocialLinkPlatform /> : <SocialLinkDelete />} */}
    </>
  );
}

export default AddSocialLinkNewForm;
