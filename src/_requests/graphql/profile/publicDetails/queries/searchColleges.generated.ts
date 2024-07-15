import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type SearchCollegesQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestSearchCollegeInputType;
}>;


export type SearchCollegesQuery = { searchColleges?: { listDto?: { items?: Array<{ id: string, name?: string | null } | null> | null } | null } | null };


export const SearchCollegesDocument = `
    query searchColleges($filter: GenericFilterRequestSearchCollegeInputType!) {
  searchColleges(filter: $filter) {
    listDto {
      items {
        id
        name
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    searchColleges: build.query<SearchCollegesQuery, SearchCollegesQueryVariables>({
      query: (variables) => ({ document: SearchCollegesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSearchCollegesQuery, useLazySearchCollegesQuery } = injectedRtkApi;

