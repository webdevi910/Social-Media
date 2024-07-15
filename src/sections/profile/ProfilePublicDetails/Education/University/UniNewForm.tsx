import React, { useEffect } from 'react';
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
  Checkbox,
} from '@mui/material';
import * as Yup from 'yup';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'src/redux/store';
import { FormProvider, RHFCheckbox } from 'src/components/hook-form';
import { ArrowLeft, Eye } from 'iconsax-react';
import {
  userUniversitySelector,
  userUniversityUpdated,
  emptyUniversity,
} from 'src/redux/slices/profile/userUniversity-slice';
import getMonthName from 'src/utils/getMonthName';
import { AudienceEnum, PersonCollege, InstituteTypeEnum } from 'src/@types/sections/serverTypes';
import { useAddPersonCollegeMutation } from '../../../../../_requests/graphql/profile/publicDetails/mutations/createPersonCollege.generated';
import { useUpdatePersonCollegeMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/updatePersonCollege.generated';

export default function UniNewForm() {
  const theme = useTheme();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  //Mutations
  const [createPersonUniversity, { isLoading: createIsLoading, data: createRes }] = useAddPersonCollegeMutation();
  const [updateCurrentUniversity, { isLoading: updateIsLoading, data: updateRes }] = useUpdatePersonCollegeMutation();

  //For Redux Tools
  const dispatch = useDispatch();
  const userUniversity = useSelector(userUniversitySelector);
  const isEdit = userUniversity?.id;

  //Functions for Mutation and Redux
  useEffect(() => {
    trigger(['collegeDto', 'startDate']);
  }, []);

  useEffect(() => {
    if(!userUniversity) router.push('/profile/public-details')
  },[userUniversity, router]);

  const handleNavigation = (url: string) => {
    dispatch(userUniversityUpdated(getValues()));
    router.push(url);
  };

  const onSubmit = async (data: PersonCollege) => {
    const startDate = new Date(data.startDate).toISOString();
    let endDate;
    if (data.endDate) {
      endDate = new Date(data.endDate).toISOString();
    }
    if (isEdit) {
      const response: any = await updateCurrentUniversity({
        filter: {
          dto: {
            id: data.id,
            audience: data.audience,
            collegeId: data.collegeDto?.id,
            concentrationId: data.concentrationDto?.id,
            graduated: data.graduated,
            startDate: startDate,
            endDate: endDate,
            instituteType: InstituteTypeEnum.University,
          },
        },
      });
      if (response?.data?.updatePersonCollege?.isSuccess) {
        enqueueSnackbar('University updated successfully', { variant: 'success' });
        dispatch(emptyUniversity({ audience: AudienceEnum.Public }));
        router.push('/profile/public-details/');
      }
    } else {
      const response: any = await createPersonUniversity({
        filter: {
          dto: {
            audience: data.audience,
            graduated: data.graduated,
            startDate: startDate,
            endDate: endDate,
            collegeId: data.collegeDto?.id,
            concentrationId: data.concentrationDto?.id,
            instituteType: InstituteTypeEnum.University,
          },
        },
      });
      if (response?.data?.addPersonCollege?.isSuccess) {
        enqueueSnackbar('University created successfully', { variant: 'success' });
        dispatch(emptyUniversity({ audience: AudienceEnum.Public }));
        router.push('/profile/public-details/');
      }
    }
  };
  const handleDiscardDialog = () => {
    // const errorLength = Object.keys(errors).length;
    if ((isValid && !getValues().id)||(isValid)) {
      dispatch(emptyUniversity(getValues()));
      handleNavigation('/profile/discard-university');
    } else {
      dispatch(emptyUniversity({ audience: AudienceEnum.Public }));
      router.push('/profile/public-details/');
    }
  };

  //Yup Validation schema & RHF
  const universityValidationSchema = Yup.object().shape({
    collegeDto: Yup.object()
      .shape({
        name: Yup.string().required('Required'),
      })
      .required(),
    startDate: Yup.string().required('Required'),
  });

  const methods = useForm<PersonCollege>({
    defaultValues: {
      ...userUniversity,
    },
    resolver: yupResolver(universityValidationSchema),
  });
  const {
    control,
    getValues,
    watch,
    trigger,
    handleSubmit,
    formState: { errors, isValid, isDirty  },
  } = methods;

  return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ py: 3, minHeight: 320 }}>
          <Stack direction="row" spacing={2} sx={{ px: 2 }} justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2}>
              <IconButton sx={{ p: 0 }} onClick={handleDiscardDialog}>
                <ArrowLeft />
              </IconButton>
              <Typography variant="subtitle1" color="text.primary">
                {isEdit ? 'Edit University' : 'Add University'}
              </Typography>
            </Stack>
            <LoadingButton
              variant="contained"
              disabled={!(!!userUniversity?.collegeDto?.id && !!userUniversity?.startDate)}
              color="primary"
              type="submit"
              loading={createIsLoading || updateIsLoading}
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
              University Name*
            </Typography>
            <Box onClick={() => handleNavigation('/profile/add-university-name/')}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ cursor: 'pointer' }}>
                {/* {watch('collegeDto')?.name || 'University Name'} */}
                {watch('collegeDto') ? (
                  <Typography variant="body2" color="text.primary" sx={{ cursor: 'pointer' }}>
                    {watch('collegeDto')?.name}
                    {/* {watch('collegeDto.name')} */}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer' }}>
                    University Name
                  </Typography>
                )}
              </Typography>
            </Box>
          </Stack>
          <Divider />
          <Stack spacing={2} sx={{ px: 2 }}>
            <Typography variant="subtitle1" color="text.primary">
              Concenteration
            </Typography>
            <Box onClick={() => handleNavigation('/profile/add-university-concenteration/')}>
              {watch('concentrationDto') ? (
                <Typography variant="body2" color="text.primary" sx={{ cursor: 'pointer' }}>
                  {watch('concentrationDto')?.title}
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
            <Box onClick={() => handleNavigation('/profile/uni-start-date')}>
              {watch('startDate') ? (
                <Typography variant="body2" color="text.primary" sx={{ cursor: 'pointer' }}>
                  {/* {new Date(watch('startDate')).toString().substr(4, 12).replace('01', '')} */}
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
            <Box
              sx={{ cursor: !watch('graduated') ? 'pointer' : 'default' }}
              onClick={() => handleNavigation('/profile/uni-end-date')}
            >
              {watch('endDate') && !watch('graduated') ? (
                <Typography variant="body2" color="text.primary">
                  {/* {new Date(watch('endDate')).toString().substr(4, 12).replace('01', '')} */}
                  {getMonthName(new Date(watch('endDate')))}, {new Date(watch('endDate')).getFullYear()}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  End Date
                </Typography>
              )}
            </Box>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent={isEdit ? 'space-between' : 'flex-end'} alignItems="center" sx={{ px: 2 }}>
            <Stack direction="row">
              {isEdit && (
                <Button variant="text" color="error" onClick={() => router.push('/profile/delete-uni/')}>
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
        </Stack>
      </FormProvider>
  );
}
