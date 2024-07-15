import React from 'react';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import { useSelector, useDispatch } from 'src/redux/store';
import { ArrowLeft, CloseSquare, Save2, TrushSquare } from 'iconsax-react';
import { Box, Dialog, Divider, IconButton, Stack, Typography, Button, useTheme } from '@mui/material';
import { useDeletePersonSchoolMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/deletePersonSchool.generated';
import { schoolWasEmpty, userSchoolsSelector } from 'src/redux/slices/profile/userSchool-slice';
import { AudienceEnum } from 'src/@types/sections/serverTypes';

export default function SchoolDeleteDialog() {
  const theme = useTheme();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  //Mutation
  const [deleteCurrentSchool, { isLoading }] = useDeletePersonSchoolMutation();
  //For Redux
  const dispatch = useDispatch();
  const userHighSchool = useSelector(userSchoolsSelector);

  // Functions
  const handleDeleteButton = async (currentSchoolId: string) => {
    const response: any = await deleteCurrentSchool({
      filter: {
        dto: {
          id: currentSchoolId,
        },
      },
    });
    if (response?.data?.deletePersonSchool?.isSuccess) {
      enqueueSnackbar('The school has been successfully deleted', { variant: 'success' });
      dispatch(schoolWasEmpty({ audience: AudienceEnum.Public }));
      router.push('/profile/public-details/');
    } else {
      enqueueSnackbar('It was not successful', { variant: 'error' });
    }
  };
  function handleDiscard() {
    router.back();
  }

  return (
    // <Dialog fullWidth={true} open={true} keepMounted onClose={() => router.back()}>
      <Stack spacing={2} >
        {/* sx={{ minWidth: 600, minHeight: 194, py: 3 }} */}
        <Stack direction="row" spacing={2} sx={{ px: 2 }} alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              Are you sure to delete this High School?
            </Typography>
          </Box>
          <Link href="/profile/edit-college/" passHref>
            <IconButton>
              <CloseSquare />
            </IconButton>
          </Link>
        </Stack>
        <Divider />
        <Stack spacing={1} sx={{ px: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer',alignItems:'center'}}>
            <TrushSquare size="24" color={theme.palette.error.main} variant="Outline" />
            <LoadingButton
              variant="text"
              loading={isLoading}
              sx={{p:0}}
              onClick={() => handleDeleteButton(userHighSchool?.id as string)}
            >
              <Typography variant="body2" color="error">
                Delete High School
              </Typography>
            </LoadingButton>
            {/* <Button variant="text" color="error" onClick={() => router.push('/profile/delete-college/')}>
                <Typography variant="button">Delete</Typography>
              </Button> */}
          </Box>
          <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer', maxWidth: 99 }}>
            <Save2 fontSize="24" variant="Outline" />
            <Link href="/profile/edit-college/" passHref>
              <Typography variant="body2" color="text.primary" onClick={handleDiscard}>
                Discard
              </Typography>
            </Link>
          </Box>
        </Stack>
      </Stack>
    // </Dialog>
  );
}
