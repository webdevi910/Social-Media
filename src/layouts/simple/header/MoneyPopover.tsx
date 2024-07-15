import { useSnackbar } from 'notistack';
import { useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar } from '@mui/material';
// routes
import { PATH_APP, PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import MyAvatar from '../../../components/MyAvatar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import Image from 'next/image';
import { SIZES } from 'src/config';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: PATH_APP.root,
  },
  {
    label: 'Settings',
    linkTo: PATH_APP.root,
  },
];

// ----------------------------------------------------------------------

export default function MoneyPopover() {
  const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        // sx={{
        //   p: 0,
        //   ...(open && {
        //     '&:before': {
        //       zIndex: 1,
        //       content: "''",
        //       width: '100%',
        //       height: '100%',
        //       borderRadius: '50%',
        //       position: 'absolute',
        //       bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
        //     },
        //   }),
        // }}
      >
        <Stack spacing={8} direction="row">
          <Image width={SIZES.icon} height={SIZES.icon} alt="account" src="/icons/dollar coin/24/Outline.svg" />

          <Image width={SIZES.icon} height={SIZES.icon} alt="account" src="/icons/down arrow/24/Outline.svg" />
        </Stack>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <NextLink key={option.label} href={option.linkTo} passHref>
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            </NextLink>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </MenuPopover>
    </>
  );
}
