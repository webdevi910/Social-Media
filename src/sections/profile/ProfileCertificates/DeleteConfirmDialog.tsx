import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArrowLeft, CloseSquare, Save2, TrushSquare } from 'iconsax-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React from 'react';
import { AudienceEnum } from 'src/@types/sections/serverTypes';
import { certificateCleared, userCertificateSelector } from 'src/redux/slices/profile/userCertificates-slice';
import { useDispatch, useSelector } from 'src/redux/store';
import { useDeleteCertificateMutation } from '../../../_requests/graphql/profile/certificates/Mutations/deleteCertificate.generated';


function DeleteConfirmDialog() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const userCertificate = useSelector(userCertificateSelector);
  const [deleteCertificate, { isLoading }] = useDeleteCertificateMutation();

  // functions !
  const handleDeleteCertificate = async () => {
    const resDeleteData: any = await deleteCertificate({
      filter: {
        dto: {
          id: userCertificate?.id,
        },
      },
    });
    if (resDeleteData?.data?.deleteCertificate?.isSuccess) {
      enqueueSnackbar('The certificate has been successfully deleted', { variant: 'success' });
      dispatch(certificateCleared({ audience: AudienceEnum.Public }));
      router.push('/profile/certificate-list');
    } else {
      enqueueSnackbar('It was not successful', { variant: 'error' });
    }
  };

  function handleDiscardCertificate() {
    dispatch(certificateCleared({ audience: AudienceEnum.Public }));
    router.push('/profile/certificate-list');
  }

  return (
    <>
      <Stack spacing={2} sx={{ minWidth: 600, minHeight: 194, py: 3 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2 }} alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              Are you sure to delete the current certificate?
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <LoadingButton
            loading={isLoading}
            startIcon={<Save2 fontSize="24" variant="Outline" />}
            variant="text"
            color="inherit"
            onClick={handleDeleteCertificate}
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
            onClick={handleDiscardCertificate}
            sx={{ maxWidth: 99 }}
          >
            <Typography variant="body2" color="error">
              Discard
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

export default DeleteConfirmDialog;
