import { Box, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArrowLeft, CloseSquare, Save2, TrushSquare } from 'iconsax-react';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUpsertLocationMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/addCurrentCity.generated';
import { useSelector } from 'react-redux';
import { userLocationSelector } from 'src/redux/slices/profile/userLocation-slice';

function DiscardHomeTown() {
  const [privacy, setPrivacy] = React.useState();
  const router = useRouter();
  const theme = useTheme();
  const userCity = useSelector(userLocationSelector);

  const [upsertLocation, { isLoading }] = useUpsertLocationMutation();
  const handelSaveChange = async () => {
    const result: any = await upsertLocation({
      filter: {
        dto: {
          audience: userCity.audience,
          cityId: userCity.cityId,
          id: userCity.id,
          locationType: userCity.locationType,
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
          <Link href="/profile/close-dialog-home-town" passHref>
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

export default DiscardHomeTown;
