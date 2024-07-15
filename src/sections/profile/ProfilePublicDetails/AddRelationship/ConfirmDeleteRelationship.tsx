import { Box, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArrowLeft, CloseSquare, Save2, TrushSquare } from 'iconsax-react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { userRelationShipSelector } from 'src/redux/slices/profile/userRelationShip-slice';
import { useUpdateRelationshipMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/updateRelationship.generated';
import { useSelector } from 'src/redux/store';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

function ConfirmDeleteRelationship() {
  const router = useRouter();
  const theme = useTheme();
  const relationShip = useSelector(userRelationShipSelector);
  const { enqueueSnackbar } = useSnackbar();

  const [updateRelationship, { isLoading, data: deleteRelationshipData }] = useUpdateRelationshipMutation();

  const handleClickDeleteButton = async () => {
    const resDataDelete: any = await updateRelationship({
      filter: {
        dto: {
          relationshipStatusId: null,
          // relationShip.relationshipStatus?.id
        },
      },
    });
    if (resDataDelete?.data?.updateRelationship?.isSuccess) {
      enqueueSnackbar('Location Deleted successfully', { variant: 'success' });
    } else {
      enqueueSnackbar('Location Deleted failed ', { variant: 'error' });
    }
    router.push('/profile/public-details');
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
              Are you sure to delete this Relationship Status?
            </Typography>
          </Box>
          <Link href="/profile/public-details" passHref>
            <IconButton>
              <CloseSquare />
            </IconButton>
          </Link>
        </Stack>
        <Divider />
        <Stack spacing={1} sx={{ px: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer',alignItems:'center' }}>
            <TrushSquare size="24" color={theme.palette.error.main} variant="Outline" />
            <LoadingButton variant="text" loading={isLoading}>
              <Typography variant="body2" color="error" onClick={() => handleClickDeleteButton()}>
                Delete Relationship Status
              </Typography>
            </LoadingButton>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer', maxWidth: 99 }}>
            <Save2 fontSize="24" variant="Outline" />
            <Link href="/profile/public-details" passHref>
              <Typography variant="body2" color="text.primary">
                Discard
              </Typography>
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default ConfirmDeleteRelationship;
