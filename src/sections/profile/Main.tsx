// @mui
import {
  Stack,
  IconButton,
  Box,
  Typography,
  Button,
  useTheme,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  CircularProgress,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add, Book1, Briefcase, Edit2, Heart, Instagram, Location, LoginCurve, More, StopCircle } from 'iconsax-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { LocationTypeEnum } from 'src/@types/sections/serverTypes';
import Page from 'src/components/Page';
import { useGetUserEmailsQuery } from 'src/_requests/graphql/profile/contactInfo/queries/getUserEmails.generated';
import { useGetUserPhoneNumbersQuery } from 'src/_requests/graphql/profile/contactInfo/queries/getUserPhoneNumbers.generated';
import { useGetUserSocialMediasQuery } from 'src/_requests/graphql/profile/contactInfo/queries/getUserSocialMedias.generated';
import { useGetUserWebSitesQuery } from 'src/_requests/graphql/profile/contactInfo/queries/getUserWebSites.generated';
import { useGetExperiencesQuery } from 'src/_requests/graphql/profile/experiences/queries/getExperiences.generated';
import { useGetLocationQuery } from 'src/_requests/graphql/profile/publicDetails/queries/getLocation.generated';
import { useGetRelationshipQuery } from 'src/_requests/graphql/profile/publicDetails/queries/getRelationship.generated';
import { useGetCertificatesQuery } from 'src/_requests/graphql/profile/certificates/queries/getCertificates.generated';
import { useGetUserQuery } from 'src/_requests/graphql/profile/publicDetails/queries/getUser.generated';

const CardStyle = styled(Card)(({ theme }) => ({
  minHeight: '450px',
  borderRadius: theme.spacing(1),
  margin: 'auto',
  boxShadow: 'unset',
  width: '100%',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    minHeight: '520px',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '570px',
  },
}));

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  width: '100%',
  position: 'absolute',
  top: '185px',
}));
const StackContentStyle = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const CardContentBtn = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8.5),
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(2),
  },
}));

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3, 3),
  [theme.breakpoints.up('xl')]: {
    padding: theme.spacing(3, 19.5),
  },
}));
const ExperienceDescriptionStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,

  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  textAlign: 'left',
}));
const ExperienceImage = styled(Stack)(({ theme }) => ({
  maxHeight: '90px',
  minWidth: '128px',
  backgroundColor: theme.palette.grey[100],
}));
export default function Main() {
  const [full, setfull] = useState(true);
  const theme = useTheme();
  const { data: userData, isFetching: userFetching } = useGetUserQuery({
    filter: {
      dto:{}
    },
  });
  const { data: relationshipData, isFetching: loadingGetRelationship } = useGetRelationshipQuery({
    filter: {
      all: true,
    },
  });
  const { data: currentCityData, isFetching: currentCityFetching } = useGetLocationQuery({
    filter: {
      dto: {
        id: null,
        locationType: LocationTypeEnum.CurrnetCity,
      },
    },
  });

  const { data: homeTownData, isFetching: homeTownFetching } = useGetLocationQuery({
    filter: {
      dto: {
        id: null,
        locationType: LocationTypeEnum.Hometown,
      },
    },
  });
  const { data: emailData, isFetching: isFetchingEmail } = useGetUserEmailsQuery({
    filter: {
      dto: {
        id: null,
      },
    },
  });
  const { data: phoneNumberData, isFetching: isFetchingPhoneNumber } = useGetUserPhoneNumbersQuery({
    filter: {
      dto: {
        status: null,
      },
    },
  });
  const { data: socialMediaData, isFetching: isFetchingSocialMedia } = useGetUserSocialMediasQuery({
    filter: {
      dto: {
        id: null,
      },
    },
  });
  const { data: experienceData, isFetching: isFetchingExprience } = useGetExperiencesQuery({
    filter: {
      all: true,
    },
  });
  const { data: websitesData, isFetching: isFetchingWebsite } = useGetUserWebSitesQuery({ filter: { all: true } });
  const { data: certificateData, isFetching: isFetchingCertificate } = useGetCertificatesQuery({
    filter: {
      dto: {},
    },
  });
  const certificates = certificateData?.getCertificates?.listDto?.items;
  const experiences = experienceData?.getExpriences?.listDto?.items;

  return (
    <>
      <Page title="User Profile">
        <RootStyle>
          <Grid container spacing={3}>
            <Grid item xl={8} md={7} sm={12} xs={12}>
              {!!userData?.getUser?.listDto?.items?.length &&
                userData?.getUser?.listDto?.items?.map((user, i) => (
                  <Stack spacing={3} key={`person12-${i}`}>
                    <CardStyle key={i}>
                      <CardMedia
                        component="img"
                        alt="Cover Image"
                        height={'250px'}
                        image={user?.personDto?.coverUrl}
                      />

                      <CardContentStyle>
                        <StackContentStyle>
                          <Box>
                            <Avatar
                              alt={user?.personDto?.fullName}
                              src={user?.personDto?.avatarUrl}
                              sx={{ width: 80, height: 80 }}
                            />
                            <Typography gutterBottom variant="subtitle1" sx={{ mt: 1 }}>
                              {user?.personDto?.firstName} {user?.personDto?.lastName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {user?.userType}
                            </Typography>
                          </Box>
                          <CardContentBtn>
                            <Button size="large" variant="contained">
                              <Add />
                              <Typography sx={{ ml: 1.5 }}>Add Post</Typography>
                            </Button>
                            <Button
                              size="large"
                              variant="outlined"
                              sx={{
                                ml: 2,
                                '@media (max-width:425px)': {
                                  mt: 2,
                                  ml: 0,
                                },
                              }}
                            >
                              <Edit2 color={theme.palette.text.secondary} />
                              <Typography sx={{ ml: 1.5 }} color={theme.palette.text.secondary}>
                                Edit Profile
                              </Typography>
                            </Button>
                            <IconButton sx={{ ml: 3 }}>
                              <More color={theme.palette.text.primary} />
                            </IconButton>
                          </CardContentBtn>
                        </StackContentStyle>
                        <Stack direction={'row'} sx={{ justifyContent: 'space-between', mt: 1, alignItems: 'center' }}>
                          <Box >
                            <Button size="small" variant="text" sx={{ mb: 1, pl: 0 }}>
                              <StopCircle color={theme.palette.text.primary} />
                              <Typography color={theme.palette.text.primary} sx={{ ml: 1 }}>
                              {user?.personDto?.currnetCity?.city?.name ||  "Your Location"}
                              </Typography>
                            </Button>
                            <Button size="small" variant="text" sx={{ pl: 0 }}>
                              <StopCircle color={theme.palette.text.primary} />
                              <Typography color={theme.palette.text.primary} sx={{ ml: 1 }}>
                                {user?.personDto?.headline || "Your Headline"}
                              </Typography>
                            </Button>
                          </Box>
                          <Box>
                            <Box sx={{ backgroundColor: 'secondary.main', padding: '16px 8px', borderRadius: 1 }}>
                              <Typography color={theme.palette.background.paper}>BGD</Typography>
                            </Box>
                          </Box>
                        </Stack>
                      </CardContentStyle>
                    </CardStyle>
                  </Stack>
                ))}
            </Grid>
            <Grid item xl={4} md={5} sm={12} xs={12}>
              <Stack spacing={3}>
                <Stack spacing={1} sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1, p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" color={theme.palette.text.primary}>
                      Public Detalis
                    </Typography>
                    {full && (
                      <Link href="/profile/public-details" passHref>
                        <Typography variant="subtitle1" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                          Edit
                        </Typography>
                      </Link>
                    )}
                  </Box>
                  {full ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton>
                        <Briefcase color={theme.palette.text.primary} />
                      </IconButton>

                      <Typography variant="body1" color={theme.palette.text.primary} component="span">
                        Product Designer
                        <Typography component="span" variant="subtitle2" sx={{ ml: 1 }}>
                          At Garden of Love
                        </Typography>
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton>
                        <Briefcase color={theme.palette.text.secondary} />
                      </IconButton>

                      <Typography variant="subtitle2" color={theme.palette.text.secondary}>
                        Occupation
                      </Typography>
                    </Box>
                  )}

                  {full ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton>
                        <Book1 color={theme.palette.text.primary} />
                      </IconButton>
                      <Typography variant="body1" color={theme.palette.text.primary} component="span">
                        Studied Software Engineering
                        <Typography component="span" variant="subtitle2" sx={{ ml: 1 }}>
                          at Harward University From 2017 untill 2020
                        </Typography>
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton>
                        <Book1 color={theme.palette.text.secondary} />
                      </IconButton>

                      <Typography variant="subtitle2" color={theme.palette.text.secondary}>
                        Education
                      </Typography>
                    </Box>
                  )}

                  {currentCityData?.getLocation?.listDto?.items?.length ? (
                    currentCityData?.getLocation?.listDto?.items?.map((city) => (
                      <Box sx={{ display: 'flex', alignItems: 'center' }} key={city?.city?.id}>
                        <IconButton>
                          <Location color={theme.palette.text.primary} />
                        </IconButton>

                        <Typography variant="body1" color={theme.palette.text.primary} component="span">
                          Lives in
                          <Typography component="span" variant="subtitle2" sx={{ ml: 1 }}>
                            {city?.city?.name}
                          </Typography>
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton>
                        <Location color={theme.palette.text.secondary} />
                      </IconButton>

                      <Typography variant="subtitle2" color={theme.palette.text.secondary}>
                        Current city
                      </Typography>
                    </Box>
                  )}

                  {homeTownData?.getLocation?.listDto?.items?.length ? (
                    homeTownData?.getLocation?.listDto?.items?.map((city) => (
                      <Box sx={{ display: 'flex', alignItems: 'center' }} key={city?.id}>
                        <IconButton>
                          <Location color={theme.palette.text.primary} />
                        </IconButton>

                        <Typography variant="body1" color={theme.palette.text.primary} component="span">
                          From
                          <Typography component="span" variant="subtitle2" sx={{ ml: 1 }}>
                            {city?.city?.name}
                          </Typography>
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton>
                        <Location color={theme.palette.text.secondary} />
                      </IconButton>

                      <Typography variant="subtitle2" color={theme.palette.text.secondary}>
                        Hometown
                      </Typography>
                    </Box>
                  )}
                  {relationshipData?.getRelationship?.listDto?.items?.length ? (
                    relationshipData?.getRelationship?.listDto?.items?.map((rel) => (
                      <Box key={rel?.relationshipStatus?.id}>
                        <IconButton>
                          <Heart color={theme.palette.text.primary} />
                        </IconButton>

                        <Typography
                          variant="subtitle2"
                          color={theme.palette.text.primary}
                          component="span"
                          sx={{ mr: 1 }}
                        >
                          {rel?.relationshipStatus?.title}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton>
                        <Heart color={theme.palette.text.secondary} />
                      </IconButton>

                      <Typography variant="subtitle2" color={theme.palette.text.secondary}>
                        Relationship
                      </Typography>
                    </Box>
                  )}

                  {!!userData?.getUser?.listDto?.items?.length &&
                    userData?.getUser?.listDto?.items?.map((user, i) => (
                      <Box sx={{ display: 'flex', alignItems: 'center' }} key={`person-${i}`}>
                        <IconButton>
                          <LoginCurve color={theme.palette.text.primary} />
                        </IconButton>

                        <Typography variant="body1" color={theme.palette.text.primary} component="span">
                          Joined Garden of love at
                          <Typography component="span" variant="subtitle2" sx={{ ml: 1 }}>
                            {user?.personDto?.joinDateTime}
                          </Typography>
                        </Typography>
                      </Box>
                    ))}

                  {!full && (
                    <Box>
                      <Link href="/profile/public-details" passHref>
                        <Button
                          fullWidth
                          size="small"
                          variant="outlined"
                          sx={{ height: '40px', color: 'text.primary' }}
                          startIcon={<Add color={theme.palette.text.primary} />}
                        >
                          Add Public Details
                        </Button>
                      </Link>
                    </Box>
                  )}
                </Stack>

                <Stack spacing={2} sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1, p: 2 }}>
                  {emailData?.getUserEmails?.listDto?.items?.length ||
                  phoneNumberData?.getUserPhoneNumbers?.listDto?.items?.length ||
                  socialMediaData?.getUserSocialMedias?.listDto?.items?.length ||
                  websitesData?.getUserWebSites?.listDto?.items?.length ? (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" color={theme.palette.text.primary}>
                          Contact Info
                        </Typography>

                        <Link href="/profile/contact-info" passHref>
                          <Typography variant="subtitle1" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                            Edit
                          </Typography>
                        </Link>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ pl: 1, color: 'primary.main', pb: 1 }}>
                          Email
                        </Typography>
                        {isFetchingEmail ? (
                          <CircularProgress size={20} />
                        ) : (
                          emailData?.getUserEmails?.listDto?.items?.map((email) => (
                            <Typography
                              variant="body2"
                              color={theme.palette.text.primary}
                              sx={{ pl: 1 }}
                              key={email?.id}
                            >
                              {email?.email}
                            </Typography>
                          ))
                        )}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ pl: 1, color: 'primary.main', pb: 1 }}>
                          Phone Number
                        </Typography>
                        {isFetchingPhoneNumber ? (
                          <CircularProgress size={20} />
                        ) : (
                          phoneNumberData?.getUserPhoneNumbers?.listDto?.items?.map((number) => (
                            <Typography
                              key={number?.id}
                              variant="body2"
                              color={theme.palette.text.primary}
                              sx={{ pl: 1 }}
                            >
                              {number?.phoneNumber}
                            </Typography>
                          ))
                        )}
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" sx={{ pl: 1, color: 'primary.main', pb: 1 }}>
                          Social Links
                        </Typography>
                        {isFetchingSocialMedia ? (
                          <CircularProgress size={20} />
                        ) : (
                          socialMediaData?.getUserSocialMedias?.listDto?.items?.map((socialLink) => (
                            <Box sx={{ display: 'flex', alignItems: 'center' }} key={socialLink.id}>
                              <IconButton sx={{ pt: 0, pb: 0 }}>
                                <Instagram color={theme.palette.text.primary} />
                              </IconButton>

                              <Typography variant="body2" key={socialLink?.id} color={theme.palette.text.primary}>
                                {socialLink?.userName}
                              </Typography>
                            </Box>
                          ))
                        )}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ pl: 1, color: 'primary.main', pb: 1 }}>
                          Website
                        </Typography>
                        {isFetchingWebsite ? (
                          <CircularProgress size={20} />
                        ) : (
                          websitesData?.getUserWebSites?.listDto?.items?.map((website) => (
                            <Typography
                              key={website?.id}
                              variant="body2"
                              color={theme.palette.text.primary}
                              sx={{ pl: 1 }}
                            >
                              {website?.webSiteUrl}
                            </Typography>
                          ))
                        )}
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" color={theme.palette.text.primary}>
                          Contact Info
                        </Typography>
                      </Box>
                      <Box>
                        <Link href="/profile/contact-info" passHref>
                          <Button
                            fullWidth
                            size="small"
                            variant="outlined"
                            sx={{ height: '40px', color: 'text.primary', mt: 1 }}
                          >
                            <Add color={theme.palette.text.primary} />
                            Add Contact Info
                          </Button>
                        </Link>
                      </Box>
                    </>
                  )}
                </Stack>

                <Stack spacing={1} sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1, p: 2 }}>
                  {experiences?.length ? (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" color={theme.palette.text.primary}>
                          Experiences
                        </Typography>

                        <Link href="/profile/experience-list" passHref>
                          <Typography variant="subtitle1" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                            Edit
                          </Typography>
                        </Link>
                      </Box>

                      {isFetchingExprience ? (
                        <CircularProgress size={20} />
                      ) : (
                        experiences?.map((experience, index) => (
                          <Box key={experience?.id}>
                            <Box>
                              <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                                {experience?.title}
                              </Typography>
                            </Box>

                            <Box>
                              <Typography variant="caption" color={theme.palette.text.secondary}>
                                {experience?.startDate} - {experience?.endDate || 'Present'}
                                &nbsp; &#8226; &nbsp; months
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color={theme.palette.text.secondary}>
                                {experience?.cityDto?.name}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 1, alignItems: 'center' }}>
                              <ExperienceImage
                                alignItems="center"
                                justifyContent="center"
                                sx={{ mr: 1, borderRadius: 1 }}
                              >
                                <Image src="/icons/socials/google.png" width={'100%'} height={'100%'} />
                              </ExperienceImage>

                              <Box>
                                {experience?.description && (
                                  <ExperienceDescriptionStyle variant="body2">
                                    {experience?.description.split('\n').map((str, i) => (
                                      <p key={i}>{str}</p>
                                    ))}
                                  </ExperienceDescriptionStyle>
                                )}
                              </Box>
                            </Box>

                            {index < experiences?.length - 1 && <Divider sx={{ mt: 2 }} />}
                          </Box>
                        ))
                      )}
                      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
                        <Link href="/profile/experience-list" passHref>
                          <Button variant="text" size="small">
                            See 2 More Experinces
                          </Button>
                        </Link>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" color={theme.palette.text.primary}>
                          Experiences
                        </Typography>
                      </Box>
                      <Box>
                        <Link href="/profile/experience-list" passHref>
                          <Button
                            fullWidth
                            size="small"
                            variant="outlined"
                            sx={{ height: '40px', color: 'text.primary', mt: 1 }}
                          >
                            <Add color={theme.palette.text.primary} />
                            Add Experience
                          </Button>
                        </Link>
                      </Box>
                    </>
                  )}
                </Stack>

                <Stack spacing={2} sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1, p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" color={theme.palette.text.primary}>
                      Skills and Endorsements
                    </Typography>
                    {full && (
                      <Link href={'#'} passHref>
                        <Typography variant="subtitle1" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                          Edit
                        </Typography>
                      </Link>
                    )}
                  </Box>
                  {full ? (
                    <>
                      <Box>
                        <Typography variant="body2" color={theme.palette.text.primary} sx={{ display: 'flex' }}>
                          Design Thinking
                          <Typography variant="body2" sx={{ color: 'primary.main', pl: 1 }}>
                            1
                          </Typography>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color={theme.palette.text.primary} sx={{ display: 'flex' }}>
                          Research
                          <Typography variant="body2" sx={{ color: 'primary.main', pl: 1 }}>
                            3
                          </Typography>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color={theme.palette.text.primary} sx={{ display: 'flex' }}>
                          Design Thinking
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="text" size="small">
                          See 2 More Skills and Endorsements
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <Box>
                      <Link href="#" passHref>
                        <Button
                          fullWidth
                          size="small"
                          variant="outlined"
                          sx={{ height: '40px', color: 'text.primary' }}
                        >
                          <Add color={theme.palette.text.primary} />
                          Add Skills and Endorsements
                        </Button>
                      </Link>
                    </Box>
                  )}
                </Stack>

                <Stack spacing={1} sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1, p: 2 }}>
                  {certificates?.length ? (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" color={theme.palette.text.primary}>
                          Certificate
                        </Typography>

                        <Link href="/profile/Add-certificate" passHref>
                          <Typography variant="subtitle1" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                            Edit
                          </Typography>
                        </Link>
                      </Box>
                      {isFetchingCertificate ? (
                        <CircularProgress size={20} />
                      ) : (
                        certificates.map((certificate, index) => (
                          <Box key={certificate?.id}>
                            <Box>
                              <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                                {certificate?.certificateName?.title}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color={theme.palette.text.secondary}>
                                Issued {certificate?.issueDate} &#8226; No Expiration Date
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color={theme.palette.text.secondary}>
                                Credential ID {certificate?.credentialID}
                              </Typography>
                            </Box>
                          </Box>
                        ))
                      )}
                      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
                        <Link href="/profile/Add-certificate" passHref>
                          <Button variant="text" size="small">
                            See 1 More Certificate
                          </Button>
                        </Link>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" color={theme.palette.text.primary}>
                          Certificate
                        </Typography>
                      </Box>
                      <Box>
                        <Link href="/profile/Add-certificate" passHref>
                          <Button
                            fullWidth
                            size="small"
                            variant="outlined"
                            sx={{ height: '40px', color: 'text.primary' }}
                          >
                            <Add color={theme.palette.text.primary} />
                            Add Certificate
                          </Button>
                        </Link>
                      </Box>
                    </>
                  )}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </RootStyle>
      </Page>
    </>
  );
}
