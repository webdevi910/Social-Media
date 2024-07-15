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
} from '@mui/material';
import { ArrowDown, ArrowLeft, CloseCircle, CloseSquare, Eye, EyeSlash } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AudienceEnum, LocationTypeEnum, Location } from 'src/@types/sections/serverTypes';
import { Controller, useForm } from 'react-hook-form';
import { useGetLocationQuery } from 'src/_requests/graphql/profile/publicDetails/queries/getLocation.generated';
import { useDispatch, useSelector } from 'src/redux/store';
import { emptyLocation, userLocationSelector } from 'src/redux/slices/profile/userLocation-slice';
import { useUpsertLocationMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/addCurrentCity.generated';
import { FormProvider } from 'src/components/hook-form';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { BottomSheet } from 'react-spring-bottom-sheet';
import SearchCurrentCity from './SearchCurrentCity';

function UpsertCurrentCity() {
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);
  function onDismiss() {
    setOpenBottomSheet(false);
  }
  const dispatch = useDispatch();
  const userCity = useSelector(userLocationSelector);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const isEdit = !!userCity?.id;
  const { data, isFetching } = useGetLocationQuery({
    filter: {
      dto: {
        id: null,
        locationType: LocationTypeEnum.CurrnetCity,
      },
    },
  });

  const [upsertLocation, { isLoading }] = useUpsertLocationMutation();

  const onSubmit = async (data: Location) => {
    // console.log('data', data);
    const result: any = await upsertLocation({
      filter: {
        dto: {
          audience: data.audience,
          cityId: data.city?.id,
          id: data.id,
          locationType: LocationTypeEnum.CurrnetCity,
        },
      },
    });

    if (result?.data?.upsertLocation?.isSuccess) {
      enqueueSnackbar('Location successfully', { variant: 'success' });
      router.back();
      dispatch(emptyLocation({ audience: AudienceEnum.Public }));
    }
  };
  const defaultValues = {
    id: userCity?.id,
    audience: userCity?.audience,
    city: userCity?.city,
  };
  const methods = useForm<Location>({
    defaultValues,
    mode: 'onChange',
  });

  const {
    trigger,
    getValues,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = methods;

  const routerBack = () => {
    router.back();
    setTimeout(() => {
      dispatch(emptyLocation({ audience: AudienceEnum.Public }));
    }, 500);
  };
  const handelCloseDialog = () => {
    if ((userCity.city?.name && !getValues().id) || userCity.city?.name) {
      router.push('/profile/close-dialog-current-city');
    } else {
      router.push('/profile/public-details');
    }
  };

  useEffect(() => {
    if (!userCity) router.push('/profile/public-details');
  }, [userCity, router]);
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ py: 3 }}>
          <Stack direction="row" spacing={2} sx={{ px: 2 }} alignItems="center" justifyContent="space-between">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton sx={{ p: 0 }} onClick={routerBack}>
                <ArrowLeft />
              </IconButton>
              <Typography variant="subtitle1" color="text.primary">
                {isEdit ? 'Edit Current City' : 'Add Current City'}
              </Typography>
            </Box>
            <Box>
              <LoadingButton
                loading={isLoading}
                type="submit"
                color="primary"
                variant="contained"
                disabled={!userCity?.city?.name}
              >
                <Typography> {isEdit ? 'Save' : 'Add'}</Typography>
              </LoadingButton>
            </Box>
          </Stack>
          <Divider />
          <Stack spacing={2} sx={{ px: 2 }}>
            <Typography variant="subtitle1" color="text.primary">
              Current City
            </Typography>

            {/* <Link href="/profile/public-detail/search-current-city" passHref> */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ cursor: 'pointer' }}
              onClick={() => router.push('/profile/public-details/search-current-city')}
            >
              {userCity?.city?.name || 'Current City'}
            </Typography>
            {/* </Link> */}
          </Stack>
          <Divider />

          <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ px: 2 }}>
            <Box>
              {isEdit && (
                <Link href="/profile/confirm-delete-current-city" passHref>
                  <Button color="error">
                    <Typography variant="button">Delete</Typography>
                  </Button>
                </Link>
              )}
            </Box>

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
                        <MenuItem key={i} value={AudienceEnum[_audience]}>
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
        </Stack>
        {/* <BottomSheet open={openBottomSheet} snapPoints={({ minHeight }) => minHeight} onDismiss={onDismiss}>
          <SearchCurrentCity  />
        </BottomSheet> */}
      </FormProvider>
    </>
  );
}

export default UpsertCurrentCity;
