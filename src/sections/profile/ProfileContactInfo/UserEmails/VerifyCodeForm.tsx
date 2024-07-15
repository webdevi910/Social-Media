import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { OutlinedInput, Stack, Button, Box, useTheme, Typography, Icon } from '@mui/material';
import { LoadingButton } from '@mui/lab';


// routes
import { PATH_APP } from '../../../../routes/paths';
import { Timer1 } from 'iconsax-react';
import { addedEmail, userEmailsSelector } from 'src/redux/slices/profile/userEmails-slice';
import { useConfirmUserEmailMutation } from 'src/_requests/graphql/profile/contactInfo/mutations/confirmUserEmail.generated';
import useCountdown from 'src/hooks/useCountdown';
import { AudienceEnum } from 'src/@types/sections/serverTypes';

import { useDispatch, useSelector } from 'src/redux/store';
// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
};
type ValueNames = 'code1' | 'code2' | 'code3' | 'code4' | 'code5' ;

export default function VerifyCodeForm() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [confirmUserEmail] = useConfirmUserEmailMutation();
  const personEmail = useSelector(userEmailsSelector);
  const dispatch = useDispatch();
  const { minutes, seconds } = useCountdown(new Date(new Date().getTime() + (2*60000)));
  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
  };

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const values = watch();

  useEffect(() => {
    document.addEventListener('paste', handlePasteClipboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: FormValuesProps) => {
    const resDataAdd: any = await confirmUserEmail({
      filter: {
        dto: {
          email: personEmail?.email,
          verificationCode: personEmail?.verificationCode,
        },
      },
    });
    console.log('resDataAdd', resDataAdd);
    if (resDataAdd.data?.confirmUserEmail?.isSuccess) {
      router.push('/profile/contact-info');
      dispatch(addedEmail({ audience: AudienceEnum.Public }));
    }
    if (!resDataAdd.data?.confirmUserEmail?.isSuccess) {
      console.log('messagingKey', resDataAdd.data?.confirmUserEmail?.messagingKey);
      enqueueSnackbar(resDataAdd.data?.confirmUserEmail?.messagingKey, { variant: 'error' });
    }
  };

  const handlePasteClipboard = (event: ClipboardEvent) => {
    let data: string | string[] = event?.clipboardData?.getData('Text') || '';

    data = data.split('');

    [].forEach.call(document.querySelectorAll('#field-code'), (node: any, index) => {
      node.value = data[index];
      const fieldIndex = `code${index + 1}`;
      setValue(fieldIndex as ValueNames, data[index]);
    });
  };

  const handleChangeWithNextField = (
    event: React.ChangeEvent<HTMLInputElement>,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    const { maxLength, value, name } = event.target;
    const fieldIndex = name.replace('code', '');

    const fieldIntIndex = Number(fieldIndex);

    if (value.length >= maxLength) {
      if (fieldIntIndex < 6) {
        const nextfield = document.querySelector(`input[name=code${fieldIntIndex + 1}]`);

        if (nextfield !== null) {
          (nextfield as HTMLElement).focus();
        }
      }
    }

    handleChange(event);
  };

  return (
    <>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary', textAlign: 'center', px: 2 }}>
        Enter the 5-digit verification code sent to {personEmail?.email}.
      </Typography>

      <Box sx={{ mt: 4, mb: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="row" spacing={2} justifyContent="center">
            {Object.keys(values).map((name, index) => (
              <Controller
                key={name}
                name={`code${index + 1}` as ValueNames}
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    id="field-code"
                    autoFocus={index === 0}
                    placeholder="-"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeWithNextField(event, field.onChange)
                    }
                    sx={{
                      '& fieldset': {
                        borderTop: 'unset',
                        borderRight: 'unset',
                        borderLeft: 'unset',
                        padding: 0,
                        borderRadius: 'unset',
                      },
                    }}
                    inputProps={{
                      maxLength: 1,
                      sx: {
                        p: 0,
                        textAlign: 'center',
                        width: 40,
                      },
                    }}
                  />
                )}
              />
            ))}
          </Stack>
          <Box sx={{ textAlign: 'center', mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Timer1 color={theme.palette.text.secondary} />
            <Typography variant="h5" color="text.secondary" sx={{ ml: 1 }}>
              {minutes} : {seconds}
              {/* 1:32 */}
            </Typography>
          </Box>

          <Box sx={{ px: 2 }}>
            {minutes < '00' && seconds < '00' ? (
           
                  <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ my: 3, px: 2 }}
                  color="primary"
                  loading={isSubmitting}
                >
                  Resend
                </LoadingButton>
            ) : (
              <LoadingButton            
              fullWidth
              disabled={!isValid}
              size="large"
              type="submit"
              variant="contained"
              sx={{ my: 3, px: 2 }}
              color="primary"
              loading={isSubmitting}
            >
              Submit
            </LoadingButton>

         
            )}
          </Box>
        </form>
      </Box>
    </>
  );
}
