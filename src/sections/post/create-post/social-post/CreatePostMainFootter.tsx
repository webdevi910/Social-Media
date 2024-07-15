import { Button, IconButton, Stack, styled } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PATH_APP } from 'src/routes/paths';
import { useSelector } from 'src/redux/store';
import { basicCreateSocialPostSelector } from 'src/redux/slices/post/createSocialPost';
import { getUploadingFiles } from 'src/redux/slices/upload';
import { LoadingButton } from '@mui/lab';

const PostButtonStyle = styled(LoadingButton)(() => ({
  width: 120,
}));

const WrapperStyle = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  height: 64,
  borderTop: `1px solid ${theme.palette.grey[100]}`,
  width: '100%',
}));

const Input = styled('input')({
  display: 'none',
});

interface ICreatePostMainFotterProps {
  addImage: () => void;
}

const CreatePostMainFootter: FC<ICreatePostMainFotterProps> = (props) => {
  const { addImage } = props;
  const post = useSelector(basicCreateSocialPostSelector);
  const uploadingFiles = useSelector(getUploadingFiles);

  return (
    <WrapperStyle direction="row" alignItems="center" justifyContent="space-between" sx={[(theme) => ({})]}>
      <Stack direction="row" spacing={3} alignItems="center">
        <IconButton
          onClick={() => {
            addImage();
          }}
          aria-label="upload picture"
          component="span"
        >
          <Image src="/icons/media/gallery.svg" width={24} height={24} alt="import-image" />
        </IconButton>
        <Link href={PATH_APP.post.createPost.socialPost.addGif} passHref>
          <IconButton>
            <Image src="/icons/gif.svg" width={24} height={24} alt="post-gifs" />
          </IconButton>
        </Link>
        <Link href={PATH_APP.post.createPost.socialPost.addLocation} passHref>
          <IconButton>
            <Image src="/icons/location/location.svg" width={24} height={24} alt="post-gifs" />
          </IconButton>
        </Link>
      </Stack>
    </WrapperStyle>
  );
};

export default CreatePostMainFootter;
