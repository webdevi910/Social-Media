import { Box, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArrowLeft, CloseSquare, Save2, TrushSquare } from 'iconsax-react';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUpdateRelationshipMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/updateRelationship.generated';
import { userRelationShipSelector } from 'src/redux/slices/profile/userRelationShip-slice';
import {  useSelector } from 'src/redux/store';

function DiscardRelationship() {
  const [privacy, setPrivacy] = React.useState();
  const router = useRouter();
  const theme = useTheme();
  const relationShip = useSelector(userRelationShipSelector);



  const [updateRelationship, { isLoading }] = useUpdateRelationshipMutation();

  const handelSaveChange = async () => {
    const result: any = await updateRelationship({
      filter: {
        dto: {
          audience:relationShip?.audience,
          relationshipStatusId:relationShip?.relationshipStatus?.id
          
        },
      },
    });
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
              Do you want to save changes?
            </Typography>
          </Box>
          <Link href="/profile/close-dialog-relationship" passHref>
            <IconButton>
              <CloseSquare />
            </IconButton>
          </Link>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer', maxWidth: 130 }} onClick={handelSaveChange}>
            <Save2 fontSize="24" variant="Outline" />
            <Typography variant="body2" color="text.primary">
              Save Change
            </Typography>
          </Box>
          <Box
            sx={{ display: 'flex', gap: 2, cursor: 'pointer', maxWidth: 99 }}
            onClick={() => router.push('/profile/public-details')}
           >
            <TrushSquare size="24" color={theme.palette.error.main} variant="Outline" />
            <Typography variant="body2" color="error">
              Discard
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default DiscardRelationship;
