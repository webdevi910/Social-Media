import { Box, Dialog, Divider, IconButton, Stack, Typography } from '@mui/material';
import { ArrowLeft, CloseSquare } from 'iconsax-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { CertificateName } from 'src/@types/sections/serverTypes';
import AutoCompleteAddable from 'src/components/AutoCompleteAddable';
import { certificateUpdated } from 'src/redux/slices/profile/userCertificates-slice';
import { useDispatch } from 'src/redux/store';
import { useCreateCertificateNameMutation } from '../../../_requests/graphql/profile/certificates/Mutations/createCertificateName.generated';
import { useLazySearchCertificateNamesQuery } from 'src/_requests/graphql/profile/certificates/queries/searchCertificateNames.generated';

function SearchCertificateNamesDialog() {
  const [searchCertificate, { data: searchCertificateData, isFetching }] = useLazySearchCertificateNamesQuery();
  const [createCertificateName] = useCreateCertificateNameMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isTyping, setIsTyping] = useState(false);

  const handleChangeInputSearch = (val: string) => {
    // is typing status
    if (val) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
    // Query
    searchCertificate({
      filter: {
        dto: {
          title: val,
        },
      },
    });
  };

  // send certificateName to server
  const handleChange = async (value: CertificateName & { inputValue: string }) => {
    if (value.inputValue) {
      const resData: any = await createCertificateName({
        filter: {
          dto: {
            title: value.inputValue,
          },
        },
      });
      if (resData?.data?.createCertificateName?.isSuccess) {
        const newData = resData?.data?.createCertificateName?.listDto?.items?.[0];
        dispatch(
          certificateUpdated({
            certificateName: { id: newData?.id, title: newData?.title },
          })
        );
        router.back();
      }
    } else {
      dispatch(
        certificateUpdated({
          certificateName: value,
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
              Certificate Name
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <AutoCompleteAddable
            loading={isFetching}
            onInputChange={(ev, val) => handleChangeInputSearch(val)}
            onChange={(ev, val) => handleChange(val)}
            options={searchCertificateData?.searchCertificateNames?.listDto?.items || []}
            placeholder="Certificate Name"
          />
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              {!isTyping && (
                <Typography color="text.secondary" variant="body2">
                  Start typing to find your Company Name
                </Typography>
              )}
            </Box>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}

export default SearchCertificateNamesDialog;
