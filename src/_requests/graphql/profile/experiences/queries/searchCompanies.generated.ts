import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type SearchCompaniesQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestCompanySearchInputType;
}>;


export type SearchCompaniesQuery = { searchCompanies?: { listDto?: { items?: Array<{ id?: any | null, title?: string | null, logoUrl?: string | null } | null> | null } | null } | null };


export const SearchCompaniesDocument = `
    query searchCompanies($filter: GenericFilterRequestCompanySearchInputType!) {
  searchCompanies(filter: $filter) {
    listDto {
      items {
        id
        title
        logoUrl
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    searchCompanies: build.query<SearchCompaniesQuery, SearchCompaniesQueryVariables>({
      query: (variables) => ({ document: SearchCompaniesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSearchCompaniesQuery, useLazySearchCompaniesQuery } = injectedRtkApi;

