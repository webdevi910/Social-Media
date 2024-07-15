import { Box, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArrowLeft, CloseCircle, CloseSquare, Save2, TrushSquare } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'src/redux/store';
import { addedSocialMedia, userSocialMediasSelector } from 'src/redux/slices/profile/userSocialMedia-slice';
import { useDeleteUserSocialMediaMutation } from 'src/_requests/graphql/profile/contactInfo/mutations/deleteUserSocialMedia.generated';
import { AudienceEnum } from 'src/@types/sections/serverTypes';
import { BottomSheet } from 'react-spring-bottom-sheet';
export default function SocialLinkDeleteDialog() {
  const router = useRouter();
  const theme = useTheme();
  const personSocialMedia = useSelector(userSocialMediasSelector);
  const [deleteUserSocialMedia] = useDeleteUserSocialMediaMutation();
  const dispatch = useDispatch();
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);

  function handlerDiscardSocialLink() {
    dispatch(addedSocialMedia({ audience: AudienceEnum.Public }));
    router.push('/profile/contact-info');
  }
  const handleDeleteSocialLink = async () => {
    const resDataDelete: any = await deleteUserSocialMedia({
      filter: {
        dto: {
          id: personSocialMedia?.id,
        },
      },
    });

    if (resDataDelete.data.deleteUserSocialMedia?.isSuccess) {
      router.push('/profile/contact-info');
      dispatch(addedSocialMedia({ audience: AudienceEnum.Public }));
    }
  };
 
  return (
    <BottomSheet
    open={true}
    onDismiss={() => setOpenBottomSheet(false)}
    snapPoints={({ minHeight }) => [minHeight, minHeight]}
  >
      <Stack spacing={2} sx={{ py: 3 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2 }} alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              Are you sure to delete this Socila Link?
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer' }}>
            <TrushSquare size="24" color={theme.palette.error.main} variant="Outline" />

            <Typography variant="body2" color="error" onClick={() => handleDeleteSocialLink()}>
              Delete Socila Link
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer', maxWidth: 99 }}>
            <Save2 fontSize="24" variant="Outline" />

            <Typography variant="body2" color="text.primary" onClick={handlerDiscardSocialLink}>
              Discard
            </Typography>
          </Box>
        </Stack>
      </Stack>
      </BottomSheet>
  );
}
