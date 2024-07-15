import React, { useEffect, useState } from 'react';
import {
  Divider,
  IconButton,
  Button,
  Stack,
  Box,
  Typography,
  useTheme,
  Select,
  FormControl,
  MenuItem,
} from '@mui/material';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import getMonthName from 'src/utils/getMonthName';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'src/redux/store';
import { FormProvider, RHFCheckbox } from 'src/components/hook-form';
import { ArrowLeft, EyeSlash, Eye } from 'iconsax-react';
import { AudienceEnum, PersonCollege, InstituteTypeEnum } from 'src/@types/sections/serverTypes';
import { emptyCollege, userCollegeUpdated, userCollegesSelector } from 'src/redux/slices/profile/userColloges-slice';
import { useAddPersonCollegeMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/createPersonCollege.generated';
import { useUpdatePersonCollegeMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/updatePersonCollege.generated';
// import { useDeletePersonCollegeMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/deletePersonCollege.generated';

export default function CollegeNewForm() {
  const router = useRouter();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  //Mutations
  const [createPersonCollege, { isLoading: addIsLoading }] = useAddPersonCollegeMutation();
  const [updateCurrentCollege, { isLoading: updateIsLoading }] = useUpdatePersonCollegeMutation();

  //For Redux Tools
  const dispatch = useDispatch();
  const userColleges = useSelector(userCollegesSelector);
  const isEdit = !!userColleges?.id;

  //Functions for Mutation and Redux
  const handleNavigation = (url: string) => {
    dispatch(userCollegeUpdated(getValues()));
    router.push(url);
  };

  const onSubmit = async (data: PersonCollege) => {
    const startDate = new Date(data.startDate).toISOString();
    let endDate;
    if (data.endDate) {
      endDate = new Date(data.endDate).toISOString();
    }
    if (isEdit) {
      const response: any = await updateCurrentCollege({
        filter: {
          dto: {
            id: data.id,
            collegeId: data.collegeDto?.id,
            concentrationId: data.concentrationDto?.id,
            graduated: data.graduated,
            audience: data.audience,
            startDate: startDate, //(data?.startDate as Date).toISOString(), //startDate.getFullYear() + '-' + ('0' + (startDate.getMonth() + 1)).slice(-2) + '-01',
            endDate: endDate,
            instituteType: InstituteTypeEnum.College,
          },
        },
      });
      if (response?.data?.updatePersonCollege?.isSuccess) {
        enqueueSnackbar('College edited successfully', { variant: 'success' });
        dispatch(emptyCollege({ audience: AudienceEnum.Public }));
        router.push('/profile/public-details/');
      } else {
        enqueueSnackbar('College education failed', { variant: 'error' });
      }
    } else {
      const response: any = await createPersonCollege({
        filter: {
          dto: {
            audience: data.audience,
            graduated: data.graduated,
            startDate: startDate,
            endDate: endDate,
            collegeId: data.collegeDto?.id,
            concentrationId: data.concentrationDto?.id,
            instituteType: InstituteTypeEnum.College,
          },
        },
      });
      if (response?.data?.addPersonCollege?.isSuccess) {
        enqueueSnackbar('College created successfully', { variant: 'success' });
        dispatch(emptyCollege({ audience: AudienceEnum.Public }));
        router.push('/profile/public-details/');
      } else if (!response?.createCollegeData?.addPersonCollege?.isSuccess) {
        enqueueSnackbar('College creation failed', { variant: 'error' });
      }
    }
  };

  useEffect(() => {
    trigger(['collegeDto', 'startDate']);
  }, []);

  useEffect(() => {
    if (!userColleges) router.push('/profile/public-details');
  }, [userColleges, router]);

  const handleDiscardDialog = () => {
    if ((isValid && !getValues().id) || isValid) {
      dispatch(emptyCollege(getValues()));
      handleNavigation('/profile/discard-college');
    } else {
      dispatch(emptyCollege({ audience: AudienceEnum.Public }));
      router.push('/profile/public-details/');
    }
  };

  //Yup Validation schema & RHF
  const CollegeValidationSchema = Yup.object().shape({
    collegeDto: Yup.object()
      .shape({
        name: Yup.string().required('Required'),
      })
      .required(),
    startDate: Yup.string().required('Required'),
  });

  const methods = useForm<PersonCollege>({
    mode: 'onChange',
    defaultValues: {
      ...userColleges,
    },
    resolver: yupResolver(CollegeValidationSchema),
  });

  const {
    control,
    getValues,
    watch,
    handleSubmit,
    trigger,
    formState: { errors, isValid, isDirty },
  } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} sx={{ px: 2, pt: 2 }} justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2}>
            <IconButton sx={{ p: 0 }} onClick={handleDiscardDialog}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              {isEdit ? 'Edit College' : 'Add College'}
            </Typography>
          </Stack>
          <LoadingButton
            loading={addIsLoading || updateIsLoading}
            variant="contained"
            color="primary"
            disabled={!!Object.keys(errors).length}
            type="submit"
          >
            {isEdit ? 'Save' : 'Add'}
          </LoadingButton>
          {/* <IconButton sx={{ p: 0 }} onClick={handleDiscardDialog}>
              <CloseSquare variant="Outline" color={theme.palette.text.primary} />
            </IconButton> */}
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <Typography variant="subtitle1" color="text.primary">
            College Name*
          </Typography>
          <Box onClick={() => handleNavigation('/profile/add-college-name')}>
            {watch('collegeDto') ? (
              <Typography variant="body2" color="text.primary" sx={{ cursor: 'pointer' }}>
                {watch('collegeDto')?.name}
                {/* {watch('collegeDto.name')} */}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer' }}>
                College Name
              </Typography>
            )}
          </Box>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <Typography variant="subtitle1" color="text.primary">
            Concenteration
          </Typography>
          <Box onClick={() => handleNavigation('/profile/add-college-concenteration')}>
            {watch('concentrationDto') ? (
              <Typography variant="body2" color="text.primary" sx={{ cursor: 'pointer' }}>
                {watch('concentrationDto')?.title}
                {/* {watch('concentrationDto.title')} */}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer' }}>
                Concenteration
              </Typography>
            )}
          </Box>
        </Stack>
        <Divider />
        <Stack direction="row" sx={{ px: 2 }} justifyContent="space-between" alignItems="center">
          <RHFCheckbox
            label={<Typography variant="body2">Graduated</Typography>}
            name="graduated"
            sx={{
              color: 'primary.main',
              '&.Mui-checked': {
                color: 'primary.main',
              },
            }}
          />
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <Typography variant="subtitle1" color="text.primary">
            Start Date*
          </Typography>
          <Box onClick={() => handleNavigation('/profile/college-start-date')}>
            {watch('startDate') ? (
              <Typography variant="body2" color="text.primary" sx={{ cursor: 'pointer' }}>
                {/* {new Date(watch('startDate')).toUTCString().substr(4, 12).replace('01', '')} */}
                {getMonthName(new Date(watch('startDate')))}, {new Date(watch('startDate')).getFullYear()}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer' }}>
                Start Date
              </Typography>
            )}
          </Box>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <Typography variant="subtitle1" color="text.primary">
            End Date
          </Typography>
          <Box onClick={() => (!watch('graduated') ? undefined : handleNavigation('/profile/college-end-date'))}>
            {watch('endDate') && watch('graduated') ? (
              <Typography variant="body2" color="text.primary" sx={{ cursor: 'pointer' }}>
                {/* {new Date(watch('endDate')).toUTCString().substr(4, 12).replace('01', '')} */}
                {getMonthName(new Date(watch('endDate')))}, {new Date(watch('endDate')).getFullYear()}
              </Typography>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ cursor: watch('graduated') ? 'pointer' : 'default' }}
              >
                End Date
              </Typography>
            )}
          </Box>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          justifyContent={isEdit ? 'space-between' : 'flex-end'}
          alignItems="center"
          sx={{ px: 2 }}
        >
          {isEdit && (
            <Button variant="text" color="error" onClick={() => handleNavigation('/profile/delete-college/')}>
              <Typography variant="button">Delete</Typography>
            </Button>
          )}
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
                  renderValue={(value) => (
                    <Stack direction="row" spacing={1}>
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
  );
}
