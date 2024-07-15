import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Post';
export type GetUserQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestUserReqType;
}>;


export type GetUserQuery = { getUserQuery: { listDto?: { items?: Array<{ id: string, fullName?: string | null, avatarUrl?: string | null, userName?: string | null, headLine?: string | null } | null> | null } | null } };


export const GetUserDocument = `
    query getUser($filter: GenericFilterRequestUserReqType!) {
  getUserQuery(filter: $filter) {
    listDto {
      items {
        id
        fullName
        avatarUrl
        userName
        headLine
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<GetUserQuery, GetUserQueryVariables>({
      query: (variables) => ({ document: GetUserDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetUserQuery, useLazyGetUserQuery } = injectedRtkApi;

