import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type GetPersonSkillsQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestGetPersonSkillsInputType;
}>;


export type GetPersonSkillsQuery = { getPersonSkills?: { listDto?: { items?: Array<{ id: string, personId?: any | null, endorsementsCount?: number | null, skill?: { id: string, title?: string | null } | null, persons?: Array<{ fullName?: string | null, avatarUrl?: string | null, headline?: string | null, firstName?: string | null, lastName?: string | null } | null> | null } | null> | null } | null } | null };


export const GetPersonSkillsDocument = `
    query getPersonSkills($filter: GenericFilterRequestGetPersonSkillsInputType!) {
  getPersonSkills(filter: $filter) {
    listDto {
      items {
        id
        personId
        skill {
          id
          title
        }
        endorsementsCount
        persons {
          fullName
          avatarUrl
          headline
          firstName
          lastName
        }
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPersonSkills: build.query<GetPersonSkillsQuery, GetPersonSkillsQueryVariables>({
      query: (variables) => ({ document: GetPersonSkillsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetPersonSkillsQuery, useLazyGetPersonSkillsQuery } = injectedRtkApi;

