import {
    Box,
    Dialog,
    Divider,
    IconButton,
    Stack,
    TextField,
    Typography,
    useTheme,
    InputAdornment,
  } from '@mui/material';
  import { ArrowLeft, CloseCircle, Save2, Lock, Eye, EyeSlash } from 'iconsax-react';
  import React, { useEffect, useState } from 'react';
  import { useRouter } from 'next/router';
  import { addedEmail, userEmailsSelector } from 'src/redux/slices/profile/userEmails-slice';
  import { useDeleteUserEmailMutation } from 'src/_requests/graphql/profile/contactInfo/mutations/deleteUserEmail.generated';
  import { LoadingButton } from '@mui/lab';
  import { useSnackbar } from 'notistack';
  import { useDispatch, useSelector } from 'src/redux/store';
  import { AudienceEnum } from 'src/@types/sections/serverTypes';
  
  function ConfirmPassword() {
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [valid, setValid] = useState(true);
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const [deleteUserEmail, { isLoading }] = useDeleteUserEmailMutation();
    const personEmail = useSelector(userEmailsSelector);
  ;
    
    const handleDeleteEmail = async () => {
      const resDataDelete: any = await deleteUserEmail({
        filter: {
          dto: {
            id: personEmail?.id,
            password: password,
          },
        },
      });
      // console.log("resDataDelete", resDataDelete.data.deleteUserEmail)
      if (resDataDelete.data.deleteUserEmail?.isSuccess) {
        router.push('/profile/contact-info');
        dispatch(addedEmail({ audience: AudienceEnum.Public }));
      }
  
      if (!resDataDelete.data.deleteUserEmail?.isSuccess) {
        // console.log('messagingKey', resDataDelete.data.deleteUserEmail?.messagingKey);
        enqueueSnackbar(resDataDelete.data.deleteUserEmail?.messagingKey, { variant: 'error' });
      }
    };
  
    return (
      
        <Stack spacing={2} >
          <Stack direction="row" spacing={2} sx={{ p: 2 }} alignItems="center" justifyContent="space-between">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
                <ArrowLeft />
              </IconButton>
              <Typography variant="subtitle1" color="text.primary">
                Delete Email
              </Typography>
            </Box>
           
          </Stack>
        
          <Stack spacing={2} sx={{ px: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="body2" color="text.primary">
                Are you sure you want to remove this email address? To save this setting, please enter your Garden of Love
                password.
              </Typography>
            </Box>
            <TextField
              placeholder="Password"
              name="password"
              value={password}
              size="small"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <Eye /> : <EyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
  
            <LoadingButton
            fullWidth 
            size="small"
             type="submit"
              color="primary"
              variant="contained"
              loading={isLoading}
              onClick={() => handleDeleteEmail()}
              disabled={password.length ? !valid : valid}
              sx={{ maxHeight: '40px' }}
            >
              Confirm
            </LoadingButton>
          </Stack>
          <Divider />
        </Stack>
     
    );
  }
  
  export default ConfirmPassword;
  