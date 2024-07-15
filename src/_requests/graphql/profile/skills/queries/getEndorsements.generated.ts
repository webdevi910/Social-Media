import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type GetEndorsementsQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestEndorsementSkillGetInputType;
}>;


export type GetEndorsementsQuery = { getEndorsements?: { listDto?: { count?: any | null, items?: Array<{ id: string, firstName?: string | null, lastName?: string | null, fullName?: string | null, coverUrl?: string | null, avatarUrl?: string | null, headline?: string | null } | null> | null } | null } | null };


export const GetEndorsementsDocument = `
    query getEndorsements($filter: GenericFilterRequestEndorsementSkillGetInputType!) {
  getEndorsements(filter: $filter) {
    listDto {
      count
      items {
        id
        firstName
        lastName
        fullName
        coverUrl
        avatarUrl
        headline
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEndorsements: build.query<GetEndorsementsQuery, GetEndorsementsQueryVariables>({
      query: (variables) => ({ document: GetEndorsementsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetEndorsementsQuery, useLazyGetEndorsementsQuery } = injectedRtkApi;

