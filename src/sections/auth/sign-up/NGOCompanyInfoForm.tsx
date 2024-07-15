import * as Yup from 'yup';
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, InputAdornment, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { User } from 'iconsax-react';
import { styled } from '@mui/material/styles';
import { ngoCompanyUserInfoSelector, NGOCompanyUserInfoUpdated } from 'src/redux/slices/auth';
import { useDispatch, useSelector } from 'src/redux/store';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

type NGOCompanyInfoFormProps = {
  fullName: string;
  afterSubmit?: string;
};

const PolicySectionStyle = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(1.5, 0),
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.spacing(1),
}));

export default function NGOCompanyInfoForm() {
  const isMountedRef = useIsMountedRef();

  const dispatch = useDispatch();

  const { fullName } = useSelector(ngoCompanyUserInfoSelector);

  const router = useRouter();

  const NGOCompanyInfoSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
  });

  const defaultValues = {
    fullName,
  };

  const methods = useForm<NGOCompanyInfoFormProps>({
    resolver: yupResolver(NGOCompanyInfoSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: NGOCompanyInfoFormProps) => {
    try {
      dispatch(NGOCompanyUserInfoUpdated(data));
      router.push(PATH_AUTH.signUp.verification);
    } catch (error: any) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack mt={3} spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack spacing={1}>
          <Typography sx={{ ml: 2 }} variant="body2" color="text.primary">
            Full Name
          </Typography>

          <RHFTextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <User />
                </InputAdornment>
              ),
            }}
            name="fullName"
            placeholder="Full name i.e “Save the children”"
          />
        </Stack>
      </Stack>

      <PolicySectionStyle>
        <Typography variant="caption" color="text.secondary" textAlign="center">
          By clicking Agree & Join, you agree to the Gardenoflove{' '}
          <NextLink href={PATH_AUTH.signIn} passHref>
            <Link variant="caption" component="span" color="primary.light" sx={{ textDecoration: 'none' }}>
              User Agreement
            </Link>
          </NextLink>
          ,&nbsp;
          <NextLink href={PATH_AUTH.signIn} passHref>
            <Link variant="caption" component="span" color="primary.light" sx={{ textDecoration: 'none' }}>
              Privacy Policy
            </Link>
          </NextLink>
          , and&nbsp;
          <NextLink href={PATH_AUTH.signIn} passHref>
            <Link variant="caption" component="span" color="primary.light" sx={{ textDecoration: 'none' }}>
              Cookie Policy.
            </Link>
          </NextLink>
        </Typography>
      </PolicySectionStyle>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Agree & join
      </LoadingButton>
    </FormProvider>
  );
}
