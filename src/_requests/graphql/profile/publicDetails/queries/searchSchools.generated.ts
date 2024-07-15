import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type SearchSchoolsQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestSearchSchoolInputType;
}>;


export type SearchSchoolsQuery = { searchSchools?: { listDto?: { items?: Array<{ id: string, title?: string | null } | null> | null } | null } | null };


export const SearchSchoolsDocument = `
    query searchSchools($filter: GenericFilterRequestSearchSchoolInputType!) {
  searchSchools(filter: $filter) {
    listDto {
      items {
        id
        title
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    searchSchools: build.query<SearchSchoolsQuery, SearchSchoolsQueryVariables>({
      query: (variables) => ({ document: SearchSchoolsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSearchSchoolsQuery, useLazySearchSchoolsQuery } = injectedRtkApi;

