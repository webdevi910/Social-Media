import { Box, Dialog, Divider, IconButton, Stack, Typography } from '@mui/material';
import { ArrowLeft, CloseSquare } from 'iconsax-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { IssuingOrganization } from 'src/@types/sections/serverTypes';
import AutoCompleteAddable from 'src/components/AutoCompleteAddable';
import { certificateUpdated } from 'src/redux/slices/profile/userCertificates-slice';
import { useDispatch } from 'src/redux/store';
import { useCreateIssuingOrganizationMutation } from '../../../_requests/graphql/profile/certificates/Mutations/createIssuingOrganization.generated';
import { useLazySearchIssuingOrganizationsQuery } from 'src/_requests/graphql/profile/certificates/queries/searchIssuingOrganizations.generated';

function SearchIssingOrganization() {
  const [isTyping, setIsTyping] = useState(false);
  const [searchIssuing, { data: searchIssuingData, isFetching }] = useLazySearchIssuingOrganizationsQuery();
  const [createIssuingOrganization] = useCreateIssuingOrganizationMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChangeInputSearch = (val: string) => {
    // is typing status
    if (val) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
    // Query
    searchIssuing({
      filter: {
        dto: {
          title: val,
        },
      },
    });
  };

  const handleChange = async (value: IssuingOrganization & { inputValue?: string }) => {
    if (value.inputValue) {
      // mutation create Issuing Organization name
      const resData: any = await createIssuingOrganization({
        filter: {
          dto: {
            title: value.inputValue,
          },
        },
      });
      if (resData?.data?.createIssuingOrganization?.isSuccess) {
        const newData = resData?.data?.createIssuingOrganization?.listDto?.items?.[0];
        dispatch(
          certificateUpdated({
            issuingOrganization: { id: newData?.id, title: newData?.title },
          })
        );
        router.back();
      }
    } else {
      dispatch(
        certificateUpdated({
          issuingOrganization: value,
        })
      );
      router.back();
    }
  };

  return (
    <>
      <Stack spacing={2} sx={{ minWidth: 600, minHeight: 320, py: 3 }}>
        <Stack direction="row" spacing={2} sx={{ px: 2 }} alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle1" color="text.primary">
              Issuing Organization
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <AutoCompleteAddable
            loading={isFetching}
            onInputChange={(ev, val) => handleChangeInputSearch(val)}
            onChange={(ev, val) => handleChange(val)}
            options={searchIssuingData?.searchIssuingOrganizations?.listDto?.items || []}
            placeholder="Issuing Organization"
          />
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              {!isTyping && (
                <Typography color="text.secondary" variant="body2">
                  Start typing to find your Issuing Organization
                </Typography>
              )}
            </Box>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}

export default SearchIssingOrganization;
