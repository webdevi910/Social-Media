// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Link, Container, Typography, useTheme, IconButton, Stack } from '@mui/material';
// routes
import { PATH_AUTH } from 'src/routes/paths';
// layouts
import Layout from 'src/layouts';
// components
import Page from 'src/components/Page';
// sections
import VerifyCodeForm from 'src/sections/profile/ProfileContactInfo/userEmails/VerifyCodeForm';
import { ArrowLeft, ArrowLeft2 } from 'iconsax-react';
import Logo from 'src/components/Logo';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',

  alignItems: 'center',
}));

// ----------------------------------------------------------------------

export default function Verify() {
  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      <Page title="Verify" sx={{ height: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2, backgroundColor: 'background.paper' }}>
          <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
            <ArrowLeft color={theme.palette.text.secondary} />
          </IconButton>
          <Typography variant="subtitle1" color="text.primary">
            Verify Email
          </Typography>
        </Stack>
        <RootStyle>
          <Container sx={{ mt:4}}>
            <Box sx={{ backgroundColor: 'background.paper', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Typography variant="h4" color="text.primary" sx={{ pt: 3 }}>
                  Is it Really you?
                </Typography>
              </Box>

              <Box sx={{ mt: 8, mb: 3 }}>
                <VerifyCodeForm />
              </Box>
            </Box>
          </Container>
        </RootStyle>
      </Page>
    </>
  );
}
