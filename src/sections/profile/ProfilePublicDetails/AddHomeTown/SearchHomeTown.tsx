import { Box, Dialog, Divider, IconButton, Stack, TextField, Typography, Button } from '@mui/material';
import { CloseSquare, SearchNormal1 } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft } from 'iconsax-react';
import debounceFn from 'src/utils/debounce';
import { useLazySearchCitiesQuery } from 'src/_requests/graphql/locality/queries/searchCities.generated';
import { useDispatch } from 'src/redux/store';
import { userLocationUpdated } from 'src/redux/slices/profile/userLocation-slice';
import { LocationType } from 'src/@types/sections/profile/publicDetails';
import AutoComplete from 'src/components/AutoComplete';
import { userLocationSelector } from 'src/redux/slices/profile/userLocation-slice';
import { useSelector } from 'src/redux/store';

function HomeTown() {
  const [searchCities, { data, isFetching }] = useLazySearchCitiesQuery();
  const router = useRouter();
  const dispatch = useDispatch();
  const [searching, setSearching] = useState<boolean>();
  const userCity = useSelector(userLocationSelector);

  const handleInputChange = (val: string) => {
    if (!!val) {
      setSearching(true);
    } else {
      setSearching(false);
    }
    debounceFn(() =>
      searchCities({
        filter: {
          dto: {
            seearchValue: val,
          },
        },
      })
    );
  };

  const handleChange = (val: LocationType['city']) => {
    dispatch(
      userLocationUpdated({
        city: val,
      })
    );
    router.back();
  };
  useEffect(() => {
    if (!userCity) router.push('/profile/public-details');
  }, [userCity, router]);
  return (
    <Dialog fullWidth={true} open={true} keepMounted onClose={() => router.back()}>
      <Stack spacing={2} sx={{ minWidth: 600, minHeight: 320, py: 3 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2 }} alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              Home Town
            </Typography>
          </Box>
          <Link href="/profile/close-dialog-home-town" passHref>
            <IconButton>
              <CloseSquare />
            </IconButton>
          </Link>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <AutoComplete
            loading={isFetching}
            onInputChange={(ev, val) => handleInputChange(val)}
            onChange={(ev, val) => handleChange(val)}
            options={data?.searchCities?.listDto?.items || []}
            getOptionLabel={(option) => option.name}
            placeholder="Search"
          />
          {!searching && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Typography color="text.secondary" variant="body2">
                  Start typing to find your Home Town
                </Typography>
              </Box>
            </Box>
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default HomeTown;
