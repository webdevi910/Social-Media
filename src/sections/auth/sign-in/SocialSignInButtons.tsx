import { Stack } from "@mui/material";
import Image from "next/image";
import { styled } from '@mui/material/styles';

const SocialButtonStyle = styled('div')(({ theme }) => ({
    width: 48,
    height: 48,
    display: 'flex',
    borderRadius: theme.spacing(2),
    alignItems: 'center',
    p: theme.spacing(1.5),
    justifyContent: 'center',
    boxShadow: theme.shadows[8],
    backgroundColor: 'grey.50',
  }));
  

function SocialSignInButtons() {
  return (
    <Stack mt={2} direction="row" spacing={8} justifyContent="center">
      <SocialButtonStyle>
        <Image alt="facebook" src="/icons/socials/facebook.png" width="30px" height="30px" />
      </SocialButtonStyle>
      <SocialButtonStyle>
        <Image alt="apple" src="/icons/socials/apple.png" width="30px" height="30px" />
      </SocialButtonStyle>
      <SocialButtonStyle>
        <Image alt="logo" src="/icons/socials/google.png" width="30px" height="30px" />
      </SocialButtonStyle>
    </Stack>
  );
}
export default SocialSignInButtons;
