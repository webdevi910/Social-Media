import { Box, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArrowLeft, CloseSquare, Save2, TrushSquare } from 'iconsax-react';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useDeleteWebSiteMutation } from 'src/_requests/graphql/profile/contactInfo/mutations/deleteWebSite.generated';
import { useSelector } from 'react-redux';
import { userWebsiteSelector } from 'src/redux/slices/profile/userWebsite-slice';

function ConfirmDeleteWebsite() {
  const router = useRouter();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const deleteWebsite = useSelector(userWebsiteSelector);
  const [deletePersonWebsite] = useDeleteWebSiteMutation();

  const handleClickDeleteButton = async () => {
    const resDataDelete: any = await deletePersonWebsite({
      filter: {
        dto: {
          id: deleteWebsite?.id,
        },
      },
    });
    if (resDataDelete.data.deleteWebSite?.isSuccess) {
      router.push('/profile/contact-info');
      enqueueSnackbar('Website Deleted', { variant: 'error' });
    }
  };

  return (
    <Stack spacing={2} sx={{ py: 3 }}>
      <Stack direction="row" spacing={2} sx={{ px: 2 }} alignItems="center" justifyContent="space-between">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
            <ArrowLeft />
          </IconButton>
          <Typography variant="subtitle1" color="text.primary">
            Are you sure to delete this Website?
          </Typography>
        </Box>
        <Link href="/profile/edit-website" passHref>
          <IconButton>
            <CloseSquare />
          </IconButton>
        </Link>
      </Stack>
      <Divider />
      <Stack spacing={2} sx={{ px: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer' }}>
          <TrushSquare size="24" color={theme.palette.error.main} variant="Outline" />
          <Box>
            <Typography variant="body2" color="error" onClick={() => handleClickDeleteButton()}>
              Delete Website
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, cursor: 'pointer', maxWidth: 99 }}>
          <Save2 fontSize="24" variant="Outline" />

          <Link href="/profile/edit-website" passHref>
            <Typography variant="body2" color="text.primary">
              Discard
            </Typography>
          </Link>
        </Box>
      </Stack>
    </Stack>
  );
}

export default ConfirmDeleteWebsite;
