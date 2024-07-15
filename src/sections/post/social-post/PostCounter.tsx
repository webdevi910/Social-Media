import { AvatarGroup, Avatar, Typography, Button, Stack } from '@mui/material';
import { FC } from 'react';
import { styled } from '@mui/material/styles';

interface IPostCounter {
  counter?: number;
  lastpersonName?: string;
  lastpersonsData?: any;
  Comments?: string;
  type: boolean;
  endorseTitle?: string;
}
const PostCounterContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: '0.5rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
}));
const PostCounterEndorseCTA = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem',
}));
const PostCounterLeft = styled('div')(({ theme }) => ({
  display: 'flex',
}));
const PostCounterEndorse = styled('span')(({ theme }) => ({
  color: '#607079',
}));
const PostCounter: FC<IPostCounter> = ({ counter, lastpersonName, lastpersonsData, Comments, type, endorseTitle }) => (
  <Stack alignItems="center" justifyContent="space-between" direction="row" sx={{ paddingRight: 2, paddingLeft: 2 }}>
    {type ? null : (
      <PostCounterEndorseCTA>
        <div>{endorseTitle}</div>
        <Button
          variant="outlined"
          sx={{ borderColor: '#C8D3D9', borderRadius: '8px', width: '5.37rem', height: '2.5rem', color: '#354752' }}
        >
          <Typography variant="button">Endorse</Typography>
        </Button>
      </PostCounterEndorseCTA>
    )}
    <Stack spacing={0.5} direction="row" alignItems="center">
      <AvatarGroup max={4} total={0}>
        {lastpersonsData?.map((item: any) => (
          <Avatar key={item.id} sx={{ width: 16, height: 16 }} alt={item.name} src={item.image} />
        ))}
      </AvatarGroup>
      <Typography
        variant="caption"
        sx={{ fontWeight: 400, fontSize: '12px', lineHeight: '15px', color: 'text.secondary' }}
      >
        Davood Malekia and 13.2k others liked this post.
      </Typography>
      {/* {type ? (
          <div>
            <Typography variant="caption">
              {lastpersonName} and {counter} others
            </Typography>
          </div>
        ) : (
          <div>
            <Typography variant="caption">
              <PostCounterEndorse> Endorsed by </PostCounterEndorse>
              {lastpersonName} and {counter} others
            </Typography>
          </div>
        )} */}
    </Stack>
    {/* <div>
        {type ? (
          <Typography variant="caption">
            <div>{Comments} Comments</div>
          </Typography>
        ) : null}
      </div> */}
  </Stack>
);

export default PostCounter;
