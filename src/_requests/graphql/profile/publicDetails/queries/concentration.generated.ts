import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type SearchConcentrationsQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestConcentrationInputType;
}>;


export type SearchConcentrationsQuery = { concentrations?: { listDto?: { items?: Array<{ id: string, title?: string | null } | null> | null } | null } | null };


export const SearchConcentrationsDocument = `
    query searchConcentrations($filter: GenericFilterRequestConcentrationInputType!) {
  concentrations(filter: $filter) {
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
    searchConcentrations: build.query<SearchConcentrationsQuery, SearchConcentrationsQueryVariables>({
      query: (variables) => ({ document: SearchConcentrationsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSearchConcentrationsQuery, useLazySearchConcentrationsQuery } = injectedRtkApi;

