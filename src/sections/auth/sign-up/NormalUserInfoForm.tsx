import * as Yup from 'yup';
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
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
import { useDispatch, useSelector } from 'src/redux/store';
import { normalUserInfoSelector, normalUsreInfoUpdated } from 'src/redux/slices/auth';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';

// ----------------------------------------------------------------------

type NormalUserInfoFormProps = {
  firstName: string;
  lastName: string;
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

export default function NormalUserInfoForm() {
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();

  const { firstName, lastName } = useSelector(normalUserInfoSelector);

  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
  });

  const defaultValues = {
    firstName,
    lastName,
  };

  const methods = useForm<NormalUserInfoFormProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: NormalUserInfoFormProps) => {
    try {
      dispatch(normalUsreInfoUpdated(data));
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
            First Name
          </Typography>

          <RHFTextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <User />
                </InputAdornment>
              ),
            }}
            name="firstName"
            placeholder="First Name"
          />
        </Stack>

        <Stack spacing={1}>
          <Typography sx={{ ml: 2 }} variant="body2" color="text.primary">
            Last Name
          </Typography>
          <RHFTextField
            name="lastName"
            placeholder="Last Name"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <User />
                </InputAdornment>
              ),
            }}
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
