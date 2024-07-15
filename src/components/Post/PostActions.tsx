import { ChatBubbleOutlineOutlined, ReplyOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import Image from 'next/image';

interface IPostAction {
  like: string;
  comment: string;
  share: string;
  view: string;
}

const PostActionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  borderTop: '1px solid #F4F7FB',
  alignItems: 'center',
  height: '3.5rem',
}));
const ActiontextStyle = styled(Typography)(({ theme }) => ({
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '15px',
  color: theme.palette.text.secondary,
}));

const PostActions: FC<IPostAction> = ({ like, comment, share, view }) => (
  <Stack sx={{ paddingRight: 2, paddingLeft:2 }} direction="row" justifyContent="space-between" alignItems="center">
    <IconButton color="primary" aria-label="upload picture" component="span">
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Box>
          <Image width={20} height={20} src="/icons/action/like.svg" alt="like-action" />
        </Box>
        <ActiontextStyle variant="caption">{like}</ActiontextStyle>
      </Stack>
    </IconButton>
    <IconButton color="primary" aria-label="upload picture" component="span">
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Image width={20} height={20} src="/icons/message/vuesax/linear/message-text.svg" alt="like-action" />
        <ActiontextStyle variant="caption">{comment}</ActiontextStyle>
      </Stack>
    </IconButton>
    <IconButton color="primary" aria-label="upload picture" component="span">
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Image width={20} height={20} src="/icons/arrow/redo.svg" alt="like-action" />
        <ActiontextStyle variant="caption">{share}</ActiontextStyle>
      </Stack>
    </IconButton>
    <IconButton color="primary" aria-label="upload picture" component="span">
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Image width={20} height={20} src="/icons/security/eye.svg" alt="like-action" />
        <ActiontextStyle variant="caption">{view}</ActiontextStyle>
      </Stack>
    </IconButton>
  </Stack>
);

export default PostActions;
