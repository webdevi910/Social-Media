import React , { FC }  from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch } from 'src/redux/store';
import DatePicker from 'src/components/DatePicker';
import { ArrowLeft, CloseSquare } from 'iconsax-react';
import { Dialog, IconButton, Stack, Typography, Divider, Box, useTheme } from '@mui/material';
import { userSchoolUpdated , userSchoolsSelector} from 'src/redux/slices/profile/userSchool-slice';

export default function SchoolYearDialog() {
  const router = useRouter();
  const theme = useTheme();
  //ّFor Redux
  const dispatch = useDispatch();
  const handleChange=(value:Date)=>{
    dispatch(
      userSchoolUpdated({
        year:value.getFullYear()
      })
    );
  }


  return (
    <Dialog  maxWidth="sm" open keepMounted onClose={() => router.back()}>
      <Stack spacing={2} sx={{ py: 3, minHeight: 320 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2, justifyContent: 'space-between' }} alignItems="center">
          <Stack direction="row" spacing={2}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              Class Year
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Box>
          <DatePicker value={new Date(2020, 1)} views={['year']} onChange={(date) => handleChange(date)} />
        </Box>
      </Stack>
    </Dialog>
  );
}
