import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'src/redux/store';
import AutoCompleteAddable from 'src/components/AutoCompleteAddable';
import { ArrowLeft, CloseSquare } from 'iconsax-react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { Dialog, IconButton, Stack, Typography, Divider, useTheme, Box } from '@mui/material';
import { useLazySearchSchoolsQuery } from 'src/_requests/graphql/profile/publicDetails/queries/searchSchools.generated';
import { useCreateSchoolMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/createSchool.generated';
import { School } from 'src/@types/sections/serverTypes';
import { userSchoolUpdated } from 'src/redux/slices/profile/userSchool-slice';
import debounceFn from 'src/utils/debounce';

export default function SchoolName() {
  const router = useRouter();
  const theme = useTheme();
  const [searching, setSearching] = useState<boolean>();
  const [openSchoolNameBottomSheet, setOpenSchoolNameBottomSheet] = useState<boolean>(true);


  // Query
  const [searchSchool, { data, isFetching }] = useLazySearchSchoolsQuery();

  const handleInputChange = (val: string) => {
    // if (!!val) {
    //   setSearching(true);
    // } else {
    //   setSearching(false);
    // }
    setSearching(!!val.length)
    debounceFn(() =>
      searchSchool({
        filter: {
          dto: {
            title: val,
          },
        },
      })
    );
  };

  // Mutation
  const [createSchool] = useCreateSchoolMutation();
  // For Redux
  const dispatch = useDispatch();
  const handleChange = async (value: School & { inputValue?: string }) => {
    if (value.inputValue) {
      //add mutation func
      const response: any = await createSchool({
        filter: {
          dto: {
            title: value.inputValue,
          },
        },
      });
      if (response?.data?.createSchool?.isSuccess) {
        // router.push('/profile/add-highSchool/');
        const data=response?.data?.createSchool?.listDto?.items?.[0];
        dispatch(
          userSchoolUpdated({
            school: {
              id: data.id,
              title: data.title,
            },
          })
        );
        // router.back();
      }
    } else {
      
      dispatch(
        userSchoolUpdated({
          school: value,
        })
      );
    }
  };

  return (
    // <Dialog fullWidth={true} open={true} keepMounted onClose={() => router.back()}>
      <Stack spacing={2} sx={{ py: 3, minHeight: 320 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2, justifyContent: 'space-between' }} alignItems="center">
          <Stack direction="row" spacing={2}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              High School Name
            </Typography>
          </Stack>
          <IconButton sx={{ p: 0 }} onClick={() => router.push('/profile/public-details/')}>
            <CloseSquare variant="Outline" color={theme.palette.text.primary} />
          </IconButton>
        </Stack>
        <Divider />
        <Stack sx={{ px: 2 }}>
          <AutoCompleteAddable
            loading={isFetching}
            onInputChange={(ev, val) => handleInputChange(val)}
            onChange={(ev, val) => handleChange(val)}
            options={data?.searchSchools?.listDto?.items || []}
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
  );
}
