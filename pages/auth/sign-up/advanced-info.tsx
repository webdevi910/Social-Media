// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from 'src/routes/paths';
// guards
import GuestGuard from 'src/guards/GuestGuard';
// components
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
// sections
import { NGOCompanyInfoForm, NormalUserInfoForm } from 'src/sections/auth';
import { useRouter } from 'next/router';
import { useSelector } from 'src/redux/store';
import { signUpUserTypeSelector } from 'src/redux/slices/auth';
import { SignUpUserTypes } from 'src/@types/auth';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.grey[200],
  padding: theme.spacing(3, 0),
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'fixed',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(3, 8),
  },
}));

const ContentStyle = styled(Card)(({ theme }) => ({
  maxWidth: 416,
  margin: 'auto',
  padding: theme.spacing(2),
}));

// ----------------------------------------------------------------------

export default function AdvancedInfo() {
  const router = useRouter();

  const userType = useSelector(signUpUserTypeSelector);

  if (!userType) {
    router.push(PATH_AUTH.signUp.typeSelection);
    return null;
  }

  return (
    <GuestGuard>
      <Page title="Sign In">
        <RootStyle>
          <HeaderStyle>
            <Logo />
          </HeaderStyle>

          <Container maxWidth="sm">
            <ContentStyle>
              <Stack alignItems="center">
                <Typography variant="h4" color="text.primary">
                  Complete Your Registration
                </Typography>
                <Box sx={{ backgroundColor: 'primary.main', width: 111, borderRadius: 100, height: 4, my: 1 }} />
                <Typography variant="subtitle1" color="text.secondary">
                  Seize The Day
                </Typography>
              </Stack>

              <Box mt={3} />

              {userType === SignUpUserTypes.Normal && <NormalUserInfoForm />}
              {(userType === SignUpUserTypes.NGO || userType === SignUpUserTypes.Company) && <NGOCompanyInfoForm />}
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
