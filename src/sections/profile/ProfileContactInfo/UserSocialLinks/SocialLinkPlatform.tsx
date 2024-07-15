import { Dialog, Stack, Typography, IconButton, Divider, Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { experienceAdded } from 'src/redux/slices/profile/userExperiences-slice';
import { useDispatch, useSelector } from 'src/redux/store';
import { ArrowLeft, CloseCircle, Image } from 'iconsax-react';
import Link from 'next/link';
import { useGetSocialMediasQuery } from 'src/_requests/graphql/profile/contactInfo/queries/getSocialMedias.generated';
import { addedSocialMedia, userSocialMediasSelector } from 'src/redux/slices/profile/userSocialMedia-slice';
import { SocialMedia } from 'src/@types/sections/serverTypes';
import { useEffect, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

function SocialLinkPlatform() {
  const router = useRouter();
  const dispatch = useDispatch();
  const personSocialMedia = useSelector(userSocialMediasSelector);
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);
  useEffect(() => {
    if(!personSocialMedia) router.push('/profile/contact-info')
  },[personSocialMedia, router]);

  const { data,isFetching } = useGetSocialMediasQuery({
    filter: {
      all: true,
    },
  });

  const handleSelectPlatform = (social: SocialMedia) => {
    dispatch(
      addedSocialMedia({
        ...personSocialMedia,
        socialMediaDto: social,
      })
    );
    router.back();
  };

  return (
    <BottomSheet
    open={true}
    onDismiss={() => setOpenBottomSheet(false)}
    snapPoints={({ minHeight }) => [minHeight, minHeight]}
  >
      <Stack spacing={2} sx={{ py: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ justifyContent: 'space-between', px: 2 }}>
          <Typography variant="subtitle1" color="text.primary">
            {/* <IconButton sx={{ p: 0, mr: 2 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton> */}
            Select Platform
          </Typography>
         
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>  
        {isFetching ? (
              <CircularProgress />
            ) : (  
          data?.getSocialMedias?.listDto?.items?.map((item) => (
            <Box key={item?.id} onClick={() => handleSelectPlatform(item as SocialMedia)} sx={{ cursor: "pointer", display:"flex", alignItems:"center"}}>
              <Typography variant="body2" color="text.primary">
                <IconButton sx={{ mr: 1 }}>
                  <Image size="16" variant="Linear" />
                </IconButton>
                {item?.title}
              </Typography>
            </Box>
          )))}
        </Stack>
      </Stack>
      </BottomSheet>
  );
}

export default SocialLinkPlatform;
