import {
  CalendarPicker,
  CalendarPickerProps,
  LocalizationProvider,
  MonthPicker,
  MonthPickerProps,
  PickersDay,
  PickersDayProps,
  YearPicker,
  YearPickerProps,
} from '@mui/lab';
import { Box, Button, Stack, Typography } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { styled } from '@mui/system';

type ModeType = 'day' | 'month' | 'year';

type CustomPickerDayProps = CalendarPickerProps<Date> & {
  ref: any;
};

type CustomPickerMonthProps = MonthPickerProps<Date>;
type CustomPickerYearProps = YearPickerProps<Date>;

const CustomPickersDay = styled(CalendarPicker, {
  shouldForwardProp: (prop) => true,
})<CustomPickerDayProps>(({ theme }) => ({
  '&.MuiCalendarPicker-root': {
    '& div:first-of-type': {
      marginTop: 0,
      marginBottom: 0,
      '& span': {
        flex: 1,
      },
    },
  },
  '& .css-dhopo2': {
    minHeight: 'unset',
    '& > div': {
      position: 'unset',
    },
  },
  '& .PrivatePickersSlideTransition-root': {
    // minHeight: 228,
    '& [role="cell"]': {
      flex: 1,
    },
  },
  '& .MuiTypography-caption': {
    height: 15,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
})) as React.ComponentType<CustomPickerDayProps>;

const CustomPickersMonth = styled(MonthPicker, {
  shouldForwardProp: (prop) => true,
})<CustomPickerMonthProps>(({ theme }) => ({
  '&.MuiMonthPicker-root': {
    width: '100%',
  },
})) as React.ComponentType<CustomPickerMonthProps>;

const CustomPickersYear = styled(YearPicker, {
  shouldForwardProp: (prop) => true,
})<CustomPickerYearProps>(({ theme }) => ({
  '&.MuiYearPicker-root': {
    width: '100%',
    '& .PrivatePickersYear-root': {
      flexBasis: '25%',
      '& button': {
        width: '100%',
        height: 26,
        '&.Mui-selected': {
          borderRadius: 8,
        },
      },
    },
  },
})) as React.ComponentType<CustomPickerYearProps>;

interface DatePickerProps {
  views?: Array<'day' | 'month' | 'year'>;
  onChange?: (date: Date) => void
  value?: Date
}

const DatePicker: FC<DatePickerProps> = (props) => {
  const { onChange, views, value } = props
  const [date, setDate] = useState<Date | null>(value ?? null);
  const [mode, setMode] = useState<ModeType>('day');
  const dayPickerRef = useRef<any>(null);
  const [firstInitilize, setFirstInitilize] = useState<boolean>(false);
  const [presentation, setPresentation] = useState<any>(null);
  useEffect(() => {
    if (dayPickerRef.current && !firstInitilize) {
      setFirstInitilize(false);
      const presentation = dayPickerRef?.current?.querySelector('[role="presentation"]');
      setPresentation(presentation);
    }
  }, [dayPickerRef]);

  useEffect(() => {
    if(!!onChange && date)
    onChange(date as Date)
  },[date, onChange])

  useEffect(() => {
    if (presentation) {
      const pickers = presentation?.getElementsByClassName('PrivatePickersFadeTransitionGroup-root');

      const monthPicker = pickers[0];
      const yearPicker = pickers[1];

      monthPicker.addEventListener('click', () => {
        setMode('month');
      });

      yearPicker.addEventListener('click', () => {
        setMode('year');
      });
    }
  }, [presentation]);

  useEffect(() => {
    if (mode === 'day') {
      const presentation = dayPickerRef?.current?.querySelector('[role="presentation"]');
      setPresentation(presentation);
    }
  }, [mode]);
  return (
    <Stack alignItems="center" justifyContent="center">
      <Stack alignItems="center" justifyContent="center">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {mode === 'day' && (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                width: '100%',
              }}
            >
              <CustomPickersDay
                ref={dayPickerRef}
                views={views || ['day']}
                date={date}
                onChange={(newDate) => setDate(newDate)}
                showDaysOutsideCurrentMonth
              />
            </Stack>
          )}
          {mode === 'month' && (
            <Stack alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
              <Stack justifyContent="center" alignItems="flex-start" sx={{ width: '100%' }}>
                <Button sx={{ width: '33.33%' }}>
                  <Typography
                    sx={{
                      color: 'surface.onSurface',
                    }}
                    variant="subtitle1"
                  >
                    Month
                  </Typography>
                </Button>
              </Stack>

              <CustomPickersMonth
                minDate={new Date(1997, 1, 1)}
                maxDate={new Date(2030, 12, 31)}
                onMonthChange={() => setMode('day')}
                date={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </Stack>
          )}

          {mode === 'year' && (
            <Stack alignItems="center" justifyContent="center" sx={{ height: 230, width: 272 }}>
              <Stack justifyContent="center" alignItems="flex-start" sx={{ width: '100%' }}>
                <Button sx={{ width: '25%' }}>
                  <Typography
                    sx={{
                      color: 'surface.onSurface',
                    }}
                    variant="subtitle1"
                  >
                    Year
                  </Typography>
                </Button>
              </Stack>
              <CustomPickersYear
                date={date}
                isDateDisabled={() => false}
                minDate={new Date(1997, 1, 1)}
                maxDate={new Date(2030, 12, 31)}
                onChange={(newDate) => setDate(newDate)}
                onYearChange={() => setMode('day')}
              />
            </Stack>
          )}
        </LocalizationProvider>
      </Stack>
    </Stack>
  );
};

export default DatePicker;
