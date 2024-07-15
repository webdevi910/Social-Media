import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Bank, UserSquare, Briefcase } from 'iconsax-react';
import { PRIMARY } from 'src/theme/palette';
import { useRouter } from 'next/router';
import { useDispatch } from 'src/redux/store';
import { signUpUserTypeDefined } from 'src/redux/slices/auth';
import { SignUpUserTypes } from 'src/@types/auth';
import { PATH_AUTH } from 'src/routes/paths';

const TypeCardStyle = styled('div')(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
  transition: theme.transitions.create('background-color', { duration: theme.transitions.duration.short }),
  padding: theme.spacing(2),
  boxShadow: theme.customShadows.z8,
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
}));

// ----------------------------------------------------------------------

const userTypes = [
  { kind: SignUpUserTypes.Normal, icon: UserSquare, title: 'Normal User', body: 'Lorem ipsum dolor sit amet. ' },
  { kind: SignUpUserTypes.NGO, icon: Bank, title: 'NGO', body: 'Lorem ipsum dolor sit amet. ' },
  { kind: SignUpUserTypes.Company, icon: Briefcase, title: 'Company', body: 'Lorem ipsum dolor sit amet.  ' },
];

export default function UserTypeSelection() {
  const router = useRouter();
  const dispatch = useDispatch();

  const selectType = (type: SignUpUserTypes) => () => {
    dispatch(signUpUserTypeDefined({ userType: type }));
    router.push(PATH_AUTH.signUp.basicInfo);
  };

  return (
    <Stack spacing={4} sx={{ px: 5 }}>
      {userTypes.map((type) => (
        <TypeCardStyle key={type.title} onClick={selectType(type.kind)}>
          <Stack direction="row" alignItems="center">
            <type.icon size={40} color={PRIMARY.main} />
            <Stack pl={2} spacing={0.5}>
              <Typography variant="subtitle2" color="primary.darker">
                {type.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {type.body}
              </Typography>
            </Stack>
          </Stack>
        </TypeCardStyle>
      ))}
    </Stack>
  );
}
