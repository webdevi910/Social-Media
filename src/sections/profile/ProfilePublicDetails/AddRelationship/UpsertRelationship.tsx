import {
  Autocomplete,
  Box,
  Dialog,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import { ArrowDown2, ArrowLeft, CloseCircle, CloseSquare, Eye, EyeSlash } from 'iconsax-react';
import React, { useEffect } from 'react';
import Select from '@mui/material/Select';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { dispatch, useSelector } from 'src/redux/store';
import { userRelationShipSelector, userRelationShipUpdate } from 'src/redux/slices/profile/userRelationShip-slice';
import { useGetRelationshipQuery } from 'src/_requests/graphql/profile/publicDetails/queries/getRelationship.generated';
import { FormProvider } from 'src/components/hook-form';
import { Controller, useForm } from 'react-hook-form';
import { AudienceEnum, LocationTypeEnum, Location, Relationship } from 'src/@types/sections/serverTypes';
import { useUpdateRelationshipMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/updateRelationship.generated';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

function UpsertRelationship() {
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  const relationShip = useSelector(userRelationShipSelector);
  const isEdit = !!relationShip?.personId;
  // const { data: getRelationship, isFetching: loadingGetRelationship } = useGetRelationshipQuery({
  //   filter: {
  //     all: true,
  //   },
  // });

  const [updateRelationship, { isLoading }] = useUpdateRelationshipMutation();
  const onSubmit = async (data: Relationship) => {
    // console.log('data', data);
    const resData: any = await updateRelationship({
      filter: {
        dto: {
          audience: data.audience,
          relationshipStatusId: data.relationshipStatus?.id,
        },
      },
    });

    if (resData?.data?.updateRelationship?.isSuccess) {
      dispatch(
        userRelationShipUpdate({
          audience: data.audience,
          relationshipStatus: data.relationshipStatus,
        })
      );
      enqueueSnackbar('Relationship successfully', { variant: 'success' });

      router.push('/profile/public-details');
    }
  };

  const defaultValues = {
    personId: relationShip?.personId,
    audience: relationShip?.audience,
    relationshipStatus: relationShip?.relationshipStatus,
  };
  const methods = useForm<Relationship>({
    defaultValues,
    mode: 'onChange',
  });

  const {
    getValues,
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = methods;

  const handleClose = () => {
    if ((relationShip?.relationshipStatus?.title && !getValues().personId) || relationShip?.relationshipStatus?.title) {
      router.push('/profile/close-dialog-relationship');
    } else {
      dispatch(userRelationShipUpdate({ audience: AudienceEnum.Public }));
      router.push('/profile/public-details');
    }
  };
  const router = useRouter();

  // useEffect(() => {
  //   if (!relationShip) router.push('/profile/public-details');
  // }, [relationShip, router]);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ py: 3 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2 }} alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>

            <Typography variant="subtitle1" color="text.primary">
              {isEdit ? 'Edit Relationship Status' : ' Set Relationship Status'}
            </Typography>
          </Box>
          <Box>
            <LoadingButton
              loading={isLoading}
              type="submit"
              color="primary"
              variant="contained"
              disabled={!relationShip?.relationshipStatus?.title}
            >
              <Typography> {isEdit ? 'Save' : 'Add'}</Typography>
            </LoadingButton>
          </Box>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <Typography variant="subtitle1" color="text.primary">
            Relationship status
          </Typography>

          <Link href="/profile/relationship-status" passHref>
            <Button
              color="inherit"
              size="large"
              variant="outlined"
              sx={{ borderColor: 'text.disabled' }}
              endIcon={<ArrowDown2 size="16" color={theme.palette.text.primary} />}
            >
              <Typography color="text.primary" variant="button">
                {relationShip?.relationshipStatus?.title}
              </Typography>
            </Button>
          </Link>
        </Stack>
        <Divider />
        {isEdit ? (
          <Stack direction="row" spacing={2} sx={{ px: 2, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex' }}>
              <Link href="/profile/confirm-delete-relationship" passHref>
                <Button color="error">
                  <Typography variant="button">Delete</Typography>
                </Button>
              </Link>
              <Box>
                <Controller
                  name="audience"
                  control={control}
                  render={({ field }) => (
                    <FormControl sx={{ minWidth: 80 }}>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        sx={{ maxHeight: 40 }}
                      >
                        {Object.keys(AudienceEnum).map((_audience, i) => (
                          <MenuItem key={i} value={AudienceEnum[_audience as keyof typeof AudienceEnum]}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography>{_audience}</Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
            </Box>

            <Box>
              <LoadingButton
                loading={isLoading}
                type="submit"
                color="primary"
                variant="contained"
                disabled={!relationShip?.relationshipStatus?.title}
              >
                <Typography variant="button">Save</Typography>
              </LoadingButton>
            </Box>
          </Stack>
        ) : (
          <Stack direction="row" spacing={2} sx={{ px: 2, justifyContent: 'space-between' }}>
            <Box>
              <Controller
                name="audience"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ minWidth: 80 }}>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      sx={{ maxHeight: 40 }}
                    >
                      {Object.keys(AudienceEnum).map((_audience, i) => (
                        <MenuItem key={i} value={AudienceEnum[_audience as keyof typeof AudienceEnum]}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography>{_audience}</Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Box>
          </Stack>
        )}
      </Stack>
    </FormProvider>
  );
}

export default UpsertRelationship;
