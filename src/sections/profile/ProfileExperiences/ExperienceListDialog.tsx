import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  IconButton,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { Add, CloseSquare } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AudienceEnum, Experience } from 'src/@types/sections/serverTypes';
import { experienceAdded } from 'src/redux/slices/profile/userExperiences-slice';
import { useGetExperiencesQuery } from 'src/_requests/graphql/profile/experiences/queries/getExperiences.generated';

const NoResultStyle = styled(Stack)(({ theme }) => ({
  maxWidth: 164,
  maxHeight: 164,
  width: 164,
  height: 164,
  background: theme.palette.grey[100],
  borderRadius: '100%',
}));

const ExperienceWrapperStyle = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ExperienceImage = styled(Stack)(({ theme }) => ({
  width: 48,
  height: 48,
  backgroundColor: theme.palette.grey[100],
}));

const ExperienceDescriptionStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginTop: theme.spacing(1),
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
}));

function ExperienceListDialog() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { data, isFetching } = useGetExperiencesQuery({
    filter: {
      all: true,
    },
  });

  const experiences = data?.getExpriences?.listDto?.items;

  const handleRouting = (exp: Experience) => {
    dispatch(experienceAdded(exp));
    router.push('/profile/experience-new');
  };

  return (
    <Dialog fullWidth maxWidth="sm" open>
      <Stack sx={{ mb: 2, px: 2, pt: 3 }} direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1">Experience</Typography>
        <Stack direction="row" spacing={2}>
          {/* FIXME add primary variant to button variants */}
          {!!experiences?.length && (
            <Button onClick={() => handleRouting({ audience: AudienceEnum.Public })} variant="contained">
              Add
            </Button>
          )}
          <IconButton sx={{ padding: 0 }} onClick={() => router.push('/profile/user')}>
            <CloseSquare color={theme.palette.text.primary} />
          </IconButton>
        </Stack>
      </Stack>
      <Divider />

      {isFetching ? (
        <Stack sx={{ py: 6 }} alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      ) : !experiences?.length ? (
        <Stack sx={{ py: 6 }} alignItems="center" justifyContent="center">
          <NoResultStyle alignItems="center" justifyContent="center">
            <Typography variant="subtitle1" sx={{ color: (theme) => 'text.secondary', textAlign: 'center' }}>
              No result
            </Typography>
          </NoResultStyle>
          <Box sx={{ mt: 3 }} />
          {/* <Link href={'/profile/experience-new'} passHref> */}
          <Button
            onClick={() => handleRouting({ audience: AudienceEnum.Public })}
            variant="text"
            startIcon={<Add variant="Outline" color={theme.palette.info.main} />}
          >
            {/* FIXME add varient button sm to typography */}
            <Typography color="info.main">Add Experience</Typography>
          </Button>
          {/* </Link> */}
        </Stack>
      ) : (
        experiences?.map((experience, index) => (
          <Box key={experience?.id}>
            <ExperienceWrapperStyle spacing={1} direction="row">
              <ExperienceImage alignItems="center" justifyContent="center">
                <Image src="/icons/socials/google.png" width={32} height={32} />
              </ExperienceImage>
              <Stack sx={{ flex: 1 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2" sx={{ color: 'primary.dark' }}>
                    {experience?.title}
                  </Typography>
                  <Typography
                    sx={{ color: 'text.secondary', cursor: 'pointer' }}
                    variant="subtitle2"
                    onClick={() => handleRouting(experience as Experience)}
                  >
                    Edit
                  </Typography>
                </Stack>
                <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
                  {experience?.startDate}- {experience?.endDate || 'Present'}
                </Typography>
                {experience?.cityDto && (
                  <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
                    {experience?.cityDto?.name}
                  </Typography>
                )}
                {experience?.description && (
                  <ExperienceDescriptionStyle variant="body2">
                    {experience?.description.split('\n').map((str, i) => (
                      <p key={i}>{str}</p>
                    ))}
                  </ExperienceDescriptionStyle>
                )}
              </Stack>
            </ExperienceWrapperStyle>
            {index < experiences?.length - 1 && <Divider />}
          </Box>
        ))
      )}
    </Dialog>
  );
}

export default ExperienceListDialog;
