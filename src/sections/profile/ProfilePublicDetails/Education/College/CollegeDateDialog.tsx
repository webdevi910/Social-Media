import React, { VFC } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'iconsax-react';
import { useDispatch } from 'src/redux/store';
import DatePicker from 'src/components/DatePicker';
import { Dialog, IconButton, Stack, Typography, Divider, Box, useTheme } from '@mui/material';
import { userCollegeUpdated } from 'src/redux/slices/profile/userColloges-slice';

interface CollegUniversityDateDialogProps {
  isEndDate?: boolean;
}

const CollegeDateDialog: VFC<CollegUniversityDateDialogProps> = (props) => {
  const { isEndDate = false } = props;//destruct props
  const router = useRouter();
  const theme = useTheme();

  //ّFor Redux
  const dispatch = useDispatch();
  const handleChange = (value: Date) => {
    if (!isEndDate)
      dispatch(
        userCollegeUpdated({
          startDate: value,
          // startDate:new Date(value).toISOString()
        })
      );
    else
      dispatch(
        userCollegeUpdated({
          endDate: value.toISOString(),
        })
      );
  };

  return (
    <Dialog maxWidth="sm" open keepMounted onClose={() => router.back()}>
      <Stack spacing={2} sx={{ py: 3, minHeight: 320 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2, justifyContent: 'space-between' }} alignItems="center">
          <Stack direction="row" spacing={2}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              {/* Start Date */}
              {!isEndDate?'Start Date':'End Date'}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Box>
          <DatePicker value={new Date(2020, 1)} views={['month', 'year']} onChange={handleChange} />
        </Box>
      </Stack>
    </Dialog>
  );
};
export default CollegeDateDialog;
