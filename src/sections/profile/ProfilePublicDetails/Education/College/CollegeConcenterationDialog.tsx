import React, { useState } from 'react';
import { useRouter } from 'next/router';
import debounceFn from 'src/utils/debounce';
import { useDispatch, useSelector } from 'src/redux/store';
import { Concentration } from 'src/@types/sections/serverTypes';
import AutoCompleteAddable from 'src/components/AutoCompleteAddable';
import { ArrowLeft, CloseSquare, SearchNormal1 } from 'iconsax-react';
import { Dialog, IconButton, Stack, Typography, Divider, useTheme, Box } from '@mui/material';
import { userCollegeUpdated, userCollegesSelector } from 'src/redux/slices/profile/userColloges-slice';
import { useLazySearchConcentrationsQuery } from 'src/_requests/graphql/profile/publicDetails/queries/concentration.generated';
import { useCreateConcentrationMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/createConcentraition.generated';

export default function CollegeConcenterationDialog() {
  const theme = useTheme();
  const router = useRouter();
  const [searching, setSearching] = useState<boolean>();

  // Query
  const [concentration, { data, isFetching }] = useLazySearchConcentrationsQuery();
  // Mutation
  const [createConcentration] = useCreateConcentrationMutation();

  const dispatch = useDispatch();
  const userColleges = useSelector(userCollegesSelector);
  const handleChange = async (value: Concentration & { inputValue: string }) => {
    if (value.inputValue) {
      const response: any = await createConcentration({
        filter: {
          dto: {
            title: value.inputValue,
          },
        },
      });
      if (response?.data?.createConcentration?.isSuccess) {
        const concentrationData = response?.data?.createConcentration?.listDto?.items?.[0];
        dispatch(
          userCollegeUpdated({
            concentrationDto: { id: concentrationData?.id, title: concentrationData?.title },
          })
        );
        // router.push('/profile/add-collage/');
      }
    } else {
      dispatch(
        userCollegeUpdated({
          concentrationDto: value,
        })
      );
    }
  };
  const handleInputChange = (val: string) => {
    if (!!val) {
      setSearching(true);
    } else {
      setSearching(false);
    }
    debounceFn(() =>
      concentration({
        filter: {
          dto: {
            title: val,
          },
        },
      })
    );
  };

  return (
    <Dialog fullWidth={true} open={true} keepMounted onClose={() => router.back()}>
      <Stack spacing={2} sx={{ py: 3, minHeight: 320 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2, justifyContent: 'space-between' }} alignItems="center">
          <Stack direction="row" spacing={2}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              Concenteration
            </Typography>
          </Stack>
          <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
            <CloseSquare variant="Outline" color={theme.palette.text.primary} />
          </IconButton>
        </Stack>
        <Divider />
        <Stack sx={{ px: 2 }}>
          <AutoCompleteAddable
            loading={isFetching}
            onInputChange={(ev, val) => handleInputChange(val)}
            onChange={(ev, val) => handleChange(val)}
            options={data?.concentrations?.listDto?.items || []}
            placeholder="Search"
          />
          <Box>
            <Box mt={6} />
            {!searching && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.seconary">
                  Start typing to find your school
                </Typography>
              </Box>
            )}
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  );
}
