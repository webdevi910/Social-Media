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
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { Eye, EyeSlash, Sms, Lock } from 'iconsax-react';
import PasswordStrength from 'src/components/PasswordStrength';
import { useDispatch, useSelector } from 'src/redux/store';
import { basicInfoSelector, updateSignUpBasicInfo } from 'src/redux/slices/auth';
import { useRouter } from 'next/router';
// ----------------------------------------------------------------------

// interface BaseInfoFormProps {
// }

type BasicInfoFormProps = {
  username: string;
  password: string;
  afterSubmit?: string;
};

export default function BaseInfoForm() {
  const isMountedRef = useIsMountedRef();
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const basicInfo = useSelector(basicInfoSelector);

  const router = useRouter();

  const SignUpSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    username: basicInfo.username,
    password: basicInfo.password,
  };

  const methods = useForm<BasicInfoFormProps>({
    resolver: yupResolver(SignUpSchema),
    defaultValues,
  });

  const {
    // reset,
    setError,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: BasicInfoFormProps) => {
    try {
      dispatch(updateSignUpBasicInfo(data));
      router.push(PATH_AUTH.signUp.advancedInfo);
    } catch (error: any) {
      console.error(error);
      // reset();
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
          <Box sx={{ pb: 2 }}>
            {!!watch('password').length ? <PasswordStrength password={watch('password')} /> : <Box height={18} />}
          </Box>
        </Stack>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Continue
      </LoadingButton>
    </FormProvider>
  );
}
