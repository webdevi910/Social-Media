import * as Yup from 'yup';
import { useState } from 'react';
// next
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from 'src/routes/paths';
// hooks
import useIsMountedRef from 'src/hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { Eye, EyeSlash, Sms, Lock } from 'iconsax-react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

type SignInValuesProps = {
  username: string;
  password: string;
  // remember: boolean;
  afterSubmit?: string;
};

export default function SignUInFrom() {
  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    username: '',
    password: '',
    // remember: true,
  };

  const methods = useForm<SignInValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: SignInValuesProps) => {
    try {
      const { username, password } = data;
      await signIn('SIGN_IN', { redirect: false, username, password, callbackUrl: `${window.location.origin}` });
      const session = await getSession();
      // console.log('ssss', session);
      router.push('/');
      // const session = await getSession();
    } catch (error: any) {
      console.error(error);
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
            Email or Phone number
          </Typography>

          <RHFTextField
            autoComplete="username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Sms />
                </InputAdornment>
              ),
            }}
            name="username"
            placeholder="Email or Phone number"
          />
        </Stack>

        <Stack spacing={1}>
          <Typography sx={{ ml: 2 }} variant="body2" color="text.primary">
            Password
          </Typography>
          <RHFTextField
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <Eye /> : <EyeSlash />}
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <RHFCheckbox name="remember" label="Remember me" /> */}
        <Box />
        <NextLink href={PATH_AUTH.resetPassword} passHref>
          <Link variant="caption" color="primary.light">
            Forgot password?
          </Link>
        </NextLink>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
