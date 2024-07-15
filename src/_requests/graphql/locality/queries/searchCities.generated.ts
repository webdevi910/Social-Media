import type * as ServerTypes from '../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Locality';
export type SearchCitiesQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestSearchCitiesInputType;
}>;


export type SearchCitiesQuery = { searchCities: { listDto?: { items?: Array<{ id?: string | null, name?: string | null } | null> | null } | null } };


export const SearchCitiesDocument = `
    query searchCities($filter: GenericFilterRequestSearchCitiesInputType!) {
  searchCities(filter: $filter) {
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
    searchCities: build.query<SearchCitiesQuery, SearchCitiesQueryVariables>({
      query: (variables) => ({ document: SearchCitiesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSearchCitiesQuery, useLazySearchCitiesQuery } = injectedRtkApi;

