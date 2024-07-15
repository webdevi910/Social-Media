import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type GetPersonCollegesQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestPersonCollegeGetAllInputType;
}>;


export type GetPersonCollegesQuery = { getPersonColleges?: { listDto?: { items?: Array<{ id: string, graduated?: boolean | null, startDate?: any | null, endDate?: any | null, audience?: ServerTypes.AudienceEnum | null, instituteType?: ServerTypes.InstituteTypeEnum | null, collegeDto?: { id: string, name?: string | null, country?: string | null } | null, concentrationDto?: { id: string, title?: string | null } | null } | null> | null } | null } | null };


export const GetPersonCollegesDocument = `
    query getPersonColleges($filter: GenericFilterRequestPersonCollegeGetAllInputType!) {
  getPersonColleges(filter: $filter) {
    listDto {
      items {
        id
        collegeDto {
          id
          name
          country
        }
        concentrationDto {
          id
          title
        }
        graduated
        startDate
        endDate
        audience
        instituteType
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPersonColleges: build.query<GetPersonCollegesQuery, GetPersonCollegesQueryVariables>({
      query: (variables) => ({ document: GetPersonCollegesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetPersonCollegesQuery, useLazyGetPersonCollegesQuery } = injectedRtkApi;

