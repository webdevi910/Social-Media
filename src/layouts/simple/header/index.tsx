// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, TextField, InputAdornment } from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER, NAVBAR, SIZES } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import ContactsPopover from './ContactsPopover';
import NotificationsPopover from './NotificationsPopover';
import MaxWidth from 'src/components/MaxWidth';
import Image from 'next/image';
import MoneyPopover from './MoneyPopover';

// ----------------------------------------------------------------------

type RootStyleProps = {
  isCollapse: boolean;
  isOffset: boolean;
  verticalLayout: boolean;
};

interface IIconWrapper {
  active?: boolean;
}

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})<RootStyleProps>(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  backgroundColor: '#ffffff ',
  width: '100%',
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    // width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    // ...(isCollapse && {
    //   width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    // }),
    // ...(isOffset && {
    //   height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    // }),
    // ...(verticalLayout && {
    //   width: '100%',
    //   height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    //   backgroundColor: theme.palette.background.default,
    // }),
  },
}));

const IconWrapper = styled(Stack, { shouldForwardProp: (prop) => prop !== '' })<IIconWrapper>(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  height: 'fit-content',
}));
// ----------------------------------------------------------------------

type Props = {
  onOpenSidebar: VoidFunction;
  isCollapse?: boolean;
  verticalLayout?: boolean;
};

export default function Header({ onOpenSidebar, isCollapse = false, verticalLayout = false }: Props) {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');

  return (
    // <MaxWidth height={HEADER.DASHBOARD_DESKTOP_HEIGHT}>
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          paddingRight: '0!important',
          paddingLeft: '0!important',
          maxWidth: SIZES.lg,
          width: '100%',
          margin: '0 auto',
          minWidth: SIZES.lg,
        }}
      >
        {/* {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )} */}

        {/* <Searchbar /> */}
        {/* <Box sx={{ flexGrow: 1 }} /> */}

        {/* <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <LanguagePopover />
          <NotificationsPopover />
          <ContactsPopover />
          <AccountPopover />
        </Stack> */}

        <Stack direction="row" spacing={6}>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Image id="header-logo" src="/icons/Logo.svg" width={40} height={40} />
            <TextField
              size="small"
              id="header-search"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Image src="/icons/Research/Outline.svg" width={SIZES.icon} height={SIZES.icon} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack alignItems="center" spacing={17} direction="row">
            <IconWrapper justifyContent="center" active id="header-house">
              <Image alt="header-house" src="/icons/House/24/Outline.svg" width={SIZES.icon} height={SIZES.icon} />
            </IconWrapper>
            <IconWrapper justifyContent="center" id="header-users">
              <Image alt="header-users" src="/icons/users/24/Outline.svg" width={SIZES.icon} height={SIZES.icon} />
            </IconWrapper>
            <IconWrapper justifyContent="center" id="header-notification">
              <Image
                alt="header-notification"
                src="/icons/Bell/24/Outline.svg"
                width={SIZES.icon}
                height={SIZES.icon}
              />
            </IconWrapper>
            <IconWrapper justifyContent="center" id="header-messanger">
              <Image
                alt="header-messanger "
                src="/icons/facebook messenger/24/Outline.svg"
                width={SIZES.icon}
                height={SIZES.icon}
              />
            </IconWrapper>
          </Stack>

          <Stack direction="row">
            <AccountPopover />
            <MoneyPopover />
          </Stack>
        </Stack>
      </Toolbar>
    </RootStyle>
    // </MaxWidth>
  );
}
