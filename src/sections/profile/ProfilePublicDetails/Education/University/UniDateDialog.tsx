import React, { VFC } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'iconsax-react';
import { useDispatch } from 'src/redux/store';
import DatePicker from 'src/components/DatePicker';
import { Dialog, IconButton, Stack, Typography, Divider, Button,Box, useTheme } from '@mui/material';
import { userUniversityUpdated ,userUniversitySelector } from 'src/redux/slices/profile/userUniversity-slice';

interface CollegUniversityDateDialogProps {
  isEndDate?: boolean;
}

const UniDateDialog: VFC<CollegUniversityDateDialogProps> =(props)=> {
  const router = useRouter();
  const { isEndDate = false } = props;//destruct props
  //ّFor Redux
  const dispatch = useDispatch();
  const handleChange=(value:Date)=>{
    if (!isEndDate)
      dispatch(
        userUniversityUpdated({
          // startDate:new Date(value).toISOString()
          startDate: value,
        })
      );
    else
    dispatch(
      userUniversityUpdated({
        // endDate: value.toISOString(),
        endDate: value,
      })
    );
  }

  return (
    <Dialog maxWidth="sm" open={true} keepMounted onClose={() => router.back()}>
      <Stack spacing={2} sx={{ py: 3, minHeight: 320 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2, justifyContent: 'space-between' }} alignItems="center">
          <Stack direction="row" spacing={2}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
            {!isEndDate?'Start Date':'End Date'}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Box>
          <DatePicker value={new Date(2020, 1)} views={['month', 'year']} onChange={(date) => handleChange(date)} />
        </Box>
      </Stack>
    </Dialog>
  );
}
export default UniDateDialog;
