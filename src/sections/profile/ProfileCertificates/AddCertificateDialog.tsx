import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Divider, FormControl, IconButton, MenuItem, Select, Stack, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { ArrowLeft, CloseSquare, EyeSlash } from 'iconsax-react';
import { useRouter } from 'next/router';
import getMonthName from 'src/utils/getMonthName';
// toast
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
// Rhf and yup
import { Controller, useForm } from 'react-hook-form';
import { AudienceEnum, Certificate } from 'src/@types/sections/serverTypes';
import { FormProvider, RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import {
  certificateCleared,
  certificateUpdated,
  userCertificateSelector,
} from 'src/redux/slices/profile/userCertificates-slice';
import { useDispatch, useSelector } from 'src/redux/store';
// Mutations !
import * as Yup from 'yup';
import { useUpsertCertificateMutation } from '../../../_requests/graphql/profile/certificates/Mutations/upsertCertificate.generated';


function AddCertificateDialog() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const theme = useTheme();
  const userCertificate = useSelector(userCertificateSelector);
  const dispatch = useDispatch();

  // useEffect for Refreshing
  useEffect(() => {
    if (!userCertificate) router.push('/profile/certificate-list');
  }, [userCertificate, router]);

  // mutation !
  const [upsertCertificate, { isLoading }] = useUpsertCertificateMutation();
  // yup
  const certificateValidation = Yup.object()
    .shape({
      certificateName: Yup.object()
        .shape({
          title: Yup.string().required(),
        })
        .required(),
      issuingOrganization: Yup.object()
        .shape({
          title: Yup.string().required(),
        })
        .required(),
    })
    .required();

  const methods = useForm<Certificate>({
    defaultValues: {
      ...userCertificate,
    },
    resolver: yupResolver(certificateValidation),
  });

  const {
    trigger,
    control,
    watch,
    getValues,
    handleSubmit,
    formState: { errors, isValid, isDirty},
  } = methods;

  const onSubmit = async (data: Certificate) => {
    const resData: any = await upsertCertificate({
      filter: {
        dto: {
          id: userCertificate?.id,
          certificateNameId: data.certificateName?.id,
          issuingOrganizationId: data.issuingOrganization?.id,
          credentialDoesExpire: data.credentialDoesExpire,
          issueDate: data.issueDate,
          credentialID: data.credentialID,
          credentialUrl: data.credentialUrl,
          audience: data.audience,
        },
      },
    });
    if (resData?.data?.upsertCertificate.isSuccess) {
      enqueueSnackbar('The certificate has been successfully added ', { variant: 'success' });
      dispatch(certificateCleared({ audience: AudienceEnum.Public }));
      router.push('/profile/certificate-list');
    } else {
      enqueueSnackbar('It was not successful', { variant: 'error' });
    }
  };

  // navigate and send data to Redux
  const handleNavigation = (url: string) => {
    dispatch(certificateUpdated(getValues()));
    router.push(url);
  };

  // useEffecgt for Trigger
  useEffect(() => {
    trigger(['certificateName', 'issuingOrganization']);
  }, []);

  // click on closeicon and go to Discard or profile
  function handleCloseCertificateDialog() {
    if (isValid && isDirty) {
      handleNavigation('/profile/discard-certificate');
    } else {
      dispatch(certificateCleared({ audience: AudienceEnum.Public }));
      router.push('/profile/certificate-list');
    }
  }

  return (
    <>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ mb: 2, px: 2, pt: 3 }} direction="row" alignItems="center" justifyContent="space-between">
        <Stack spacing={2} direction="row" alignItems="center">
          <IconButton sx={{ p: 0 }} onClick={handleCloseCertificateDialog}>
            <ArrowLeft color={theme.palette.text.primary} />
          </IconButton>
          <Typography variant="subtitle1">{userCertificate?.id ? 'Edit Certificate' : 'Add Certificate'}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            disabled={!!Object.keys(errors).length}
          >
            {userCertificate?.id ? 'save' : 'Add'}
          </LoadingButton>
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <Divider />
        <Box sx={{ px: 2 }}>
          <Typography variant="subtitle1" color="text.primary">
            Name*
          </Typography>
          <Box mt={2} />
          <Box onClick={() => handleNavigation('/profile/Search-certificateNames')}>
            {watch('certificateName') ? (
              <Typography variant="body2" color="text.primary">
                {watch('certificateName')?.title}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Ex: Microsoft certified network security
              </Typography>
            )}
          </Box>
        </Box>
        <Divider />
        <Box sx={{ px: 2 }}>
          <Typography variant="subtitle1" color="text.primary">
            Issuing organization*
          </Typography>
          <Box mt={2} />
          <Box onClick={() => handleNavigation('/profile/Search-issuingOrganization')}>
            {watch('issuingOrganization') ? (
              <Typography variant="body2" color="text.primary">
                {watch('issuingOrganization')?.title}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Ex: Microsoft certified network security
              </Typography>
            )}
          </Box>
        </Box>
        <Divider />
        <Box sx={{ px: 2 }}>
          <Stack direction="row" alignItems="center">
            <RHFCheckbox
              label={<Typography variant="body2">This credential does not expire</Typography>}
              name="credentialDoesExpire"
              sx={{ color: 'primary.main', pl: 0, m: 0 }}
            />
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ px: 2 }}>
          <Typography variant="subtitle1" color="text.primary">
            Issue Date
          </Typography>
          <Box mt={2} />
          <Box onClick={() => handleNavigation('/profile/certificate-issue-date')}>
            {watch('issueDate') ? (
              <Typography variant="body2" color="text.secondary">
                {getMonthName(new Date(watch('issueDate')))} , {new Date(watch('issueDate')).getFullYear()}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Issue Date
              </Typography>
            )}
          </Box>
        </Box>
        <Divider />
        <Box sx={{ px: 2 }}>
          <Typography variant="subtitle1" color="text.primary">
            Expiration Date
          </Typography>

          <Box mt={2} />
          <Box
            onClick={() =>
              watch('credentialDoesExpire') ? undefined : handleNavigation('/profile/certificate-expiration-date')
            }
          >
            {watch('expirationDate') ? (
              <Typography variant="body2" color="text.secondary">
                {getMonthName(new Date(watch('expirationDate')))} , {new Date(watch('expirationDate')).getFullYear()}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Expiration Date
              </Typography>
            )}
          </Box>
        </Box>
        <Divider />
        <Box sx={{ px: 2 }}>
          <Typography variant="subtitle1" color="text.primary">
            Credential ID
          </Typography>
          <Box mt={2} />
          <RHFTextField name="credentialID" placeholder="Credential ID" />
        </Box>
        <Divider />
        <Box sx={{ px: 2 }}>
          <Typography variant="subtitle1" color="text.primary">
            Credential URL
          </Typography>
          <Box mt={2} />
          <RHFTextField name="credentialUrl" placeholder="Credential Url" />
        </Box>
        <Divider />
        <Stack direction="row" justifyContent="end" sx={{ px: 2 }}>
          <Stack direction="row" alignItems="center">
            {userCertificate?.id && (
              <Button
                sx={{ color: 'error.main', padding: '11px 33px' }}
                onClick={() => handleNavigation('/profile/certificate-delete-confirm')}
              >
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
                  >
                    {Object.keys(AudienceEnum).map((_audience) => (
                      <MenuItem value={AudienceEnum[_audience]} key={_audience}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EyeSlash />
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
  </>
  );
}

export default AddCertificateDialog;
