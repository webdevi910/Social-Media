import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { ArrowLeft, CloseSquare, Eye } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AudienceEnum, Experience } from 'src/@types/sections/serverTypes';
import { FormProvider, RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import { emptyExperience, experienceAdded, userExperienceSelector } from 'src/redux/slices/profile/userExperiences-slice';
import { useDispatch, useSelector } from 'src/redux/store';
import getMonthName from 'src/utils/getMonthName';
import { useAddExperienceMutation } from 'src/_requests/graphql/profile/experiences/mutations/addExperience.generated';
import { useUpdateExperienceMutation } from 'src/_requests/graphql/profile/experiences/mutations/updateExperience.generated';
import * as Yup from 'yup';

function ExperienceNewDialog() {
  const router = useRouter();
  const experienceData = useSelector(userExperienceSelector);
  const { enqueueSnackbar } = useSnackbar()
  const [addExperienceMutate, { isLoading: addLoading }] = useAddExperienceMutation();
  const [updateExperienceMutate, { isLoading: updateLoading }] = useUpdateExperienceMutation();

useEffect(() => {
  if(!experienceData) router.push('/profile/experience-list')
},[experienceData, router])

  const ExperienceFormSchema = Yup.object().shape({
    title: Yup.string().required(''),
    companyDto: Yup.object().shape({
      title: Yup.string().required(''),
    }),
    employmentType: Yup.string().required(''),
    startDate: Yup.string().required(''),
  });
  const dispatch = useDispatch();
  
  const methods = useForm<Experience>({
    resolver: yupResolver(ExperienceFormSchema),
    defaultValues: { ...experienceData },
    mode: "onBlur"
  });
  const {
    handleSubmit,
    control,
    watch,
    trigger,
    getValues,
    formState: { errors, isValid, isDirty },
  } = methods;
  useEffect(() => {
    trigger(['companyDto.title', 'title', 'employmentType', 'startDate']);
  }, []);

  const onSubmit = async (data: Experience) => {
    const startDate = new Date(data.startDate)
    let endDate 
    if(data.stillWorkingThere) endDate = undefined
    else if(data.endDate) {
      const date = new Date(data.endDate)
      endDate = date.getFullYear() + '-' + date.getMonth() + 1 + '-01'
    }

    if (data.id) {
      const res: any = await updateExperienceMutate({
        filter: {
          dto: {
            id: data.id,
            audience: data.audience,
            employmentType: data.employmentType,
            description: data.description,
            mediaUrl: data.mediaUrl,
            stillWorkingThere: data.stillWorkingThere,
            title: data.title,
            cityId: data.cityDto?.id,
            companyId: data.companyDto?.id,
            startDate: startDate.getFullYear() + '-' + ('0'+(startDate.getMonth() + 1)).slice(-2)  + '-01',
            endDate: endDate,
          },
        },
      });
      if(res?.data?.updateExperience?.isSuccess) {
        enqueueSnackbar('update successfully', {variant: 'success'})
        dispatch(emptyExperience({audience: AudienceEnum.Public}))
        router.push('/profile/experience-list')
      }
    } else {
     const res: any = await addExperienceMutate({
        filter: {
          dto: {
            audience: data.audience,
            employmentType: data.employmentType,
            description: data.description,
            mediaUrl: data.mediaUrl,
            stillWorkingThere: data.stillWorkingThere,
            title: data.title,
            cityId: data.cityDto?.id,
            companyId: data.companyDto?.id,
            startDate: startDate.getFullYear() + '-' + ('0'+(startDate.getMonth() + 1)).slice(-2)  + '-01',
            endDate: endDate,
          },
        },
      });

      if(res?.data?.addExperience?.isSuccess) {
        enqueueSnackbar('Experience successfully', {variant: 'success'})
        dispatch(emptyExperience({audience: AudienceEnum.Public}))
        router.push('/profile/experience-list')
      }
    }
  };

  const handleNavigation = (url: string) => {
    dispatch(experienceAdded(getValues()));
    router.push(url);
  };

  const handleClose = () => {
    if(isValid && isDirty) {
      dispatch(emptyExperience(getValues()))
      router.push('/profile/experience-discard')
    } else {
      dispatch(emptyExperience({audience: AudienceEnum.Public}))
      router.back()}
  }

  return (
    <Dialog open={true} fullWidth={true}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ py: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2 }}>
            <Stack direction="row" spacing={2}>
              <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
                <ArrowLeft />
              </IconButton>
              <Typography variant="subtitle2" color="text.primary">
                {experienceData?.id ? 'Edit Experience' :  'Add Experience'}
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <CloseSquare />
            </IconButton>
          </Stack>
          <Divider sx={{ height: 2 }} />

          <Stack spacing={2} sx={{ px: 2 }}>
            <Typography variant="subtitle1" color="text.primary">
              Title*
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <RHFTextField placeholder="Ex: Sales Manager" name="title" size="small" error={false} />
            </Typography>
          </Stack>
          <Divider />
          <Stack spacing={2} sx={{ px: 2 }}>
            <Typography variant="subtitle1" color="text.primary">
              Employment Type*
            </Typography>
            <Box sx={{ cursor: 'pointer' }} onClick={() => handleNavigation('/profile/experience-employment-type')}>
              {watch('employmentType') ? (
                <Typography variant="body2" color="text.primary">
                  {watch('employmentType')}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Ex: Full Time
                </Typography>
              )}
            </Box>
          </Stack>
          <Divider />
          <Stack spacing={2} sx={{ px: 2 }}>
            <Typography variant="subtitle1" color="text.primary">
              Company name*
            </Typography>
            <Box sx={{ cursor: 'pointer' }} onClick={() => handleNavigation('/profile/experience-company')}>
              {watch('companyDto') ? (
                <Typography variant="body2" color="text.primary">
                  {watch('companyDto.title')}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  EX: Software Genesis Group
                </Typography>
              )}
            </Box>
          </Stack>
          <Divider />
          <Stack spacing={2} sx={{ px: 2 }}>
            <Typography variant="subtitle1" color="text.primary">
              Location
            </Typography>
            <Box sx={{ cursor: 'pointer' }} onClick={() => handleNavigation('/profile/experience-location')}>
              {watch('cityDto') ? (
                <Typography variant="body2" color="text.primary">
                  {watch('cityDto.name')}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Ex: England, London
                </Typography>
              )}
            </Box>
          </Stack>
          <Divider />
          <Stack spacing={2} sx={{ px: 2 }}>
            <Typography variant="body2" color="text.primary">
              <RHFCheckbox
                name="stillWorkingThere"
                label="I am currently work in this role"
                sx={{
                  color: ' primary.main',
                  height: 0,
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
            </Typography>
          </Stack>
          <Divider />
          <Stack spacing={2} sx={{ px: 2 }}>
            <Typography variant="subtitle1" color="text.primary">
              Start Date*
            </Typography>
            <Box sx={{ cursor: 'pointer' }} onClick={() => handleNavigation('/profile/experience-start-date')}>
              {watch('startDate') ? (
                <Typography variant="body2" color="text.primary">
                  {getMonthName(new Date(watch('startDate')))}, {new Date(watch('startDate')).getFullYear()}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
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
              sx={{ cursor: !watch('stillWorkingThere') ? 'pointer' : 'default' }}
              onClick={() =>
                watch('stillWorkingThere') ? undefined : handleNavigation('/profile/experience-end-date')
              }
            >
              {watch('endDate') && !watch('stillWorkingThere') ? (
                <Typography variant="body2" color="text.primary">
                  {getMonthName(watch('endDate'))}, {new Date(watch('endDate')).getFullYear()}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Present
                </Typography>
              )}
            </Box>
          </Stack>
          <Divider />
          <Stack spacing={2} sx={{ px: 2 }}>
            <Typography variant="subtitle1" color="text.primary">
              Description
            </Typography>
            <Box>
              <RHFTextField
                size="small"
                multiline
                name="description"
                placeholder="Add Detail and Description about your Experience."
                inputProps={{ maxLength: 2000 }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                component="div"
                sx={{ width: '100%', textAlign: 'right' }}
              >
                {watch('description')?.length || 0}/2000
              </Typography>
            </Box>
          </Stack>
          <Divider />
          <Stack spacing={2} sx={{ px: 2 }}>
            <Typography variant="subtitle1" color="text.primary">
              Photo
            </Typography>
            <Stack>
              {!watch('mediaUrl') ? (
                <Stack direction="row" justifyContent={'space-between'}>
                  <Typography variant="body2" color="text.primary">
                    Add photos.
                  </Typography>
                  <Typography
                    variant="overline"
                    color="primary.main"
                    sx={{ cursor: 'pointer' }}
                    component="div"
                    onClick={() => handleNavigation('/profile/experience-photo')}
                  >
                    + Add Photo
                  </Typography>
                </Stack>
              ) : (
                <Box display="flex" justifyContent="center">
                  <Image
                    onClick={() => handleNavigation('/profile/experience-photo')}
                    src={'http://95.216.218.153:4566/' + watch('mediaUrl')}
                    width={328}
                    height={184}
                    alt="experience-photo"
                  />
                </Box>
              )}
            </Stack>
          </Stack>

          <Divider />
          <Stack sx={{ px: 2 }} direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={0.5} >
              <Link href="/profile/experience-delete" passHref>
              <Button color='error' variant='text' sx={{width: 105}}>Delete</Button>
              </Link>
            <Controller
              name="audience"
              control={control}
              render={({ field }) => (
                <FormControl>
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
                      <MenuItem value={AudienceEnum[_audience as keyof typeof AudienceEnum] } key={_audience}>
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
            <LoadingButton loading={addLoading || updateLoading} type="submit" variant="contained" disabled={!!Object.keys(errors).length}>
              {experienceData?.id ? 'Save' : 'Add'}
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Dialog>
  );
}

export default ExperienceNewDialog;
