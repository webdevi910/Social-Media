// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Container, Typography, Link } from '@mui/material';
// routes
import { PATH_AUTH } from 'src/routes/paths';
// guards
import GuestGuard from 'src/guards/GuestGuard';
// components
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
// sections
import { useRouter } from 'next/router';
import { useSelector } from 'src/redux/store';
import { signUpUserTypeSelector } from 'src/redux/slices/auth';

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

const JoinSectionStyle = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 0),
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function Verification() {
  const router = useRouter();

  const userType = useSelector(signUpUserTypeSelector);

  if (!userType) {
    router.push(PATH_AUTH.signUp.typeSelection);
    return null;
  }

  function secureUsername(username: string) {
    return username;
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
                  Verify Account
                </Typography>
                <Box sx={{ backgroundColor: 'primary.main', width: 111, borderRadius: 100, height: 4, my: 1 }} />
                <Typography variant="subtitle1" color="text.secondary">
                  Enter Verification Code
                </Typography>
              </Stack>
              <Box textAlign="center" px={5}>
                <Typography sx={{ mt: 3 }} variant="body2" color="text.secondary">
                  Enter the 5-digit verification code sent to {secureUsername('phantom')}. Change
                </Typography>
              </Box>
              <Box mt={3} />

              <JoinSectionStyle direction="row" spacing={1}>
                <Typography variant="body1" color="text.secondary">
                  Didn’t Receive Anything?
                </Typography>
                <NextLink href={PATH_AUTH.signIn} passHref>
                  <Link variant="subtitle1" color="primary.main" sx={{ textDecoration: 'none' }}>
                    Resend Code
                  </Link>
                </NextLink>
              </JoinSectionStyle>
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
