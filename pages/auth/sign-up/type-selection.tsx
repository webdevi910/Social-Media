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
import { UserTypeSelection } from 'src/sections/auth';
import { useSession } from 'next-auth/react';

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
  backgroundColor: theme.palette.grey[50],
  margin: 'auto',
  padding: theme.spacing(2),
}));

const JoinSectionStyle = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(5),
  padding: theme.spacing(1.5, 0),
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.spacing(1),
}));

export default function TypeSelection() {
  const a = useSession()
  return (
    <GuestGuard>
      <Page title="User Type Selection">
        <RootStyle>
          <HeaderStyle>
            <Logo />
          </HeaderStyle>

          <Container maxWidth="sm">
            <ContentStyle>
              <Stack alignItems="center">
                <Typography variant="h4" color="text.primary">
                  Select User Type
                </Typography>
                <Box sx={{ backgroundColor: 'primary.main', width: 111, borderRadius: 100, height: 4, my: 1 }} />
                <Typography variant="subtitle1" color="text.secondary">
                  Seize The Day
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.disabled" variant="body1">
                  Are you ?
                </Typography>
              </Stack>
              <Box mt={3} />

              <UserTypeSelection />

              <JoinSectionStyle direction="row" spacing={1}>
                <Typography variant="body1" color="text.secondary">
                  Already have an account?
                </Typography>
                <NextLink href={PATH_AUTH.signIn} passHref>
                  <Link variant="subtitle1" color="primary.main" sx={{ textDecoration: 'none' }}>
                    Sing In
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
