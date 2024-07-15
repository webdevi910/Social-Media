import { Box, Dialog, Divider, IconButton, Stack, Typography } from '@mui/material';
import { ArrowLeft } from 'iconsax-react';
import { useRouter } from 'next/router';
import React from 'react';
import { Scalars } from 'src/@types/sections/serverTypes';
import DatePicker from 'src/components/DatePicker';
import { certificateUpdated } from 'src/redux/slices/profile/userCertificates-slice';
import { useDispatch } from 'src/redux/store';

function ExpirationDateDialog() {
  const dispatch = useDispatch();
  const router = useRouter();

  // functions !
  // send date to Redux
  const handleChangeDatePicker = (value: Scalars['DateTime']) => {
    dispatch(
      certificateUpdated({
        expirationDate: value,
      })
    );
  };

  return (
    <>
      <Stack sx={{ marginBottom: 2, pt: 3, px: 2 }} direction="row" alignItems="center" spacing={2}>
        <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
          <ArrowLeft />
        </IconButton>
        <Typography variant="subtitle1">Expiration Date</Typography>
        {/* FIXME add primary variant to button variants */}
      </Stack>
      <Divider />

      <Box sx={{ p: 3 }}>
        <DatePicker
          value={new Date(2020, 1)}
          views={['month', 'year']}
          onChange={(date) => handleChangeDatePicker(date)}
        />
      </Box>
    </>
  );
}

export default ExpirationDateDialog;
