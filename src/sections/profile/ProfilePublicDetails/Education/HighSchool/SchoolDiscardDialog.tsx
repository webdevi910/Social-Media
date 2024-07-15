import React from 'react';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import { ArrowLeft, CloseSquare, Save2, TrushSquare } from 'iconsax-react';
import { Box, Button, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { schoolWasEmpty, userSchoolsSelector } from 'src/redux/slices/profile/userSchool-slice';
import { useDispatch, useSelector } from 'src/redux/store';
import { useUpdatePersonSchoolMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/updatePersonSchool.generated';
import { useAddPersonSchoolMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/createPersonSchool.generated';
import { AudienceEnum } from 'src/@types/sections/serverTypes';

export default function SchoolDiscardDialog() {
  const theme = useTheme();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  //Mutation
  const [createPersonSchool, { isLoading: createIsLoading, data: userSchool }] = useAddPersonSchoolMutation();
  const [updateCurrentSchool, { isLoading: updateIsLoading, data: editUserSchool }] = useUpdatePersonSchoolMutation();

  //For Redux Tools
  const dispatch = useDispatch();
  const userHighSchool = useSelector(userSchoolsSelector);
  const isEdit = !!userHighSchool?.id;

  // Functions
  const handleSaveSchoolChange = async () => {
    if (isEdit) {
      const response:any =await updateCurrentSchool({
        filter:{
          dto:{
            id: userHighSchool?.id,
            year: userHighSchool?.year,
            schoolId: userHighSchool?.schoolId,
            audience: userHighSchool?.audience,
          },
        }
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
    }
    else{
      const response: any = await createPersonSchool({
        filter: {
          dto: {
            // id: null,
            year: userHighSchool?.year,
            schoolId: userHighSchool?.schoolId,
            audience: userHighSchool?.audience,
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

  const handleDiscard=()=>{
    dispatch(schoolWasEmpty({audience: AudienceEnum.Public }));
    router.push('/profile/public-details/')
  }
  return (
    // <Dialog fullWidth={true} open={true} keepMounted onClose={() => router.back()}>
      <Stack spacing={2} sx={{ minWidth: 600, minHeight: 194, py: 3 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2 }} alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              Do you want to save changes?
            </Typography>
          </Box>
          <Link href="/profile/close-dialog" passHref>
            <IconButton>
              <CloseSquare />
            </IconButton>
          </Link>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <LoadingButton
            loading={createIsLoading || updateIsLoading}
            startIcon={<Save2 fontSize="24" variant="Outline" />}
            variant="text"
            color="inherit"
            onClick={handleSaveSchoolChange}
            sx={{ maxWidth: 130 }}
          >
            <Typography variant="body2" color="text.primary">
              Save Change
            </Typography>
          </LoadingButton>
          <Button
            variant="text"
            color="error"
            startIcon={<TrushSquare size="24" color={theme.palette.error.main} variant="Outline" />}
            onClick={handleDiscard}
            sx={{ maxWidth: 99 }}
          >
            <Typography variant="body2" color="error">
              Discard
            </Typography>
          </Button>
        </Stack>
      </Stack>
    // {/*</Dialog>*/}
  );
}
