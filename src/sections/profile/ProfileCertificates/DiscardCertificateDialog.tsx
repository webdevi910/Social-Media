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
import { useUpsertCertificateMutation } from '../../../_requests/graphql/profile/certificates/Mutations/upsertCertificate.generated';
function DiscardCertificate() {
  const { enqueueSnackbar } = useSnackbar();
  const userCertificate = useSelector(userCertificateSelector);
  const [upsertCertificate, { isLoading }] = useUpsertCertificateMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();

  // function !
  // click on Diskard
  function handleDiscardCertificate() {
    dispatch(certificateCleared({ audience: AudienceEnum.Public }));
    router.push('/profile/certificate-list');
  }

  // click on Save to mutaiation data and from Redux
  const handleSaveCertificate = async () => {
    const resData: any = await upsertCertificate({
      filter: {
        dto: {
          id: userCertificate?.id,
          certificateNameId: userCertificate?.certificateName?.id,
          issuingOrganizationId: userCertificate?.issuingOrganization?.id,
          credentialDoesExpire: userCertificate?.credentialDoesExpire,
          issueDate: userCertificate?.issueDate,
          credentialID: userCertificate?.credentialID,
          credentialUrl: userCertificate?.credentialUrl,
          audience: userCertificate?.audience,
        },
      },
    });
    if (resData?.data?.upsertCertificate.isSuccess) {
      enqueueSnackbar('The certificate has been successfully added ', { variant: 'success' });
      dispatch(certificateCleared({ audience: AudienceEnum.Public }));
      router.push('/profile/certificate-list');
    } else {
      enqueueSnackbar('It was not successful', { variant: 'error' });
    }
  };

  return (
    <>
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
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <LoadingButton
            loading={isLoading}
            startIcon={<Save2 fontSize="24" variant="Outline" />}
            variant="text"
            color="inherit"
            onClick={handleSaveCertificate}
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

export default DiscardCertificate;
