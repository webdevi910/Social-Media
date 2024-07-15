import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'src/redux/store';
import { AudienceEnum } from 'src/@types/sections/serverTypes';
import { InstituteTypeEnum} from 'src/@types/sections/serverTypes';
import { ArrowLeft, CloseSquare, Save2, TrushSquare } from 'iconsax-react';
import { Box, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { emptyCollege, userCollegesSelector } from 'src/redux/slices/profile/userColloges-slice';
import { useDeletePersonCollegeMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/deletePersonCollege.generated';

export default function CollegeDeleteDialog() {
  const theme = useTheme();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  //Mutation
  const [deleteCurrentCollege , {isLoading}]=useDeletePersonCollegeMutation();
  //For Redux
  const dispatch = useDispatch();
  const userColleges = useSelector(userCollegesSelector);
  const handleDeleteButton = async (currentCollegeId:string) => {
    const resp : any = await deleteCurrentCollege({
      filter: {
        dto: {
        id: currentCollegeId ,
        instituteType:InstituteTypeEnum.College,
      }
    }
    });
    if(resp?.data?.deletePersonCollege?.isSuccess){
      enqueueSnackbar('The college has been successfully deleted', { variant: 'success' });
      dispatch(emptyCollege({ audience: AudienceEnum.Public }))
      router.push('/profile/public-details/')
    }else {
      enqueueSnackbar('It was not successful', { variant: 'error' });
    }
  };
  function handleDiscard() {
    router.back()
  }
  return (
    <Dialog fullWidth={true} open={true} keepMounted onClose={() => router.back()}>
      <Stack spacing={2} sx={{ minWidth: 600, minHeight: 194, py: 3 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2 }} alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              Are you sure to delete this College?
            </Typography>
          </Box>
          <Link href="/profile/edit-college/" passHref>
            <IconButton onClick={() => router.back()}>
              <CloseSquare />
            </IconButton>
          </Link>
        </Stack>
        <Divider />
        <Stack spacing={1} sx={{ px: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer',alignItems:'center' }}>
            <TrushSquare size="24" color={theme.palette.error.main} variant="Outline" />
            <LoadingButton variant="text" loading={isLoading} onClick={() => handleDeleteButton(userColleges?.id as string)}>
              <Typography variant="body2" color="error" >
              Delete College
              </Typography>
            </LoadingButton>
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
    </Dialog>
  );
}
