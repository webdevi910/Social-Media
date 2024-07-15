import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  IconButton,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import Link from '@mui/material/Link';
import { Add, CloseSquare } from 'iconsax-react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { certificateUpdated } from 'src/redux/slices/profile/userCertificates-slice';
import { useDispatch } from 'src/redux/store';
import { useGetCertificatesQuery } from '../../../_requests/graphql/profile/certificates/queries/getCertificates.generated';
import getMonthName from 'src/utils/getMonthName';
import { AudienceEnum, Certificate } from 'src/@types/sections/serverTypes';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

const NoResultStyle = styled(Stack)(({ theme }) => ({
  maxWidth: 164,
  maxHeight: 164,
  width: 164,
  height: 164,
  background: theme.palette.grey[100],
  borderRadius: '100%',
}));

const CertificateWrapperStyle = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CertificateImage = styled(Stack)(({ theme }) => ({
  width: 48,
  height: 48,
  backgroundColor: theme.palette.grey[100],
}));

function CertificateListDialog() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();

  // query
  const { data, isFetching } = useGetCertificatesQuery({
    filter: {
      dto: {},
    },
  });
  const certificateData = data?.getCertificates?.listDto?.items;

  // functions !!
  function handleEditCertificate(item: Certificate) {
    dispatch(certificateUpdated(item));
    router.push('/profile/Add-certificate');
  }

  const handleRouting = (certificate: Certificate) => {
    dispatch(certificateUpdated(certificate));
    router.push('/profile/Add-certificate');
  };

  return (
    <>
      <Stack sx={{ mb: 2, px: 2, pt: 3 }} direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1">Certificate</Typography>
        <Stack direction="row" spacing={2}>
          {/* FIXME add primary variant to button variants */}
          {!!certificateData?.length && (
            <Button onClick={() => handleRouting({ audience: AudienceEnum.Public })} variant="contained">
              <Typography variant="button">Add</Typography>
            </Button>
          )}
        </Stack>
      </Stack>
      <Divider />
      {isFetching ? (
        <CircularProgress sx={{ m: 8 }} />
      ) : !certificateData?.length ? (
        <Stack sx={{ py: 6, minHeight: '390px' }} alignItems="center" justifyContent="center">
          <NoResultStyle alignItems="center" justifyContent="center">
            <Typography variant="subtitle1" sx={{ color: (theme) => 'text.secondary', textAlign: 'center' }}>
              No result
            </Typography>
          </NoResultStyle>
          <Box sx={{ mt: 3 }} />
          <Button
            onClick={() => handleRouting({ audience: AudienceEnum.Public })}
            variant="text"
            startIcon={<Add variant="Outline" color={theme.palette.info.main} />}
          >
            {/* FIXME add varient button sm to typography */}
            <Typography color="info.main">Add Experience</Typography>
          </Button>
        </Stack>
      ) : (
        certificateData?.map((certificate, index) => (
          <Box key={certificate?.id}>
            <CertificateWrapperStyle spacing={1} direction="row">
              <CertificateImage alignItems="center" justifyContent="center">
                <Image src="/icons/socials/google.png" width={32} height={32} alt="image" />
              </CertificateImage>
              <Stack sx={{ flex: 1 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2" sx={{ color: 'primary.dark' }}>
                    {certificate?.certificateName?.title}
                  </Typography>
                  <Box onClick={() => handleEditCertificate(certificate)}>
                    <Typography sx={{ color: 'text.secondary', cursor: 'pointer' }} variant="subtitle2">
                      Edit
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
                  issued {getMonthName(new Date(certificate?.issueDate))}{' '}
                  {new Date(certificate?.issueDate).getFullYear()} {bull}
                  {certificate?.credentialDoesExpire
                    ? ` ${getMonthName(new Date(certificate?.expirationDate))} ${new Date(
                        certificate?.expirationDate
                      ).getFullYear()} `
                    : 'No Expiration Date'}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
                  Credential ID {certificate?.credentialID}
                </Typography>
                <Box>
                  {certificate?.credentialUrl && (
                    <NextLink href={certificate?.credentialUrl || ''} passHref>
                      <Link target={'_blank'}>
                        <Button
                          color="inherit"
                          variant="outlined"
                          sx={{ borderColor: 'text.primary', color: 'text.primary', mt: 2 }}
                        >
                          <Typography variant="button">see certificate</Typography>
                        </Button>
                      </Link>
                    </NextLink>
                  )}
                </Box>
              </Stack>
            </CertificateWrapperStyle>
            {index < certificateData?.length - 1 && <Divider />}
          </Box>
        ))
      )}
    </>
  );
}

export default CertificateListDialog;
