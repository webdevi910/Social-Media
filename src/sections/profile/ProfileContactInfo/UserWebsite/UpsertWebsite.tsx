import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Box,
  Button,
  Dialog,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
// Icons
import { ArrowLeft, CloseSquare } from 'iconsax-react';
// components
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PersonWebSiteType } from 'src/@types/sections/profile/userWebsite';
import { AudienceEnum } from 'src/@types/sections/serverTypes';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { userWebsiteSelector, websiteAdded } from 'src/redux/slices/profile/userWebsite-slice';
import { dispatch, useSelector } from 'src/redux/store';
// Queries and Mutations
import { useUpsertWebsiteMutation } from 'src/_requests/graphql/profile/contactInfo/mutations/upsertWebsite.generated';
import * as Yup from 'yup';

function AddWebsite() {
  const router = useRouter();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const userWebsite = useSelector(userWebsiteSelector);
  const [addPersonWebsite] = useUpsertWebsiteMutation();

  useEffect(() => {
    if (!userWebsite) router.push('/profile/contact-info');
  }, [userWebsite, router]);

  const WebsiteSchema = Yup.object().shape({
    webSiteUrl: Yup.string()
      .required('Please fill out this field.')
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Please use a valid website url'
      ),
  });

  const defaultValues = {
    id: userWebsite?.id,
    audience: userWebsite?.audience,
    webSiteUrl: userWebsite?.webSiteUrl || '',
  };

  const methods = useForm<PersonWebSiteType>({
    resolver: yupResolver(WebsiteSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    control,
    getValues,
    formState: { isValid },
  } = methods;

  const onSubmit = async (data: PersonWebSiteType) => {
    const resData: any = await addPersonWebsite({
      filter: {
        dto: {
          id: data.id,
          webSiteUrl: data.webSiteUrl,
          audience: data.audience,
        },
      },
    });

    if (resData?.data?.upsertWebSite?.isSuccess) {
      dispatch(
        websiteAdded({
          id: data.id,
          webSiteUrl: data.webSiteUrl,
          audience: data.audience,
        })
      );
      router.push('/profile/contact-info/');
      enqueueSnackbar('website successfully added', { variant: 'success' });
    }
  };

  const handleDialogDeleteWebsite = () => {
    router.push('/profile/confirm-delete-website');
  };

  const handleNavigation = (url: string) => {
    dispatch(websiteAdded(getValues()));
    router.push(url);
  };

  function closeHandler() {
    if (isValid) {
      handleNavigation('/profile/discard-saveChange');
    } else {
      dispatch(websiteAdded({ audience: AudienceEnum.Public }));
      router.push('/profile/contact-info');
    }
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ py: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ justifyContent: 'space-between', px: 2 }}>
            <Stack spacing={2} direction="row" alignItems="center">
              <IconButton sx={{ p: 0, mr: 1 }} onClick={() => router.back()}>
                <ArrowLeft />
              </IconButton>
              <Typography variant="subtitle1" color="text.primary">
                {userWebsite?.id ? 'Edit Website' : 'Add Website'}
              </Typography>
            </Stack>
            {/* <Link href="/profile/user" passHref> */}
            <IconButton onClick={closeHandler}>
              <CloseSquare variant="Outline" size="32" color={theme.palette.text.primary} />
            </IconButton>
            {/* </Link> */}
          </Stack>
          <Divider />
          <Stack spacing={2} sx={{ justifyContent: 'space-between', px: 2 }}>
            <Typography variant="subtitle1">Website</Typography>
            {!userWebsite?.id ? (
              <RHFTextField autoComplete="WebSiteUrl" type="text" name="webSiteUrl" placeholder="Website" />
            ) : (
              <Typography variant="body1">{userWebsite.webSiteUrl}</Typography>
            )}
          </Stack>
          <Divider />
          {!userWebsite?.id ? (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ justifyContent: 'space-between', px: 2 }}>
              <Controller
                name="audience"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ minWidth: 80 }}>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      sx={{ maxHeight: 40 }}
                    >
                      {Object.keys(AudienceEnum).map((_audience, i) => (
                        <MenuItem value={AudienceEnum[_audience as keyof typeof AudienceEnum]} key={i}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Typography>{_audience}</Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <Button type="submit" variant="contained">
                Add
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ px: 6 }}>
              {/* <Link href="/profile/delete-confirm" underline="none"> */}
              <Button variant="text" color="error" onClick={() => handleDialogDeleteWebsite()}>
                Delete
              </Button>
              {/* </Link> */}

              <Controller
                name="audience"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ minWidth: 80, ml: 4.5 }}>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={field.value}
                      onChange={
                        (e) => field.onChange(e.target.value)
                        // mutation edit
                      }
                      sx={{ maxHeight: 40 }}
                    >
                      {Object.keys(AudienceEnum).map((_audience, i) => (
                        <MenuItem value={AudienceEnum[_audience as keyof typeof AudienceEnum]} key={i}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Typography>{_audience}</Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Stack>
          )}
        </Stack>
      </FormProvider>
    </>
  );
}

export default AddWebsite;
