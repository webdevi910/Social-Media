import { Dialog, Divider, IconButton, Stack, Typography } from '@mui/material';
import { ArrowLeft, CloseSquare, Save2 } from 'iconsax-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { EmploymentTypeEnum } from 'src/@types/sections/serverTypes';
import { experienceAdded, userExperienceSelector } from 'src/redux/slices/profile/userExperiences-slice';
import { useDispatch, useSelector } from 'src/redux/store';

function ExperienceEmploymentDialog() {
  const router = useRouter();
  const dispatch = useDispatch();
  const experienceData = useSelector(userExperienceSelector);

  useEffect(() => {
    if (!experienceData) router.push('/profile/experience-list');
  }, [experienceData, router]);

  const handleSelectEmployment = (emp: keyof typeof EmploymentTypeEnum) => {
    dispatch(
      experienceAdded({
        employmentType: EmploymentTypeEnum[emp],
      })
    );
    router.back();
  };

  return (
    <Dialog fullWidth={true} open={true} keepMounted onClose={() => router.back()}>
      <Stack spacing={2} sx={{ py: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2 }}>
          <Stack direction="row" spacing={2}>
            <IconButton sx={{ p: 0 }} onClick={() => router.back()}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle2" color="text.primary">
              Add Experience
            </Typography>
          </Stack>
          <IconButton>
            <CloseSquare />
          </IconButton>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          {Object.keys(EmploymentTypeEnum).map((_emp) => (
            <Stack
              spacing={1.5}
              direction="row"
              key={_emp}
              sx={{ cursor: 'pointer' }}
              onClick={() => handleSelectEmployment(_emp as keyof typeof EmploymentTypeEnum)}
            >
              <Save2 /> <Typography variant="body2">{_emp}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default ExperienceEmploymentDialog;
