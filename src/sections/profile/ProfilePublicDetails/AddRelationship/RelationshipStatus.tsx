import { Box, Dialog, Divider, IconButton, Stack, Typography, Button, CircularProgress } from '@mui/material';
import { CloseSquare, Image } from 'iconsax-react';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft } from 'iconsax-react';
import relationshipIcon from '/public/icons/relationshipIcon.svg';
import SvgIconStyle from 'src/components/SvgIconStyle';
import { userRelationShipSelector, userRelationShipUpdate } from 'src/redux/slices/profile/userRelationShip-slice';
import { useDispatch, useSelector } from 'src/redux/store';
import { RelationshipStatus } from 'src/@types/sections/serverTypes';
import { useGetRelationshipStatusQuery } from 'src/_requests/graphql/profile/publicDetails/queries/getRelationshipStatus.generated';

function RelationshipStatusDialog() {
  const { data: relationship, isFetching: loadingRelationship } = useGetRelationshipStatusQuery({
    filter: {
      all: true,
    },
  });
  const dispatch = useDispatch();
  const relationShip = useSelector(userRelationShipSelector);
  const router = useRouter();
  const handleChangeStatus = (status: RelationshipStatus) => {
    dispatch(userRelationShipUpdate({ ...relationShip, relationshipStatus: status }));
    relationShip.relationshipStatus?.title;
    router.back();
  };

  return (
    <Dialog fullWidth={true} open={true} keepMounted onClose={() => router.back()}>
      <Stack spacing={2} sx={{ minWidth: 600, py: 3 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2 }} alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              Relationship Status
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
          {loadingRelationship ? (
            <CircularProgress />
          ) : (
            relationship?.getRelationshipStatus?.listDto?.items?.map((rel) => (
              <Box
                key={rel?.id}
                sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}
                onClick={() => handleChangeStatus(rel as RelationshipStatus)}
              >
                <SvgIconStyle src={`/icons/relationshipIcon.svg`} sx={{ width: 10, height: 10 }} />
                <Typography variant="body2" color="text.primary">
                  {rel?.title}
                </Typography>
              </Box>
            ))
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default RelationshipStatusDialog;
