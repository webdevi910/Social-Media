import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Add, ArrowLeft, Edit2, PictureFrame } from 'iconsax-react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { LocationType } from 'src/@types/sections/profile/publicDetails';
import { UserCollegeType } from 'src/@types/sections/profile/userColleges';
import { UserSchoolType } from 'src/@types/sections/profile/userSchools';
import {
  AudienceEnum,
  InstituteTypeEnum,
  Location,
  LocationTypeEnum,
  Relationship,
} from 'src/@types/sections/serverTypes';
import SvgIconStyle from 'src/components/SvgIconStyle';
import { userCollegeUpdated } from 'src/redux/slices/profile/userColloges-slice';
import { userLocationUpdated } from 'src/redux/slices/profile/userLocation-slice';
import { userRelationShipUpdate } from 'src/redux/slices/profile/userRelationShip-slice';
import { userSchoolUpdated } from 'src/redux/slices/profile/userSchool-slice';
import { userUniversityUpdated } from 'src/redux/slices/profile/userUniversity-slice';
import { useDispatch } from 'src/redux/store';
import { useUpdateJoinAudienceMutation } from 'src/_requests/graphql/profile/publicDetails/mutations/updateJoinAudience.generated';
import { useLazyGetLocationQuery } from 'src/_requests/graphql/profile/publicDetails/queries/getLocation.generated';
import { useLazyGetPersonCollegesQuery } from 'src/_requests/graphql/profile/publicDetails/queries/getPersonColleges.generated';
import { useLazyGetPersonSchoolsQuery } from 'src/_requests/graphql/profile/publicDetails/queries/getPersonSchools.generated';
import { useLazyGetRelationshipQuery } from 'src/_requests/graphql/profile/publicDetails/queries/getRelationship.generated';
import { useGetUserQuery } from 'src/_requests/graphql/profile/publicDetails/queries/getUser.generated';

export default function PublicDetailsMain() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  //Query Services
  const [getPersonSchools, { data: personSchools, isFetching: schoolFetching }] = useLazyGetPersonSchoolsQuery();
  const [getPersonCollege, { data: personColleges, isFetching: collegeFetching }] = useLazyGetPersonCollegesQuery();
  const [getPersonUniversity, { data: personUniversities, isFetching: universityFetching }] =
    useLazyGetPersonCollegesQuery();
  const { data: joinDateTime } = useGetUserQuery({
    filter: {
      all: true,
    },
  });

  const [getRelationShips, { data: relationshipData, isFetching: loadingGetRelationship }] =
    useLazyGetRelationshipQuery();
  const [getCurrentCity, { data: currentCityData, isFetching }] = useLazyGetLocationQuery();

  const [getHomeTown, { data: homeTownData, isFetching: homeTownFetching }] = useLazyGetLocationQuery();

  useEffect(() => {
    getPersonSchools({ filter: { all: true } });
    getPersonCollege({ filter: { dto: { instituteType: InstituteTypeEnum.College } } });
    getPersonUniversity({ filter: { dto: { instituteType: InstituteTypeEnum.University } } });
    getRelationShips({ filter: { all: true } });
    getCurrentCity({ filter: { dto: { id: null, locationType: LocationTypeEnum.CurrnetCity } } });
    getHomeTown({ filter: { dto: { id: null, locationType: LocationTypeEnum.Hometown } } });
  }, []);

  // const relationShip = useSelector(userRelationShipSelector);
  const [updateJoinAudience] = useUpdateJoinAudienceMutation();

  const handleEditCity = (city: Location) => {
    dispatch(userLocationUpdated(city));
    router.push('/profile/edit-current-city');
  };
  const handleEditHomeTown = (city: Location) => {
    dispatch(userLocationUpdated(city));
    router.push('/profile/edit-home-town');
  };
  const handleEditRelationship = (rel: Relationship) => {
    dispatch(userRelationShipUpdate(rel));
    router.push('/profile/edit-relationship');
  };

  //EditHandler
  const handleEditCollege = (currentCollege: UserCollegeType) => {
    dispatch(userCollegeUpdated(currentCollege));
    router.push('/profile/public-details/college-form');
  };

  const handleEditSchool = (currentSchool: UserSchoolType) => {
    dispatch(userSchoolUpdated(currentSchool));
    router.push('/profile/public-details/highSchool-form');
  };

  const handleEditUniversity = (currentUni: UserCollegeType) => {
    dispatch(userUniversityUpdated(currentUni));
    router.push('/profile/public-details/university-form');
  };

  const handelChange = async (value: any) => {
    const result: any = await updateJoinAudience({
      filter: {
        dto: {
          joinAudience: value,
        },
      },
    });

    if (result?.data?.updateJoinAudience?.isSuccess) {
      enqueueSnackbar('Audience is updated', { variant: 'success' });
    }
  };
  const handleRoutingCurrentCity = (exp: LocationType) => {
    dispatch(userLocationUpdated(exp));
    router.push('/profile/add-current-city');
  };
  const handleRoutingHomeTown = (exp: LocationType) => {
    dispatch(userLocationUpdated(exp));
    router.push('/profile/add-home-town');
  };
  const handleRoutingRelationship = (exp: Relationship) => {
    dispatch(userRelationShipUpdate(exp));
    router.push('/profile/add-relationship');
  };
  const handleRoutingSchool = (school: UserSchoolType) => {
    dispatch(userSchoolUpdated(school));
    router.push('/profile/public-details/highSchool-form');
  };
  const handleRoutingCollege = (college: UserCollegeType) => {
    dispatch(userCollegeUpdated(college));
    router.push('/profile/public-details/college-form');
  };
  const handleRoutingUni = (Uni: UserCollegeType) => {
    dispatch(userUniversityUpdated(Uni));
    router.push('/profile/public-details/university-form');
  };

  return (
    // <Dialog fullWidth={true} open={true} keepMounted onClose={() => router.back()}>
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} sx={{ px: 2, pt: 2 }} justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2}>
          <IconButton sx={{ p: 0 }} onClick={() => router.push('/profile')}>
            <ArrowLeft />
          </IconButton>
          <Typography variant="subtitle1" color="text.primary">
            Public Details
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack spacing={2} sx={{ px: 2 }}>
        <Typography variant="subtitle1" color="text.primary">
          Education
        </Typography>
        {!!personSchools?.getPersonSchools?.listDto?.items?.length && (
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.primary">
              High School
            </Typography>
            {schoolFetching && <CircularProgress size={20} />}
            {personSchools?.getPersonSchools?.listDto?.items?.map((school: any) => (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                key={school?.school?.id}
              >
                <Stack direction="row" spacing={1} alignItems="center" key={school?.school?.id}>
                  <PictureFrame size="18" />
                  <Typography variant="subtitle2" color="text.primary" key={school?.school?.id}>
                    {school?.school?.title}
                  </Typography>
                </Stack>
                <Box>
                  <IconButton onClick={() => handleEditSchool(school)}>
                    <Edit2 size="16" color={theme.palette.text.primary} />
                  </IconButton>
                </Box>
              </Stack>
            ))}
          </Stack>
        )}
        <Button variant="outlined" onClick={() => handleRoutingSchool({ audience: AudienceEnum.Public })}>
          <Add color={theme.palette.text.primary} />
          <Typography color="text.primary">Add High School</Typography>
        </Button>
        {!!personColleges?.getPersonColleges?.listDto?.items?.length && (
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.primary">
              College
            </Typography>
            {collegeFetching && <CircularProgress size={20} />}
            {personColleges?.getPersonColleges?.listDto?.items?.map((college) => (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                key={college?.collegeDto?.id}
              >
                <Stack direction="row" spacing={1} key={college?.collegeDto?.id}>
                  <PictureFrame size="18" />
                  <Typography variant="subtitle2" color="text.primary" key={college?.collegeDto?.id}>
                    studied {college?.concentrationDto?.title} at {college?.collegeDto?.name}
                  </Typography>
                </Stack>
                <Box onClick={() => handleEditCollege(college as UserCollegeType)}>
                  <IconButton>
                    <Edit2 size="16" variant="Outline" color={theme.palette.text.primary} />
                  </IconButton>
                </Box>
              </Stack>
            ))}
          </Stack>
        )}
        <Button variant="outlined" onClick={() => handleRoutingCollege({ audience: AudienceEnum.Public })}>
          <Add color={theme.palette.text.primary}/>
          <Typography color="text.primary">Add College</Typography>
        </Button>
        {!!personUniversities?.getPersonColleges?.listDto?.items?.length && (
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.primary">
              University
            </Typography>
            {universityFetching && <CircularProgress size={20} />}
            {personUniversities?.getPersonColleges?.listDto?.items?.map((university) => (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                key={university?.collegeDto?.id}
              >
                <Stack direction="row" spacing={1} key={university?.collegeDto?.id}>
                  <PictureFrame size="18" />
                  <Typography variant="subtitle2" color="text.primary" key={university?.collegeDto?.id}>
                    studied {university?.concentrationDto?.title} at {university?.collegeDto?.name}
                  </Typography>
                </Stack>
                <IconButton onClick={() => handleEditUniversity(university as any)}>
                  <Edit2 size="16" color={theme.palette.text.primary} />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        )}
        <Button variant="outlined" onClick={() => handleRoutingUni({ audience: AudienceEnum.Public })}>
          <Add color={theme.palette.text.primary}/>
          <Typography color="text.primary">Add University</Typography>
        </Button>
      </Stack>
      <Divider />
      <Stack spacing={2} sx={{ px: 2 }}>
        <Typography variant="subtitle1" color="text.primary">
          Current City
        </Typography>
        {!!currentCityData?.getLocation?.listDto?.items?.length ? (
          currentCityData?.getLocation?.listDto?.items?.map((city) => (
            <Box key={city?.city?.id}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 2 }}>
                  <SvgIconStyle src={`/icons/relationshipIcon.svg`} sx={{ width: 10, height: 10 }} />
                  <Typography variant="body2" color="text.primary" component="span">
                    Lives in
                    <Typography component="span" variant="subtitle2" sx={{ ml: 1 }}>
                      {city?.city?.name}
                    </Typography>
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => handleEditCity(city as Location)}>
                    <Edit2 variant="Outline" size="16" color={theme.palette.text.primary} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Button variant="outlined" onClick={() => handleRoutingCurrentCity({ audience: AudienceEnum.Public })}>
            {isFetching ? (
              <CircularProgress size={20} />
            ) : (
              <>
                <Add color={theme.palette.text.primary} />
                <Typography color="text.primary">Add Current City</Typography>
              </>
            )}
          </Button>
        )}
      </Stack>
      <Divider />
      <Stack spacing={2} sx={{ px: 2 }}>
        <Typography variant="subtitle1" color="text.primary">
          Home Town
        </Typography>
        {!!homeTownData?.getLocation?.listDto?.items?.length ? (
          homeTownData?.getLocation?.listDto?.items?.map((city) => (
            <Box key={city?.id}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 2 }}>
                  <SvgIconStyle src={`/icons/relationshipIcon.svg`} sx={{ width: 10, height: 10 }} />
                  <Typography variant="body2" color="text.primary" component="span" sx={{ mr: 1 }}>
                    From
                    <Typography component="span" variant="subtitle2" sx={{ ml: 1 }}>
                      {city?.city?.name}
                    </Typography>
                  </Typography>
                </Box>
                <Box>
                  {/* <Link href="/profile/edit-home-town" passHref> */}
                  <IconButton onClick={() => handleEditHomeTown(city as Location)}>
                    <Edit2 variant="Outline" size="16" color={theme.palette.text.primary} />
                  </IconButton>
                  {/* </Link> */}
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Button variant="outlined" onClick={() => handleRoutingHomeTown({ audience: AudienceEnum.Public })}>
            {homeTownFetching ? (
              <CircularProgress size={20} />
            ) : (
              <>
                <Add color={theme.palette.text.primary} />
                <Typography color="text.primary">Add Home Town</Typography>
              </>
            )}
          </Button>
        )}
      </Stack>
      <Divider />
      <Stack spacing={2} sx={{ px: 2 }}>
        <Typography variant="subtitle1" color="text.primary">
          Relationship
        </Typography>
        {!!relationshipData?.getRelationship?.listDto?.items?.length ? (
          relationshipData?.getRelationship?.listDto?.items?.map((rel) => (
            <Box key={rel?.relationshipStatus?.id}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 2 }}>
                  <SvgIconStyle src={`/icons/relationshipIcon.svg`} sx={{ width: 10, height: 10 }} />
                  <Typography variant="subtitle2" color="text.primary" component="span" sx={{ mr: 1 }}>
                    {rel?.relationshipStatus?.title}
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => handleEditRelationship(rel as Relationship)}>
                    <Edit2 variant="Outline" size="16" color={theme.palette.text.primary} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Button variant="outlined" onClick={() => handleRoutingRelationship({ audience: AudienceEnum.Public })}>
            {loadingGetRelationship ? (
              <CircularProgress size={20} />
            ) : (
              <>
                <Add color={theme.palette.text.primary} />
                <Typography color="text.primary">Add Relationship Status</Typography>
              </>
            )}
          </Button>
        )}
      </Stack>
      <Divider />
      <>
        <Stack spacing={2} sx={{ px: 2, pb: 2 }}>
          <Typography variant="subtitle1" color="text.primary">
            Joined Garden of Love
          </Typography>
          <Box
            sx={{
              position: 'relative',
            }}
          >
            {joinDateTime?.getUser?.listDto?.items?.map((date, i) => {
              <Typography key={i} variant="body2" color="text.primary">
                {date?.organizationUserDto?.joinDateTime}
              </Typography>;
            })}

            <Box sx={{ position: 'absolute', left: '50%', transform: 'translate(-50%,-50%)', top: '50%' }}>
              <FormControl sx={{ minWidth: 80 }}>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={AudienceEnum.Public}
                  onChange={(e) => handelChange(e.target.value)}
                  sx={{ maxHeight: 40 }}
                >
                  {Object.keys(AudienceEnum).map((_audience, i) => (
                    <MenuItem key={i} value={AudienceEnum[_audience as keyof typeof AudienceEnum]}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>{_audience}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Stack>
        <Divider />
      </>
      ;
    </Stack>
  );
}
