import Head from 'next/head';
import { forwardRef, ReactNode } from 'react';
// @mui
import { Box, BoxProps } from '@mui/material';
import { SIZES } from 'src/config';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
}

const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title} | Garden of love`}</title>
      {meta}
    </Head>

    <Box  ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
