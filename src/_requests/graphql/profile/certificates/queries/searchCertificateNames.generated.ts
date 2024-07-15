import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type SearchCertificateNamesQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestCertificateNameSearchInputType;
}>;


export type SearchCertificateNamesQuery = { searchCertificateNames?: { listDto?: { items?: Array<{ id?: any | null, title?: string | null } | null> | null } | null } | null };


export const SearchCertificateNamesDocument = `
    query searchCertificateNames($filter: GenericFilterRequestCertificateNameSearchInputType!) {
  searchCertificateNames(filter: $filter) {
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
    searchCertificateNames: build.query<SearchCertificateNamesQuery, SearchCertificateNamesQueryVariables>({
      query: (variables) => ({ document: SearchCertificateNamesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSearchCertificateNamesQuery, useLazySearchCertificateNamesQuery } = injectedRtkApi;

