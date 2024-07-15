import * as Yup from 'yup';
// next
import Link from 'next/link';
import { withRouter } from 'next/router';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
// @mui
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  Dialog,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  useTheme,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'src/redux/store';
import { useUpsertUserEmailMutation } from 'src/_requests/graphql/profile/contactInfo/mutations/upsertUserEmail.generated';
import { addedEmail, userEmailsSelector } from 'src/redux/slices/profile/userEmails-slice';
// components
import { ArrowLeft, EyeSlash, Eye } from 'iconsax-react';
import { AudienceEnum, UserEmail, VerificationStatusEnum } from 'src/@types/sections/serverTypes';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import EmailDelete from 'src/sections/profile/ProfileContactInfo/userEmails/EmailDelete';

type EmailValueProps = {
  id?: string;
  email: string;
  audience: AudienceEnum;
  status?: VerificationStatusEnum;
};

export default function UpsertPersonEmailForm() {
  const theme = useTheme();
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [upsertUserEmail, { isLoading }] = useUpsertUserEmailMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const personEmail = useSelector(userEmailsSelector);
    // useEffect(() => {
    //   if(!personEmail) router.push('/profile/contact-info')
    // },[personEmail, router]);

  const EmailSchema = Yup.object().shape({
    email: Yup.string().email().required('Please fill out this field.'),
  });

  const defaultValues = {
    id: personEmail?.id,
    email: personEmail?.email || '',
    audience: personEmail?.audience || AudienceEnum.Public,
    status: personEmail?.status || VerificationStatusEnum.Pending,
  };

  const methods = useForm<EmailValueProps>({
    mode: 'onChange',
    resolver: yupResolver(EmailSchema),
    defaultValues,
  });

  const {
    control,
    getValues,
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  const handleNavigation = (url: string) => {
    dispatch(addedEmail(getValues()));
    router.push(url);
  };

  function closeHandler() {
    if (personEmail?.id) {
      handleNavigation('/profile/email-discard-saveChange');
    } else {
      dispatch(addedEmail({ audience: AudienceEnum.Public }));
      router.push('/profile/contact-info');
    }
  }

  const onSubmit = async (data: EmailValueProps) => {
    const { id, email, audience, status } = data;
    const resData: any = await upsertUserEmail({
      filter: {
        dto: {
          id: id,
          email: email,
          audience: audience,
        },
      },
    });

    if (resData.data?.upsertUserEmail?.isSuccess) {
      dispatch(
        addedEmail({
          status,
          id,
          email,
          audience,
          verificationCode: resData.data?.upsertUserEmail?.listDto?.items?.[0].verificationCode,
        })
      );

      router.push('/profile/contact-info/user-emails/verify/');
    }
    if (!resData.data?.upsertUserEmail?.isSuccess) {
      enqueueSnackbar(resData.data?.upsertUserEmail?.messagingKey, { variant: 'error' });
    }
  };

  const handleBackRoute = () => {
    dispatch(addedEmail({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  };
  return (
    <>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ justifyContent: 'space-between', p: 2 }}>
          <Typography variant="subtitle1" color="text.primary">
            <IconButton sx={{ p: 0, mr: 2 }} onClick={handleBackRoute}>
              <ArrowLeft />
            </IconButton>
            {!personEmail?.id ? 'Add Email' : 'Edit Email'}
          </Typography>
          {!personEmail?.id && (
            <LoadingButton type="submit" size='small' variant="contained" loading={isLoading} disabled={!isDirty || !isValid}>
              Add
            </LoadingButton>
          )}
        </Stack>
       

        <Stack spacing={2} sx={{ px: 2, pt: 2 }}>
          <Typography variant="subtitle2" color="text.primary">
            Email
          </Typography>
          {!personEmail?.id ? (
            <RHFTextField autoComplete="Email" placeholder="Email" type="text" name="email" size="small" />
          ) : (
            <Stack spacing={2}>
              <Stack sx={{ justifyContent: 'space-between', alignItems: 'center' }} direction={"row"}>
                <Box>
                <Typography variant="body2" color="text.primary">
                  {personEmail?.email}
                </Typography>
                </Box>
                <Typography variant="caption" color="primary">
                  {personEmail?.status}
                </Typography>
              </Stack>
            </Stack>
          )}
        </Stack>
        <Divider />

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            justifyContent: 'end',
            px: 2,
            ...(!!personEmail?.id && {
              justifyContent: 'space-between !important',
             
            }),
          }}
        >
          {!!personEmail?.id && (
            <Link href={'/profile/contact-info/user-emails/email-delete'} passHref>
              <Button variant="text" color="error" sx={{ px: 6}} >
                Delete
              </Button>
            </Link>
          )}

          <Controller
            name="audience"
            control={control}
            render={({ field }) => (
              <FormControl>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    upsertUserEmail({
                      filter: {
                        dto: {
                          id: personEmail?.id,
                          email: personEmail?.email,
                          audience: e.target.value as AudienceEnum,
                        },
                      },
                    });
                  }}
                  sx={{ maxHeight: 40 }}
                  renderValue={(value) => (
                    <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
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
    
    
        {/* <EmailDelete />
    */}
     </>
  );
}
