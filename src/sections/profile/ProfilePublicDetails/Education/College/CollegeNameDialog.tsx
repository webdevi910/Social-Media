import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import debounceFn from 'src/utils/debounce';
import { useDispatch, useSelector } from 'src/redux/store';
import AutoCompleteAddable from 'src/components/AutoCompleteAddable';
import { ArrowLeft, CloseSquare, SearchNormal1 } from 'iconsax-react';
import { InstituteTypeEnum } from 'src/@types/sections/serverTypes';
import { Dialog, IconButton, Stack, Typography, Divider, useTheme, Box } from '@mui/material';
import { userCollegeUpdated } from 'src/redux/slices/profile/userColloges-slice';
import { useLazySearchCollegesQuery } from 'src/_requests/graphql/profile/publicDetails/queries/searchColleges.generated';
import { useCreateCollegeMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/createCollege.generated';

type collegeType = {
  id: string;
  title?: string;
};
export default function CollegeNameDialog() {
  const theme = useTheme();
  const router = useRouter();
  const [searching, setSearching] = useState<boolean>();

  //Query
  const [searchCollege, { data, isFetching }] = useLazySearchCollegesQuery();
  //refactor type of query
  const searchCollegeName = useMemo(
    () => data?.searchColleges?.listDto?.items?.map((item) => ({ id: item?.id, title: item?.name })),
    [data?.searchColleges?.listDto?.items]
  );
  //get Search Query
  const handleInputChange = (val: string) => {
    setSearching(!!val.length)
    debounceFn(() =>
      searchCollege({
        filter: {
          dto: {
            name: val,
            instituteType: InstituteTypeEnum.College,
          },
        },
      })
    );
  };

  //Mutation
  const [createCollege] = useCreateCollegeMutation();
  //For Redux Tools
  const dispatch = useDispatch();
  const handleChange = async (value: collegeType & { inputValue?: string }) => {
    if (value.inputValue) {
      //mutation create college name
      const response: any = await createCollege({
        filter: {
          dto: {
            name: value.inputValue,
            instituteType: InstituteTypeEnum.College,
          },
        },
      });
      if (response?.data?.createCollege?.isSuccess) {
        const collegeData = response?.data?.createCollege?.listDto?.items?.[0];
        dispatch(
          userCollegeUpdated({
            collegeDto: { id: collegeData.id, name: collegeData.name },
          })
        );
        // router.back();
      }
    } else {
      dispatch(
        userCollegeUpdated({
          collegeDto: {id: value.id, name: value.title},
        })
      );
    }
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
              College Name
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
            options={searchCollegeName || []}
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
