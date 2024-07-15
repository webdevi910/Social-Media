import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type GetPersonSchoolsQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestPersonSchoolGetAllInputType;
}>;


export type GetPersonSchoolsQuery = { getPersonSchools?: { listDto?: { items?: Array<{ id: string, year?: number | null, personId?: any | null, schoolId?: any | null, audience?: ServerTypes.AudienceEnum | null, school?: { id: string, title?: string | null } | null } | null> | null } | null } | null };


export const GetPersonSchoolsDocument = `
    query getPersonSchools($filter: GenericFilterRequestPersonSchoolGetAllInputType!) {
  getPersonSchools(filter: $filter) {
    listDto {
      items {
        id
        year
        personId
        school {
          id
          title
        }
        schoolId
        audience
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPersonSchools: build.query<GetPersonSchoolsQuery, GetPersonSchoolsQueryVariables>({
      query: (variables) => ({ document: GetPersonSchoolsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetPersonSchoolsQuery, useLazyGetPersonSchoolsQuery } = injectedRtkApi;

