import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import Image from 'next/image';

interface INotFoundProps {
  text: string;
}

const NotFound: FC<INotFoundProps> = (props) => {
  const { text } = props;
  return (
    <Stack justifyContent="center" alignItems="center" spacing={5}>
      <Image src="/icons/not-found/not-found.svg" width={209} height={204} alt="not found icon" />
      <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 700, fontSize: '18px', lineHeight: '22.5px' }}>
        {text}
      </Typography>
    </Stack>
  );
};

export default NotFound;
