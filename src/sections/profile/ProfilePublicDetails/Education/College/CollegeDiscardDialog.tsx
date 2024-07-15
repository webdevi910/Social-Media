import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArrowLeft, CloseSquare, Save2, TrushSquare } from 'iconsax-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React from 'react';
import { AudienceEnum, InstituteTypeEnum } from 'src/@types/sections/serverTypes';
import { emptyCollege, userCollegesSelector } from 'src/redux/slices/profile/userColloges-slice';
import { useDispatch, useSelector } from 'src/redux/store';
import { useUpdatePersonCollegeMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/updatePersonCollege.generated';
import { useAddPersonCollegeMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/createPersonCollege.generated';

export default function CollegeDiscardDialog() {
  const theme = useTheme();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  //For Redux Tools
  const dispatch = useDispatch();
  const userColleges = useSelector(userCollegesSelector);
  const isEdit = !!userColleges?.id;

  //Mutation
  const [createPersonCollege, { isLoading: addIsLoading }] = useAddPersonCollegeMutation();
  const [updateCurrentCollege, { isLoading: updateIsLoading }] = useUpdatePersonCollegeMutation();
  //Functions
  const handleSaveCollegeChange = async () => {
    const startDate = new Date(userColleges?.startDate).toISOString();
    let endDate;
    if (userColleges?.endDate) {
      endDate = new Date(userColleges?.endDate).toISOString();
    }
    if (isEdit) {
      const response: any = await updateCurrentCollege({
        filter: {
          dto: {
            id: userColleges?.id,
            audience: userColleges?.audience,
            collegeId: userColleges?.collegeDto?.id,
            concentrationId: userColleges?.concentrationDto?.id,
            graduated: userColleges?.graduated,
            instituteType: InstituteTypeEnum.College,
            startDate: startDate,
            endDate: endDate,
          },
        },
      });
      if (response?.data?.updatePersonCollege?.isSuccess) {
        enqueueSnackbar('College edited successfully', { variant: 'success' });
        dispatch(emptyCollege({ audience: AudienceEnum.Public }));
        router.push('/profile/public-details/');
      }
    } else {
      const response: any = await createPersonCollege({
        filter: {
          dto: {
            audience: userColleges?.audience,
            graduated: userColleges?.graduated,
            startDate: startDate,
            endDate: endDate,
            collegeId: userColleges?.collegeDto?.id,
            concentrationId: userColleges?.concentrationDto?.id,
            instituteType: InstituteTypeEnum.College,
          },
        },
      });
      if (response?.data?.addPersonCollege?.isSuccess) {
        enqueueSnackbar('College created successfully', { variant: 'success' });
        dispatch(emptyCollege({ audience: AudienceEnum.Public }));
        router.push('/profile/public-details/');
      }
    }
  };
  const handleDiscard = () => {
    dispatch(emptyCollege({ audience: AudienceEnum.Public }));
    router.push('/profile/public-details/');
  };

  return (
    <Dialog fullWidth={true} open={true} keepMounted onClose={() => router.back()}>
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
          <Link href="/profile/public-details" passHref>
            <IconButton>
              <CloseSquare />
            </IconButton>
          </Link>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <LoadingButton
            loading={addIsLoading || updateIsLoading}
            startIcon={<Save2 fontSize="24" variant="Outline" />}
            variant="text"
            color="inherit"
            onClick={handleSaveCollegeChange}
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
    </Dialog>
  );
}
