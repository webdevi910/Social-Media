import { api as createCertificateNameApi } from 'src/_requests/graphql/profile/certificates/Mutations/createCertificateName.generated' 
import { api as createIssuingOrganizationApi } from 'src/_requests/graphql/profile/certificates/Mutations/createIssuingOrganization.generated' 
import { api as deleteCertificateApi } from 'src/_requests/graphql/profile/certificates/Mutations/deleteCertificate.generated' 
import { api as upsertCertificateApi } from 'src/_requests/graphql/profile/certificates/Mutations/upsertCertificate.generated' 
import { api as getCertificatesApi } from 'src/_requests/graphql/profile/certificates/queries/getCertificates.generated' 
import { api as searchCertificateNamesApi } from 'src/_requests/graphql/profile/certificates/queries/searchCertificateNames.generated' 
import { api as searchIssuingOrganizationsApi } from 'src/_requests/graphql/profile/certificates/queries/searchIssuingOrganizations.generated' 
import { api as confirmPhoneNumberApi } from 'src/_requests/graphql/profile/contactInfo/mutations/confirmPhoneNumber.generated' 
import { api as confirmUserEmailApi } from 'src/_requests/graphql/profile/contactInfo/mutations/confirmUserEmail.generated' 
import { api as deleteUserEmailApi } from 'src/_requests/graphql/profile/contactInfo/mutations/deleteUserEmail.generated' 
import { api as deleteUserSocialMediaApi } from 'src/_requests/graphql/profile/contactInfo/mutations/deleteUserSocialMedia.generated' 
import { api as deleteWebSiteApi } from 'src/_requests/graphql/profile/contactInfo/mutations/deleteWebSite.generated' 
import { api as removePhoneNumberApi } from 'src/_requests/graphql/profile/contactInfo/mutations/removePhoneNumber.generated' 
import { api as resendPhoneCodeApi } from 'src/_requests/graphql/profile/contactInfo/mutations/resendPhoneCode.generated' 
import { api as upsertPhoneNumberApi } from 'src/_requests/graphql/profile/contactInfo/mutations/upsertPhoneNumber.generated' 
import { api as upsertUserEmailApi } from 'src/_requests/graphql/profile/contactInfo/mutations/upsertUserEmail.generated' 
import { api as upsertUserSocialMediaApi } from 'src/_requests/graphql/profile/contactInfo/mutations/upsertUserSocialMedia.generated' 
import { api as upsertWebsiteApi } from 'src/_requests/graphql/profile/contactInfo/mutations/upsertWebsite.generated' 
import { api as getSocialMediasApi } from 'src/_requests/graphql/profile/contactInfo/queries/getSocialMedias.generated' 
import { api as getUserEmailsApi } from 'src/_requests/graphql/profile/contactInfo/queries/getUserEmails.generated' 
import { api as getUserPhoneNumbersApi } from 'src/_requests/graphql/profile/contactInfo/queries/getUserPhoneNumbers.generated' 
import { api as getUserSocialMediasApi } from 'src/_requests/graphql/profile/contactInfo/queries/getUserSocialMedias.generated' 
import { api as getUserWebSitesApi } from 'src/_requests/graphql/profile/contactInfo/queries/getUserWebSites.generated' 
import { api as addExperienceApi } from 'src/_requests/graphql/profile/experiences/mutations/addExperience.generated' 
import { api as createCompanyApi } from 'src/_requests/graphql/profile/experiences/mutations/createCompany.generated' 
import { api as updateExperienceApi } from 'src/_requests/graphql/profile/experiences/mutations/updateExperience.generated' 
import { api as getExperiencesApi } from 'src/_requests/graphql/profile/experiences/queries/getExperiences.generated' 
import { api as searchCompaniesApi } from 'src/_requests/graphql/profile/experiences/queries/searchCompanies.generated' 
import { api as addCurrentCityApi } from 'src/_requests/graphql/profile/publicDetails/mutations/addCurrentCity.generated' 
import { api as createCollegeApi } from 'src/_requests/graphql/profile/publicDetails/mutations/createCollege.generated' 
import { api as createConcentraitionApi } from 'src/_requests/graphql/profile/publicDetails/mutations/createConcentraition.generated' 
import { api as createPersonCollegeApi } from 'src/_requests/graphql/profile/publicDetails/mutations/createPersonCollege.generated' 
import { api as createPersonSchoolApi } from 'src/_requests/graphql/profile/publicDetails/mutations/createPersonSchool.generated' 
import { api as createSchoolApi } from 'src/_requests/graphql/profile/publicDetails/mutations/createSchool.generated' 
import { api as deleteLocationApi } from 'src/_requests/graphql/profile/publicDetails/mutations/deleteLocation.generated' 
import { api as deletePersonCollegeApi } from 'src/_requests/graphql/profile/publicDetails/mutations/deletePersonCollege.generated' 
import { api as deletePersonSchoolApi } from 'src/_requests/graphql/profile/publicDetails/mutations/deletePersonSchool.generated' 
import { api as getUserApi } from 'src/_requests/graphql/profile/publicDetails/queries/getUser.generated' 
import { api as updateJoinAudienceApi } from 'src/_requests/graphql/profile/publicDetails/mutations/updateJoinAudience.generated' 
import { api as updatePersonCollegeApi } from 'src/_requests/graphql/profile/publicDetails/mutations/updatePersonCollege.generated' 
import { api as updatePersonSchoolApi } from 'src/_requests/graphql/profile/publicDetails/mutations/updatePersonSchool.generated' 
import { api as updateRelationshipApi } from 'src/_requests/graphql/profile/publicDetails/mutations/updateRelationship.generated' 
import { api as concentrationApi } from 'src/_requests/graphql/profile/publicDetails/queries/concentration.generated' 
import { api as getLocationApi } from 'src/_requests/graphql/profile/publicDetails/queries/getLocation.generated' 
import { api as getPersonCollegesApi } from 'src/_requests/graphql/profile/publicDetails/queries/getPersonColleges.generated' 
import { api as getPersonSchoolsApi } from 'src/_requests/graphql/profile/publicDetails/queries/getPersonSchools.generated' 
import { api as getRelationshipApi } from 'src/_requests/graphql/profile/publicDetails/queries/getRelationship.generated' 
import { api as getRelationshipStatusApi } from 'src/_requests/graphql/profile/publicDetails/queries/getRelationshipStatus.generated' 
import { api as searchCollegesApi } from 'src/_requests/graphql/profile/publicDetails/queries/searchColleges.generated' 
import { api as searchSchoolsApi } from 'src/_requests/graphql/profile/publicDetails/queries/searchSchools.generated' 
import { api as createPersonSkillApi } from 'src/_requests/graphql/profile/skills/mutations/createPersonSkill.generated' 
import { api as createSkillApi } from 'src/_requests/graphql/profile/skills/mutations/createSkill.generated' 
import { api as deletePersonSkillApi } from 'src/_requests/graphql/profile/skills/mutations/deletePersonSkill.generated' 
import { api as endorsementSkillApi } from 'src/_requests/graphql/profile/skills/mutations/endorsementSkill.generated' 
import { api as getEndorsementsApi } from 'src/_requests/graphql/profile/skills/queries/getEndorsements.generated' 
import { api as getPersonSkillsApi } from 'src/_requests/graphql/profile/skills/queries/getPersonSkills.generated' 
import { api as getSkillsApi } from 'src/_requests/graphql/profile/skills/queries/getSkills.generated' 
export const reducers = { 
  [createCertificateNameApi.reducerPath]: createCertificateNameApi.reducer, 
  [createIssuingOrganizationApi.reducerPath]: createIssuingOrganizationApi.reducer, 
  [deleteCertificateApi.reducerPath]: deleteCertificateApi.reducer, 
  [upsertCertificateApi.reducerPath]: upsertCertificateApi.reducer, 
  [getCertificatesApi.reducerPath]: getCertificatesApi.reducer, 
  [searchCertificateNamesApi.reducerPath]: searchCertificateNamesApi.reducer, 
  [searchIssuingOrganizationsApi.reducerPath]: searchIssuingOrganizationsApi.reducer, 
  [confirmPhoneNumberApi.reducerPath]: confirmPhoneNumberApi.reducer, 
  [confirmUserEmailApi.reducerPath]: confirmUserEmailApi.reducer, 
  [deleteUserEmailApi.reducerPath]: deleteUserEmailApi.reducer, 
  [deleteUserSocialMediaApi.reducerPath]: deleteUserSocialMediaApi.reducer, 
  [deleteWebSiteApi.reducerPath]: deleteWebSiteApi.reducer, 
  [removePhoneNumberApi.reducerPath]: removePhoneNumberApi.reducer, 
  [resendPhoneCodeApi.reducerPath]: resendPhoneCodeApi.reducer, 
  [upsertPhoneNumberApi.reducerPath]: upsertPhoneNumberApi.reducer, 
  [upsertUserEmailApi.reducerPath]: upsertUserEmailApi.reducer, 
  [upsertUserSocialMediaApi.reducerPath]: upsertUserSocialMediaApi.reducer, 
  [upsertWebsiteApi.reducerPath]: upsertWebsiteApi.reducer, 
  [getSocialMediasApi.reducerPath]: getSocialMediasApi.reducer, 
  [getUserEmailsApi.reducerPath]: getUserEmailsApi.reducer, 
  [getUserPhoneNumbersApi.reducerPath]: getUserPhoneNumbersApi.reducer, 
  [getUserSocialMediasApi.reducerPath]: getUserSocialMediasApi.reducer, 
  [getUserWebSitesApi.reducerPath]: getUserWebSitesApi.reducer, 
  [addExperienceApi.reducerPath]: addExperienceApi.reducer, 
  [createCompanyApi.reducerPath]: createCompanyApi.reducer, 
  [updateExperienceApi.reducerPath]: updateExperienceApi.reducer, 
  [getExperiencesApi.reducerPath]: getExperiencesApi.reducer, 
  [searchCompaniesApi.reducerPath]: searchCompaniesApi.reducer, 
  [addCurrentCityApi.reducerPath]: addCurrentCityApi.reducer, 
  [createCollegeApi.reducerPath]: createCollegeApi.reducer, 
  [createConcentraitionApi.reducerPath]: createConcentraitionApi.reducer, 
  [createPersonCollegeApi.reducerPath]: createPersonCollegeApi.reducer, 
  [createPersonSchoolApi.reducerPath]: createPersonSchoolApi.reducer, 
  [createSchoolApi.reducerPath]: createSchoolApi.reducer, 
  [deleteLocationApi.reducerPath]: deleteLocationApi.reducer, 
  [deletePersonCollegeApi.reducerPath]: deletePersonCollegeApi.reducer, 
  [deletePersonSchoolApi.reducerPath]: deletePersonSchoolApi.reducer, 
  [getUserApi.reducerPath]: getUserApi.reducer, 
  [updateJoinAudienceApi.reducerPath]: updateJoinAudienceApi.reducer, 
  [updatePersonCollegeApi.reducerPath]: updatePersonCollegeApi.reducer, 
  [updatePersonSchoolApi.reducerPath]: updatePersonSchoolApi.reducer, 
  [updateRelationshipApi.reducerPath]: updateRelationshipApi.reducer, 
  [concentrationApi.reducerPath]: concentrationApi.reducer, 
  [getLocationApi.reducerPath]: getLocationApi.reducer, 
  [getPersonCollegesApi.reducerPath]: getPersonCollegesApi.reducer, 
  [getPersonSchoolsApi.reducerPath]: getPersonSchoolsApi.reducer, 
  [getRelationshipApi.reducerPath]: getRelationshipApi.reducer, 
  [getRelationshipStatusApi.reducerPath]: getRelationshipStatusApi.reducer, 
  [searchCollegesApi.reducerPath]: searchCollegesApi.reducer, 
  [searchSchoolsApi.reducerPath]: searchSchoolsApi.reducer, 
  [createPersonSkillApi.reducerPath]: createPersonSkillApi.reducer, 
  [createSkillApi.reducerPath]: createSkillApi.reducer, 
  [deletePersonSkillApi.reducerPath]: deletePersonSkillApi.reducer, 
  [endorsementSkillApi.reducerPath]: endorsementSkillApi.reducer, 
  [getEndorsementsApi.reducerPath]: getEndorsementsApi.reducer, 
  [getPersonSkillsApi.reducerPath]: getPersonSkillsApi.reducer, 
  [getSkillsApi.reducerPath]: getSkillsApi.reducer, 
} 
export const middleware = [createCertificateNameApi.middleware, createIssuingOrganizationApi.middleware, deleteCertificateApi.middleware, upsertCertificateApi.middleware, getCertificatesApi.middleware, searchCertificateNamesApi.middleware, searchIssuingOrganizationsApi.middleware, confirmPhoneNumberApi.middleware, confirmUserEmailApi.middleware, deleteUserEmailApi.middleware, deleteUserSocialMediaApi.middleware, deleteWebSiteApi.middleware, removePhoneNumberApi.middleware, resendPhoneCodeApi.middleware, upsertPhoneNumberApi.middleware, upsertUserEmailApi.middleware, upsertUserSocialMediaApi.middleware, upsertWebsiteApi.middleware, getSocialMediasApi.middleware, getUserEmailsApi.middleware, getUserPhoneNumbersApi.middleware, getUserSocialMediasApi.middleware, getUserWebSitesApi.middleware, addExperienceApi.middleware, createCompanyApi.middleware, updateExperienceApi.middleware, getExperiencesApi.middleware, searchCompaniesApi.middleware, addCurrentCityApi.middleware, createCollegeApi.middleware, createConcentraitionApi.middleware, createPersonCollegeApi.middleware, createPersonSchoolApi.middleware, createSchoolApi.middleware, deleteLocationApi.middleware, deletePersonCollegeApi.middleware, deletePersonSchoolApi.middleware, getUserApi.middleware, updateJoinAudienceApi.middleware, updatePersonCollegeApi.middleware, updatePersonSchoolApi.middleware, updateRelationshipApi.middleware, concentrationApi.middleware, getLocationApi.middleware, getPersonCollegesApi.middleware, getPersonSchoolsApi.middleware, getRelationshipApi.middleware, getRelationshipStatusApi.middleware, getUserApi.middleware, searchCollegesApi.middleware, searchSchoolsApi.middleware, createPersonSkillApi.middleware, createSkillApi.middleware, deletePersonSkillApi.middleware, endorsementSkillApi.middleware, getEndorsementsApi.middleware, getPersonSkillsApi.middleware, getSkillsApi.middleware]