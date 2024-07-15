import { Box, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Language, Circle, MoreHoriz } from '@mui/icons-material';
import { FC, useState } from 'react';

interface IPostTitle {
  avatar: object;
  username: string;
  Date: string;
  PostNo: string;
  description?: string;
  editCallback?: () => void;
}

const PostTitleDot = styled('span')(({ theme }) => ({
  color: theme.palette.grey[300],
  fontSize: '10px',
  margin: '0 0.5rem',
}));

const PostTitle: FC<IPostTitle> = ({ avatar, username, Date, PostNo, description, editCallback }: IPostTitle) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const edit = () => {
    if (editCallback) {
      handleClose();
      editCallback();
    }
  };

  return (
    <Stack
      sx={{ paddingRight: 2, paddingLeft: 2 }}
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Stack direction="row" spacing={2}>
        <Box>{avatar}</Box>
        <Stack spacing={1}>
          <Typography variant="h6">{username}</Typography>
          <Stack alignItems="center" direction="row">
            <Typography variant="body2">{Date}</Typography>
            <PostTitleDot>
              <Circle fontSize="inherit" />
            </PostTitleDot>

            {PostNo === 'simple' ? <Language sx={{ color: '#C8D3D9', fontSize: '20px' }} /> : 'sc'}
          </Stack>
        </Stack>
      </Stack>
      <Stack justifyContent="flex-start">
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreHoriz sx={{ color: '#8798A1' }} />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={()=> edit()}>Edit</MenuItem>
        </Menu>
      </Stack>
    </Stack>
  );
};

export default PostTitle;
