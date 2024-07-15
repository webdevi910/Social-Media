import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type SearchIssuingOrganizationsQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestIssuingOrganizationSearchInputType;
}>;


export type SearchIssuingOrganizationsQuery = { searchIssuingOrganizations?: { listDto?: { items?: Array<{ id?: any | null, title?: string | null } | null> | null } | null } | null };


export const SearchIssuingOrganizationsDocument = `
    query searchIssuingOrganizations($filter: GenericFilterRequestIssuingOrganizationSearchInputType!) {
  searchIssuingOrganizations(filter: $filter) {
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
    searchIssuingOrganizations: build.query<SearchIssuingOrganizationsQuery, SearchIssuingOrganizationsQueryVariables>({
      query: (variables) => ({ document: SearchIssuingOrganizationsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSearchIssuingOrganizationsQuery, useLazySearchIssuingOrganizationsQuery } = injectedRtkApi;

