// @mui
import { styled } from '@mui/material/styles';
// layouts
import Layout from 'src/layouts';
// components
import Page from 'src/components/Page';
// sections
import { Avatar, Button, Card, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { useState, useMemo , useEffect } from 'react';
import { useRouter } from 'next/router';

import { PATH_APP } from 'src/routes/paths';
import { useLazyGetHomePageSocialPostsQuery } from 'src/_requests/graphql/post/getHomePageSocialPost.generated';

import { dispatch } from 'src/redux/store';
import { reset as resetUpload } from 'src/redux/slices/upload';
import { reset } from 'src/redux/slices/post/createSocialPost';
import PostCard from 'src/sections/post/social-post/PostCard';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

// HomePage.getLayout = function getLayout(page: React.ReactElement) {
//   return <Layout variant="simple">{page}</Layout>;
// };

// ----------------------------------------------------------------------

const CreatePostWrapperStyle = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ClickableStyle = styled(Stack)(({ theme }) => ({
  cursor: 'pointer',
}));

const CreatePostButton = styled(Stack)(({ theme }) => ({
  cursor: 'pointer',
}));

const CreatePostButtonText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 400,
  fontSize: '12',
  lineHeight: '15px',
}));

export default function HomePage() {
  const { query, push, route } = useRouter();

  const [getHomePageSocialPosts, { isLoading: getSocialPostsLoading, data: socialPosts }] =
    useLazyGetHomePageSocialPostsQuery();

  useEffect(() => {
    if (route) {
      getHomePageSocialPosts({ filter: { pageIndex: 0, pageSize: 10 } })
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      dispatch(reset());
      dispatch(resetUpload());
    }
  }, [route]);

  const renderSocialPostsMemo = useMemo(
    () => (
      <Stack spacing={2} sx={{ flex: 1 }}>
        <CreatePostWrapperStyle>
          <Stack spacing={2}>
            <Stack spacing={2} direction="row" alignItems="center">
              <Avatar sx={{ width: 48, height: 48 }} />
              <ClickableStyle onClick={() => push(PATH_APP.post.createPost.socialPost.index)}>
                <Typography
                  variant="h6"
                  sx={{ color: 'surface.onSurfaceVariantL', fontSize: '18px', fontWeight: 700, lineHeight: '22.5px' }}
                >
                  What’s going on?
                </Typography>
              </ClickableStyle>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <CreatePostButton alignItems="center" spacing={0.75} direction="row">
                <img src="/icons/image/24/Outline.svg" width={24} height={24} />
                <CreatePostButtonText variant="caption">Photo</CreatePostButtonText>
              </CreatePostButton>
              <CreatePostButton alignItems="center" spacing={0.75} direction="row">
                <img src="/icons/video/24/Outline.svg" width={24} height={24} />
                <CreatePostButtonText variant="caption">Video</CreatePostButtonText>
              </CreatePostButton>
              <CreatePostButton alignItems="center" spacing={0.75} direction="row">
                <img src="/icons/card/24/Outline.svg" width={24} height={24} />
                <CreatePostButtonText variant="caption">Campaign</CreatePostButtonText>
              </CreatePostButton>
              <CreatePostButton alignItems="center" spacing={0.75} direction="row">
                <img src="/icons/article/24/Outline.svg" width={24} height={24} />
                <CreatePostButtonText variant="caption">Article</CreatePostButtonText>
              </CreatePostButton>
            </Stack>
          </Stack>
        </CreatePostWrapperStyle>
        {getSocialPostsLoading && (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        )}

        {socialPosts?.getHomePageSocialPosts.listDto?.items?.map((post) => (
          <PostCard key={post!.id} post={post} />
        ))}
      </Stack>
    ),

    [socialPosts, getSocialPostsLoading]
  );

  return (
    <Page title="Home">
      <RootStyle>{renderSocialPostsMemo}</RootStyle>
    </Page>
  );
}
