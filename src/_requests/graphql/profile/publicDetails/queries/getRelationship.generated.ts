import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type GetRelationshipQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestRelationshipItemInputType;
}>;


export type GetRelationshipQuery = { getRelationship?: { isSuccess?: boolean | null, listDto?: { count?: any | null, items?: Array<{ personId?: any | null, audience?: ServerTypes.AudienceEnum | null, relationshipStatus?: { id?: any | null, title?: string | null } | null } | null> | null } | null } | null };


export const GetRelationshipDocument = `
    query getRelationship($filter: GenericFilterRequestRelationshipItemInputType!) {
  getRelationship(filter: $filter) {
    isSuccess
    listDto {
      count
      items {
        personId
        audience
        relationshipStatus {
          id
          title
        }
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRelationship: build.query<GetRelationshipQuery, GetRelationshipQueryVariables>({
      query: (variables) => ({ document: GetRelationshipDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetRelationshipQuery, useLazyGetRelationshipQuery } = injectedRtkApi;

