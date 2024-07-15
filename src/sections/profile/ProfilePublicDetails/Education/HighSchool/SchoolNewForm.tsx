import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowLeft, Eye } from 'iconsax-react';
import { FormProvider } from 'src/components/hook-form';
import { useDispatch, useSelector } from 'src/redux/store';
import { AudienceEnum, PersonSchool } from 'src/@types/sections/serverTypes';
import { schoolWasEmpty, userSchoolUpdated, userSchoolsSelector } from 'src/redux/slices/profile/userSchool-slice';
import {
  Divider,
  IconButton,
  Button,
  Stack,
  Typography,
  useTheme,
  Select,
  FormControl,
  Box,
  MenuItem,
} from '@mui/material';
import { useAddPersonSchoolMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/createPersonSchool.generated';
import { useUpdatePersonSchoolMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/updatePersonSchool.generated';
import { LoadingButton } from '@mui/lab';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import { NextPage } from 'next';
import SchoolName from './SchoolName';

const SchoolNewForm: NextPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const [openNameSheet, setOpenNameSheet] = useState<boolean>(false);
  const sheetRef = useRef<BottomSheetRef>();
  const { enqueueSnackbar } = useSnackbar();

  //Mutation
  const [createPersonSchool, { isLoading: createIsLoading, data: userSchool }] = useAddPersonSchoolMutation();
  const [updateCurrentSchool, { isLoading: updateIsLoading, data: editUserSchool }] = useUpdatePersonSchoolMutation();

  //For Redux Tools
  const dispatch = useDispatch();
  const userHighSchool = useSelector(userSchoolsSelector);
  const isEdit = !!userHighSchool?.id;

  //Functions for Mutation and Redux
  const handleNavigation = (url: string) => {
    dispatch(userSchoolUpdated(getValues()));
    router.push(url);
  };

  const onSubmit = async (data: PersonSchool) => {
    if (isEdit) {
      //update mutation func
      const response: any = await updateCurrentSchool({
        filter: {
          dto: {
            id: data.id,
            year: +data.year,
            schoolId: data.school?.id,
            audience: data.audience,
          },
        },
      });
      if (response?.data?.updatePersonSchool?.isSuccess) {
        enqueueSnackbar('High school edited successfully', { variant: 'success' });
        dispatch(
          schoolWasEmpty({
            audience: AudienceEnum.Public,
          })
        );
        router.push('/profile/public-details/');
      }
    } else {
      //add mutation func
      const response: any = await createPersonSchool({
        filter: {
          dto: {
            // id: null,
            year: +data.year,
            schoolId: data.school?.id,
            audience: data.audience,
          },
        },
      });
      if (response?.data?.addPersonSchool?.isSuccess) {
        enqueueSnackbar('High school created successfully', { variant: 'success' });
        dispatch(
          schoolWasEmpty({
            audience: AudienceEnum.Public,
          })
        );
        router.push('/profile/public-details/');
      }
    }
  };
  useEffect(() => {
    trigger(['school.title', 'year']);
  }, []);

  useEffect(() => {
    if (!userHighSchool) router.push('/profile/public-details');
  }, [userHighSchool, router]);

  const handleDiscardDialog = () => {
    if ((isValid && !getValues().id) || isValid) {
      dispatch(schoolWasEmpty(getValues()));
      handleNavigation('/profile/discard-highSchool');
    } else {
      dispatch(schoolWasEmpty({ audience: AudienceEnum.Public }));
      router.push('/profile/public-details/');
    }
  };

  //Yup Validation schema & RHF
  const SchoolValidationSchema = Yup.object().shape({
    school: Yup.object()
      .shape({
        title: Yup.string().required('Required'),
      })
      .required(),
    year: Yup.string().required('Required'),
  });
  // const CollegeValidationSchema = Yup.object().shape({
  //   collegeDto: Yup.object()
  //     .shape({
  //       name: Yup.string().required('Required'),
  //     })
  //     .required(),
  //   startDate: Yup.string().required('Required'),
  // });

  const methods = useForm<PersonSchool>({
    mode: 'onChange',
    defaultValues: {
      ...userHighSchool,
    },
    resolver: yupResolver(SchoolValidationSchema),
  });

  const {
    trigger,
    control,
    getValues,
    watch,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = methods;

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} sx={{ px: 2, pt: 2 }} justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2}>
              <IconButton sx={{ p: 0 }} onClick={handleDiscardDialog}>
                <ArrowLeft />
              </IconButton>
              <Typography variant="subtitle1" color="text.primary">
                {isEdit ? 'Edit High School' : 'Add High School'}
              </Typography>
            </Stack>
            <LoadingButton
              loading={createIsLoading || updateIsLoading}
              variant="contained"
              color="primary"
              disabled={!isValid}
              type="submit"
            >
              {isEdit ? 'Save' : 'Add'}
            </LoadingButton>
          </Stack>
          <Divider />
          <Stack spacing={2} sx={{ px: 2 }}>
            <Typography variant="subtitle1" color="text.primary">
              School Name*
            </Typography>
            {/* handleNavigation('/profile/public-details/school-name') */}
            <Box onClick={() => setOpenNameSheet(true)}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ cursor: 'pointer' }}>
                {watch('school') ? (
                  <Typography variant="body2" color="text.primary">
                    {watch('school.title')}
                    {/* {watch('school')?.title} */}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    School Name
                  </Typography>
                )}
                {/* {watch('school')?.title || 'School Name'} */}
              </Typography>
            </Box>
          </Stack>
          <Divider />
          <Stack spacing={2} sx={{ px: 2 }}>
            <Typography variant="subtitle1" color="text.primary">
              Class Year
            </Typography>
            <Box onClick={() => handleNavigation('/profile/class-year')}>
              {watch('year') ? (
                <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer' }}>
                  {watch('year')}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer' }}>
                  Class Year
                </Typography>
              )}
            </Box>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2 }}>
            <Box>
              {isEdit && (
                <Button variant="text" color="error" onClick={() => router.push('/profile/delete-highSchool/')}>
                  <Typography variant="button">Delete</Typography>
                </Button>
              )}
            </Box>
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
      
    </>
  );
};
export default SchoolNewForm;
