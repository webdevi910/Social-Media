import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'src/redux/store';
import { basicCreateSocialPostSelector } from 'src/redux/slices/post/createSocialPost';
import { getUploadingFiles } from 'src/redux/slices/upload';
import Link from 'next/link';
import { PATH_APP } from 'src/routes/paths';
import { IMediaProps } from 'src/components/upload/GolUploader';

interface ICreatePostMainHeaderProps {
  startPosting: () => void;
  loading: boolean;
  media: IMediaProps[];
}

const CreatePostMainHeader: FC<ICreatePostMainHeaderProps> = (props) => {
  const { loading, startPosting, media } = props;

  const post = useSelector(basicCreateSocialPostSelector);
  const uploadingFiles = useSelector(getUploadingFiles);
  const [hasGIF, setHasGIF] = useState<number>(0);
  const [hasText, setHasText] = useState<boolean>(false);

  useEffect(() => {
    if (media?.length === 0) {
      setHasGIF(0);
    } else if (media[0]?.type === 'gif') {
      setHasGIF(1);
    } else {
      setHasGIF(2);
    }
  }, [media]);
  useEffect(() => {
    if (
      post.text.length === 1 &&
      (post.text[0] as any).children.length === 1 &&
      (post.text[0] as any).children[0].text === ''
    ) {
      setHasText(false);
    } else {
      setHasText(true);
    }
  }, [post.text]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={[
        (theme) => ({
          padding: '12px 12.2px 12px 16px',
          borderBottom: `1px solid ${theme.palette.grey[100]}`,
          height: 56,
        }),
      ]}
    >
      <Stack direction="row" alignItems="center">
        <Link href={PATH_APP.home.index} replace passHref>
          <IconButton sx={{ padding: 0 }}>
            <Image src="/icons/arrow/left-arrow.svg" width={24} height={24} alt="header-left-arrow" />
          </IconButton>
        </Link>
        <Typography
          variant="subtitle1"
          sx={[
            (theme) => ({
              color: theme.palette.grey[800],
              fontWeight: 500,
              marginLeft: '16px',
              lineHeight: '20px',
            }),
          ]}
        >
          Social post
        </Typography>
      </Stack>
      <LoadingButton
        loading={loading}
        disabled={
          (!post.editMode &&
            !hasText &&
            hasGIF !== 1 &&
            post.picturesUrls.length === 0 &&
            post.videoUrls.length === 0 &&
            !post.location &&
            uploadingFiles.length === 0) ||
          (post.editMode &&
            !hasText &&
            hasGIF !== 1 &&
            post.picturesUrls.length === 0 &&
            post.videoUrls.length === 0 &&
            !post.location.id &&
            uploadingFiles.length === 0 &&
            media.length === 0)
        }
        onClick={() => startPosting()}
        variant="contained"
      >
        {post.editMode ? 'Edit' : 'Post'}
      </LoadingButton>
    </Stack>
  );
};

export default CreatePostMainHeader;
