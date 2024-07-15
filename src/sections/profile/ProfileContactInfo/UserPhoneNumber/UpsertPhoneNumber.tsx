import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Link from 'next/link';
import { dispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { UserPhoneNumberType } from 'src/@types/sections/profile/userPhoneNumber';
import { userPhoneNumberSelector, phoneNumberAdded } from 'src/redux/slices/profile/userPhoneNumber-slice';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber, getCountryCallingCode } from 'react-phone-number-input';
import { useSnackbar } from 'notistack';

// Queries and Mutations
import { useUpsertPhoneNumberMutation } from 'src/_requests/graphql/profile/contactInfo/mutations/upsertPhoneNumber.generated';

// @mui
import {
  Dialog,
  Stack,
  Typography,
  Divider,
  Box,
  Button,
  useTheme,
  IconButton,
  Select,
  FormControl,
  MenuItem,
  styled,
} from '@mui/material';
import AutoComplete from '../../../../components/AutoComplete';
import { ArrowLeft, ArrowDown, CloseSquare } from 'iconsax-react';
import { LoadingButton } from '@mui/lab';

// components
import { useRouter } from 'next/router';
import { FormProvider } from 'src/components/hook-form';
import { AudienceEnum } from 'src/@types/sections/serverTypes';

const ParentPhoneInputStyle = styled(Stack)(({ theme }) => ({
  //   border: ({ isError }) => (isError ? `1px solid ${error.main}` : `1px solid ${neutral[200]}`),
  justifyContent: 'space-between',
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingBottom: 95,
  display: 'flex',
  //   alignItems: 'center',
  height: 40,
  position: 'relative',
  borderRadius: 8,
  '&:focus-within': {
    // border: ({ isError }) => (isError ? `2px solid ${error.main}` : `2px solid ${primary[900]}`),
  },
  '& .PhoneInput': {
    width: '100%',
    border: '2px solid #129793',
    borderRadius: 5,

    '& > input': {
      ...theme.typography.body1,
      color: '#354752',
      fontWeight: 400,
    },

    '& .PhoneInputCountrySelect.Mui-focused': {
      opacity: 1,
      zIndex: 4,
      '& .MuiInputBase-root.MuiOutlinedInput-root': {
        // backgroundColor: surface.default,
        paddingLeft: theme.spacing(6.5),
        '& fieldset': {
          border: 'unset',
        },
      },
    },
    '& .PhoneInputCountryIcon--border': {
      boxShadow: 'unset',
      marginLeft: 10,
      marginRight: 10,
      '& > img': {
        borderRadius: 2,
      },
    },
  },
  '& input': {
    border: 'unset',
    zIndex: 3,
    width: '100%',
    height: 40,
  },
  '& .arrow-select': {
    marginRight: 10,
  },
  '& .PhoneInputCountryIcon': {
    borderRadius: 4,
  },
}));

function AddPhoneNumber() {
  const router = useRouter();
  const theme = useTheme();
  const userPhoneNumber = useSelector(userPhoneNumberSelector);
  const [addUserPhoneNumber, { isLoading }] = useUpsertPhoneNumberMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [isTrue, setIsTrue] = useState(false);

  useEffect(() => {
    if (!userPhoneNumber) router.push('/profile/contact-info');
  }, [userPhoneNumber, router]);

  const PhoneNumberSchema = Yup.object().shape({
    phoneNumber: Yup.string().test('validateUsername', 'invalid phone number', function (value: any) {
      const isValidPhone = isValidPhoneNumber(value || '');
      if (!isValidPhone || value?.length < 10) {
        return false;
      }
      return true;
    }),
  });

  const defaultValues = {
    id: userPhoneNumber?.id,
    audience: userPhoneNumber?.audience,
    phoneNumber: userPhoneNumber?.phoneNumber || '',
    status: userPhoneNumber?.status,
    verificationCode: userPhoneNumber?.verificationCode,
  };

  const methods = useForm<UserPhoneNumberType>({
    resolver: yupResolver(PhoneNumberSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: {},
  } = methods;

  const onSubmit = async (data: UserPhoneNumberType) => {
    const { id, phoneNumber, audience, status } = data;

    const resData: any = await addUserPhoneNumber({
      filter: {
        dto: {
          id: id,
          phoneNumber: phoneNumber,
          audience: audience,
        },
      },
    });

    if (resData.data?.upsertPhoneNumber?.isSuccess) {
      dispatch(
        phoneNumberAdded({
          status,
          id,
          phoneNumber,
          audience,
          verificationCode: resData.data?.upsertPhoneNumber?.listDto?.items?.[0].verificationCode,
        })
      );
      router.push('/profile/verify');
    } else {
      enqueueSnackbar(resData.data?.upsertUserEmail?.messagingKey, { variant: 'error' });
    }
  };

  const handleDialogDeletePhoneNumber = () => {
    router.push('/profile/contact-info/confirm-delete');
  };

  const handleNavigation = (url: string) => {
    dispatch(phoneNumberAdded(getValues()));
    router.push(url);
  };

  function closeHandler() {
    if (userPhoneNumber?.id) {
      // console.log('show Discard');
      handleNavigation('/profile/discard-saveChange');
    } else {
      dispatch(phoneNumberAdded({ audience: AudienceEnum.Public }));
      router.push('/profile/contact-info');
    }
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ py: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ px: 2 }}>
            <Typography variant="subtitle1" color="text.primary">
              <IconButton sx={{ p: 0, mr: 2 }} onClick={() => router.back()}>
                <ArrowLeft />
              </IconButton>
              {!userPhoneNumber?.id ? 'Add Phone Number' : 'Edit Phone Number'}
            </Typography>
            {!userPhoneNumber?.id && (
              <LoadingButton type="submit" size="small" variant="contained" loading={isLoading} disabled={!isTrue}>
                Add
              </LoadingButton>
            )}
          </Stack>
          <ParentPhoneInputStyle spacing={2}>
            <Stack sx={{ mt: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Phone Number
              </Typography>
              {!userPhoneNumber?.id ? (
                <>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        className="classes.number"
                        placeholder="phone number"
                        autoComplete="phoneNumber"
                        value={field.value as string}
                        defaultCountry="US"
                        onChange={(e) => {
                          field.onChange(e);
                          setIsTrue(true);
                        }}
                        // defaultCountry="US"
                        // countrySelectComponent={CountrySelect}
                        // onBlur={onBlur}
                        international={true}
                        addInternationalOption={false}
                        countryOptionsOrder={['US', 'CA', 'AU']}
                        countryCallingCodeEditable={false}
                      />
                    )}
                  />
                </>
              ) : (
                <Stack direction="row" justifyContent="space-between" sx={{ mt: 1, paddingBottom: 0 }}>
                  <Typography variant="body2">{userPhoneNumber.phoneNumber}</Typography>
                  <Typography variant="body2" color="primary">
                    {userPhoneNumber.status}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </ParentPhoneInputStyle>
          <Divider />
          {!userPhoneNumber?.id ? (
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
                      {Object.keys(AudienceEnum).map((_audience) => (
                        <MenuItem value={AudienceEnum[_audience as keyof typeof AudienceEnum]} key={_audience}>
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
              <LoadingButton loading={isLoading} type="submit" variant="contained" disabled={!isTrue}>
                Add
              </LoadingButton>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ px: 6 }}>
              <Button variant="text" color="error" onClick={() => handleDialogDeletePhoneNumber()}>
                Delete
              </Button>

              <Controller
                name="audience"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ minWidth: 80, ml: 4.5 }}>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      sx={{ maxHeight: 40 }}
                    >
                      {Object.keys(AudienceEnum).map((_audience) => (
                        <MenuItem value={AudienceEnum[_audience as keyof typeof AudienceEnum]} key={_audience}>
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

export default AddPhoneNumber;
