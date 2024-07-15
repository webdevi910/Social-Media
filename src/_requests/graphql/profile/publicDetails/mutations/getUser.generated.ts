import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type GetUserQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestUserInputType;
}>;


export type GetUserQuery = { getUser?: { listDto?: { items?: Array<{ userType?: ServerTypes.UserTypeEnum | null, organizationUserDto?: { id: string, fullName?: string | null, coverUrl?: string | null, avatarUrl?: string | null, email?: string | null, joinDateTime?: any | null, organizationUserType?: ServerTypes.OrganizationUserTypeEnum | null, size?: number | null, establishmentDate?: any | null, joinAudience?: ServerTypes.AudienceEnum | null, placeAudience?: ServerTypes.AudienceEnum | null, sizeAudience?: ServerTypes.AudienceEnum | null, establishmentDateAudience?: ServerTypes.AudienceEnum | null, groupCategoryAudience?: ServerTypes.AudienceEnum | null, bio?: string | null } | null, personDto?: { id: string, firstName?: string | null, lastName?: string | null, fullName?: string | null, phoneNumber?: string | null, email?: string | null, coverUrl?: string | null, avatarUrl?: string | null, headline?: string | null, birthday?: any | null, gender?: ServerTypes.GenderEnum | null, joinDateTime?: any | null, joinAudience?: ServerTypes.AudienceEnum | null, currnetCity?: { id: string, personId: string, cityId: string, locationType?: ServerTypes.LocationTypeEnum | null, audience?: ServerTypes.AudienceEnum | null, city?: { id?: any | null, name?: string | null, placeId?: string | null, countryId?: any | null } | null } | null, hometown?: { id: string, personId: string, cityId: string, locationType?: ServerTypes.LocationTypeEnum | null, audience?: ServerTypes.AudienceEnum | null, city?: { id?: any | null, name?: string | null, placeId?: string | null, countryId?: any | null } | null } | null } | null } | null> | null } | null } | null };


export const GetUserDocument = `
    query getUser($filter: GenericFilterRequestUserInputType!) {
  getUser(filter: $filter) {
    listDto {
      items {
        userType
        organizationUserDto {
          id
          fullName
          coverUrl
          avatarUrl
          email
          joinDateTime
          organizationUserType
          size
          establishmentDate
          joinAudience
          placeAudience
          sizeAudience
          establishmentDateAudience
          groupCategoryAudience
          bio
        }
        personDto {
          id
          firstName
          lastName
          fullName
          phoneNumber
          email
          coverUrl
          avatarUrl
          headline
          birthday
          gender
          currnetCity {
            id
            personId
            cityId
            locationType
            audience
            city {
              id
              name
              placeId
              countryId
            }
          }
          hometown {
            id
            personId
            cityId
            locationType
            audience
            city {
              id
              name
              placeId
              countryId
            }
          }
          joinDateTime
          joinAudience
        }
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<GetUserQuery, GetUserQueryVariables>({
      query: (variables) => ({ document: GetUserDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetUserQuery, useLazyGetUserQuery } = injectedRtkApi;

