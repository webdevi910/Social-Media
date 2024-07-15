import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type GetRelationshipStatusQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestRelationshipStatusInputType;
}>;


export type GetRelationshipStatusQuery = { getRelationshipStatus?: { isSuccess?: boolean | null, listDto?: { count?: any | null, items?: Array<{ id?: any | null, title?: string | null } | null> | null } | null } | null };


export const GetRelationshipStatusDocument = `
    query getRelationshipStatus($filter: GenericFilterRequestRelationshipStatusInputType!) {
  getRelationshipStatus(filter: $filter) {
    isSuccess
    listDto {
      count
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
    getRelationshipStatus: build.query<GetRelationshipStatusQuery, GetRelationshipStatusQueryVariables>({
      query: (variables) => ({ document: GetRelationshipStatusDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetRelationshipStatusQuery, useLazyGetRelationshipStatusQuery } = injectedRtkApi;

