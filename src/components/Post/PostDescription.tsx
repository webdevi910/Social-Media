import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { styled } from '@mui/material/styles';

interface IPostDes {
  title?: string;
  description?: string;
}

const PostDesContainer = styled('div')(({ theme }) => ({
  padding: '0 1rem',
}));
const PostDesContent = styled('div')(({ theme }) => ({
  marginBottom: '1rem',
  color: '#354752',
}));
const PostDesSeeMore = styled('span')(({ theme }) => ({
  color: '#8798A1',
  cursor: 'pointer',
}));
const PostDes: FC<IPostDes> = ({ title, description }) => (
  <Box>
    <Box>
      <Typography variant="subtitle1">{title}</Typography>
    </Box>
    <Box sx={{ paddingRight: 2, paddingLeft: 2 }}>
      <Typography variant="body1">
        {description && description?.length >= 110 ? (
          <span>
            {description?.slice(0, 110)}
            <PostDesSeeMore> ...see more</PostDesSeeMore>
          </span>
        ) : (
          description
        )}
      </Typography>
    </Box>
  </Box>
);

export default PostDes;
