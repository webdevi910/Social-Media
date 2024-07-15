import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type GetExperiencesQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestPersonExperienceInputType;
}>;


export type GetExperiencesQuery = { getExpriences?: { listDto?: { items?: Array<{ title?: string | null, id?: any | null, description?: string | null, employmentType?: ServerTypes.EmploymentTypeEnum | null, audience?: ServerTypes.AudienceEnum | null, startDate?: any | null, endDate?: any | null, stillWorkingThere?: boolean | null, companyId?: any | null, cityId?: any | null, mediaUrl?: string | null, companyDto?: { id?: any | null, title?: string | null, logoUrl?: string | null } | null, cityDto?: { id?: any | null, name?: string | null, placeId?: string | null } | null } | null> | null } | null } | null };


export const GetExperiencesDocument = `
    query getExperiences($filter: GenericFilterRequestPersonExperienceInputType!) {
  getExpriences(filter: $filter) {
    listDto {
      items {
        title
        id
        description
        employmentType
        audience
        startDate
        endDate
        stillWorkingThere
        companyId
        companyDto {
          id
          title
          logoUrl
        }
        cityDto {
          id
          name
          placeId
        }
        cityId
        mediaUrl
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getExperiences: build.query<GetExperiencesQuery, GetExperiencesQueryVariables>({
      query: (variables) => ({ document: GetExperiencesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetExperiencesQuery, useLazyGetExperiencesQuery } = injectedRtkApi;

