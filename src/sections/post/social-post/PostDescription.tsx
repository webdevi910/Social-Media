import { Box, Stack, Typography } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';

interface IPostDes {
  title?: string;
  description?: string;
}

const PostDesContainer = styled('div')(({ theme }) => ({
  padding: '0 1rem',
}));
const PostDesContent = styled(Typography)(({ theme }) => ({}));
const PostDesSeeMore = styled('span')(({ theme }) => ({
  color: '#8798A1',
  cursor: 'pointer',
}));

const SeeMore = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  zIndex: 2,
  position: 'absolute',
  bottom: -2,
  right: 0,
  backgroundColor: '#ffffff',
  color: theme.palette.grey[800],
  lineHeight: '1.5',
  fontSize: '1rem',
}));

const PostDes: FC<IPostDes> = ({ title, description }) => {
  const pRef = useRef<HTMLSpanElement>(null);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);

  useEffect(() => {
    const height = pRef?.current?.offsetHeight;
    if (height > 70) {
      setShowSeeMore(true);
    }
  }, [pRef.current]);

  return (
    <Box>
      {/* <Box>
        <Typography variant="subtitle1">{title}</Typography>
      </Box> */}
      <Box sx={{ paddingRight: 2, paddingLeft: 2 }}>
        <Stack sx={{ position: 'relative' }}>
          <PostDesContent
            sx={{ overflow: 'hidden', height: showSeeMore ? '70px' : 'auto' }}
            variant="body1"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {showSeeMore && <SeeMore onClick={() => setShowSeeMore(false)}>...see more</SeeMore>}
        </Stack>
        <PostDesContent
          sx={{ visibility: 'hidden', position: 'absolute', zIndex: 0, top: 0 }}
          ref={pRef}
          variant="body1"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Box>
    </Box>
  );
};

export default PostDes;
