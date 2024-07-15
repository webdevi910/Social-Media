// // @mui
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Dialog,
//   Divider,
//   Icon,
//   IconButton,
//   Stack,
//   Typography,
//   useTheme,
// } from '@mui/material';
// import { Add, ArrowLeft, CloseCircle, Edit2, Instagram } from 'iconsax-react';
// // components
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useDispatch, useSelector } from 'src/redux/store';

// import { PersonEmailType } from 'src/@types/sections/profile/userEmails';
// import { PersonSocialMediaType } from 'src/@types/sections/profile/userSocialMedia';

// import { addedEmail, userEmailsSelector } from 'src/redux/slices/profile/userEmails-slice';
// import { addedSocialMedia, userSocialMediasSelector } from 'src/redux/slices/profile/userSocialMedia-slice';

// import { useGetUserEmailsQuery } from 'src/_requests/graphql/profile/contactInfo/queries/getUserEmails.generated';
// import { useGetUserSocialMediasQuery } from 'src/_requests/graphql/profile/contactInfo/queries/getUserSocialMedias.generated';
// import { AudienceEnum } from 'src/@types/sections/serverTypes';

// export default function ContactInfoMain() {
//   const { data: emailData, isFetching: isFetchingEmail } = useGetUserEmailsQuery({
//     filter: {
//       dto: {
//         id: null,
//       },
//     },
//   });
//   const { data: socialMediaData, isFetching: isFetchingSocialMedia } = useGetUserSocialMediasQuery({
//     filter: {
//       dto: {
//         id: null,
//       },
//     },
//   });
//   const router = useRouter();
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const personEmail = useSelector(userEmailsSelector);
//   const personSocialMedia = useSelector(userSocialMediasSelector);

//   const handleEditEmail = (email: PersonEmailType) => {
//     dispatch(
//       addedEmail({
//         ...personEmail,
//         id: email.id,
//         audience: email.audience,
//         email: email.email,
//         status: email.status,
//       })
//     );

//     router.push('/profile/contact-info/user-emails/upsert-user-email-form');
//   };
//   const handleEditSocialLick = (socialLink: PersonSocialMediaType) => {
//     dispatch(
//       addedSocialMedia({
//         ...personSocialMedia,
//         id: socialLink.id,
//         audience: socialLink.audience,
//         userName: socialLink.userName,
//         socialMediaDto: socialLink.socialMediaDto,
//       })
//     );

//     router.push('/profile/contact-info/user-social-links/upsert-user-socialMedia-form');
//   };
//   const handleRoutingEmail = (email: PersonEmailType) => {
//     dispatch(addedEmail(email));
//     router.push('/profile/contact-info/user-emails/upsert-user-email-form');
//   };
//   const handleRoutingSocialMedia = (socialLink: PersonSocialMediaType) => {
//     dispatch(addedSocialMedia(socialLink));
//     router.push('/profile/contact-info/user-social-links/upsert-user-socialMedia-form');
//   };

//   return (
//     <>
//       <Stack spacing={1} sx={{ px: 2, pt: 2 }}>
//         <Typography variant="subtitle2" color="text.primary">
//           Email
//         </Typography>

//         {isFetchingEmail && <CircularProgress size={20} />}
//         {emailData?.getUserEmails?.listDto?.items?.map((email) => (
//           <Typography variant="body2" color="text.primary" key={email?.id}>
//             {email?.email}
//             <IconButton sx={{ mr: 1 }} onClick={() => handleEditEmail(email as PersonEmailType)}>
//               <Edit2 size="16" color={theme.palette.text.primary} />
//             </IconButton>
//           </Typography>
//         ))}

//         <Button
//           variant="outlined"
//           size="small"
//           sx={{ height: '40px', color: 'text.primary', mt: '16px !important' }}
//           onClick={() => handleRoutingEmail({ audience: AudienceEnum.Public })}
//         >
//           <Add color={theme.palette.text.primary} />
//           Add Email
//         </Button>
//       </Stack>
//       <Divider />
//       <Stack spacing={1} sx={{ px: 2 }}>
//         <Typography variant="subtitle2" color="text.primary">
//           Phone Number
//         </Typography>

//         <Button variant="outlined" size="small" sx={{ height: '40px', color: 'text.primary', mt: '16px !important' }}>
//           <Add color={theme.palette.text.primary} />
//           Add Phone Number
//         </Button>
//       </Stack>
//       <Divider />
//       <Stack spacing={1} sx={{ px: 2 }}>
//         <Typography variant="subtitle2" color="text.primary">
//           Social Link
//         </Typography>

//         {isFetchingSocialMedia ? (
//           <CircularProgress size={20} />
//         ) : (
//           socialMediaData?.getUserSocialMedias?.listDto?.items?.map((socialLink) => (
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
              
//               <Typography variant="body2" color={theme.palette.text.secondary} key={socialLink?.id}>
//                 {socialLink?.socialMediaDto.title}:
//               </Typography>
//               <Typography variant="body2" color="text.primary" key={socialLink?.id} sx={{ ml: 1 }}>
//                 {socialLink?.userName}
//               </Typography>
//               <IconButton sx={{ mr: 1 }} onClick={() => handleEditSocialLick(socialLink as PersonSocialMediaType)}>
//                 <Edit2 size="18" color={theme.palette.text.primary} />
//               </IconButton>
//             </Box>
//           ))
//         )}

//         <Button
//           startIcon={<Add color={theme.palette.text.primary} />}
//           variant="outlined"
//           sx={{ height: '40px', color: 'text.primary', mt: '16px !important' }}
//           size="small"
//           onClick={() => handleRoutingSocialMedia({ audience: AudienceEnum.Public })}
//         >
//           Add Social Link
//         </Button>
//       </Stack>
//       <Divider />
//       <Stack spacing={1} sx={{ px: 2 }}>
//         <Typography variant="subtitle2" color="text.primary">
//           Website
//         </Typography>
//         <Button variant="outlined" size="small" sx={{ height: '40px', color: 'text.primary', mt: '16px !important' }}>
//           <Add color={theme.palette.text.primary} />
//           Add Website
//         </Button>
//       </Stack>
//       <Divider />
//     </>
//   );
// }
// @mui
import { Box, Button, CircularProgress, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { Add, CloseSquare, Edit2, Instagram } from 'iconsax-react';

// components
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'src/redux/store';
import { PersonEmailType } from 'src/@types/sections/profile/userEmails';
import { AudienceEnum  } from 'src/@types/sections/serverTypes';
import { PersonWebSiteType } from 'src/@types/sections/profile/userWebsite';
import { UserPhoneNumberType } from 'src/@types/sections/profile/userPhoneNumber';
import { websiteAdded, userWebsiteSelector } from 'src/redux/slices/profile/userWebsite-slice';
import { phoneNumberAdded, userPhoneNumberSelector } from 'src/redux/slices/profile/userPhoneNumber-slice';
import { PersonSocialMediaType } from 'src/@types/sections/profile/userSocialMedia';
import { addedEmail, userEmailsSelector } from 'src/redux/slices/profile/userEmails-slice';
import { addedSocialMedia, userSocialMediasSelector } from 'src/redux/slices/profile/userSocialMedia-slice';
import { useGetUserEmailsQuery } from 'src/_requests/graphql/profile/contactInfo/queries/getUserEmails.generated';
import { useGetUserWebSitesQuery } from 'src/_requests/graphql/profile/contactInfo/queries/getUserWebSites.generated';
import { useGetUserSocialMediasQuery } from 'src/_requests/graphql/profile/contactInfo/queries/getUserSocialMedias.generated';
import { useGetUserPhoneNumbersQuery } from 'src/_requests/graphql/profile/contactInfo/queries/getUserPhoneNumbers.generated';

export default function ContactInfoNewDialog() {
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

  const { data: websitesData, isFetching: isFetchingWebsite } = useGetUserWebSitesQuery({ filter: { all: true } });

  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const personEmail = useSelector(userEmailsSelector);
  const userWebsite = useSelector(userWebsiteSelector);
  const userPhoneNumber = useSelector(userPhoneNumberSelector);
  const personSocialMedia = useSelector(userSocialMediasSelector);

  const handleEditEmail = (email: PersonEmailType) => {
    dispatch(
      addedEmail({
        ...personEmail,
        id: email.id,
        audience: email.audience,
        email: email.email,
        status: email.status,
      })
    );

    router.push('/profile/email-form');
  };

  const handleEditPhoneNumber = (number: UserPhoneNumberType) => {
    dispatch(
      phoneNumberAdded({
        ...userPhoneNumber,
        id: number.id,
        userId: number.userId,
        phoneNumber: number.phoneNumber,
        status: number.status,
        audience: number.audience,
        verificationCode: number.verificationCode,
      })
    );
    router.push('/profile/contact-info/phone-number-form');
  };

  const handleEditSocialLick = (socialLink: PersonSocialMediaType) => {
    dispatch(
      addedSocialMedia({
        ...personSocialMedia,
        id: socialLink.id,
        audience: socialLink.audience,
        userName: socialLink.userName,
        socialMediaDto: socialLink.socialMediaDto,
      })
    );

    router.push('/profile/contact-info/user-social-links/upsert-user-socialMedia-form');
  };

  const handleEditWebsite = (website: PersonWebSiteType) => {
    dispatch(
      websiteAdded({
        ...userWebsite,
        id: website.id,
        userId: website.userId,
        audience: website.audience,
        webSiteUrl: website.webSiteUrl,
      })
    );
    router.push('/profile/edit-website');
  };

  const handleRoutingPhoneNumber = (number: UserPhoneNumberType) => {
    dispatch(phoneNumberAdded(number));
    router.push('/profile/contact-info/phone-number-form');
  };

  const handleRoutingWebsite = (website: PersonWebSiteType) => {
    dispatch(websiteAdded(website));
    router.push('/profile/contact-info/website-form');
  };
  const handleRoutingEmail = (email: PersonEmailType) => {
    dispatch(addedEmail(email));
    router.push('/profile/email-form');
  };
  const handleRoutingSocialMedia = (socialLink: PersonSocialMediaType) => {
    dispatch(addedSocialMedia(socialLink));
    router.push('/profile/social-link-form');
  };

  return (
    <>
      <Stack spacing={2} sx={{ py: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ justifyContent: 'space-between', px: 2 }}>
          <Typography variant="subtitle1" color="text.primary">
            Contact Info
          </Typography>
          <Link href={'/profile/user'} passHref>
            <IconButton>
              <CloseSquare variant="Outline" />
            </IconButton>
          </Link>
        </Stack>
        <Divider />

        <Stack spacing={2} sx={{ px: 2 }}>
          <Typography variant="subtitle2" color="text.primary">
            Email
          </Typography>

          {isFetchingEmail ? (
            <CircularProgress size={20} />
          ) : (
            emailData?.getUserEmails?.listDto?.items?.map((email) => (
              <Typography variant="body2" color="text.primary" key={email?.id}>
                {email?.email}
                <IconButton sx={{ mr: 1 }} onClick={() => handleEditEmail(email as PersonEmailType)}>
                  <Edit2 size="16" color={theme.palette.text.primary} />
                </IconButton>
              </Typography>
            ))
          )}

          {/* <Link href="/profile/email-form"> */}
          <Button
            variant="outlined"
            sx={{ height: '40px', color: 'text.primary' }}
            onClick={() => handleRoutingEmail({ audience: AudienceEnum.Public })}
          >
            <Add color={theme.palette.text.primary} />
            <Typography>Add Email</Typography>
          </Button>
          {/* </Link> */}
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <Typography variant="subtitle2" color="text.primary">
            Phone Number
          </Typography>

          {isFetchingPhoneNumber ? (
            <CircularProgress size={22} />
          ) : (
            phoneNumberData?.getUserPhoneNumbers?.listDto?.items?.map((number) => (
              <Typography variant="body2" color="text.primary" key={number?.id}>
                {number?.phoneNumber}
                <IconButton sx={{ mr: 1 }} onClick={() => handleEditPhoneNumber(number as UserPhoneNumberType)}>
                  <Edit2 size="16" color={theme.palette.text.primary} />
                </IconButton>
              </Typography>
            ))
          )}

          <Button
            variant="outlined"
            sx={{ height: '40px', color: 'text.primary' }}
            onClick={() => handleRoutingPhoneNumber({ audience: AudienceEnum.Public })}
          >
            <Add color={theme.palette.text.primary} />
            <Typography>Add Phone Number</Typography>
          </Button>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <Typography variant="subtitle2" color="text.primary">
            Social Link
          </Typography>

          {isFetchingSocialMedia ? (
            <CircularProgress size={20} />
          ) : (
            socialMediaData?.getUserSocialMedias?.listDto?.items?.map((socialLink) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }} key={socialLink?.id}>
                <Instagram color={theme.palette.text.primary} size="24" />

                <Typography variant="body2" color="text.primary" key={socialLink?.id} sx={{ ml: 1 }}>
                  {socialLink?.userName}
                </Typography>
                <IconButton sx={{ mr: 1 }} onClick={() => handleEditSocialLick(socialLink as PersonSocialMediaType)}>
                  <Edit2 size="16" color={theme.palette.text.primary} />
                </IconButton>
              </Box>
            ))
          )}

          {/* <Link href="/profile/social-link-form" passHref> */}
          <Button
            startIcon={<Add color={theme.palette.text.primary} />}
            variant="outlined"
            sx={{ height: '40px', color: 'text.primary' }}
            onClick={() => handleRoutingSocialMedia({ audience: AudienceEnum.Public })}
          >
            <Typography>Add Social Link</Typography>
          </Button>
          {/* </Link> */}
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ px: 2 }}>
          <Typography variant="subtitle2" color="text.primary">
            Website
          </Typography>
          {isFetchingWebsite ? (
            <CircularProgress size={22} />
          ) : (
            websitesData?.getUserWebSites?.listDto?.items?.map((website) => (
              <Typography variant="body2" color="text.primary" key={website?.id}>
                {website?.webSiteUrl}
                <IconButton sx={{ mr: 1 }} onClick={() => handleEditWebsite(website as PersonWebSiteType)}>
                  <Edit2 size="16" color={theme.palette.text.primary} />
                </IconButton>
              </Typography>
            ))
          )}

          <Button
            variant="outlined"
            sx={{ height: '40px', color: 'text.primary' }}
            onClick={() => handleRoutingWebsite({ audience: AudienceEnum.Public })}
          >
            <Add color={theme.palette.text.primary} />
            <Typography>Add Website</Typography>
          </Button>
        </Stack>
        <Divider />
      </Stack>
    </>
  );
}
