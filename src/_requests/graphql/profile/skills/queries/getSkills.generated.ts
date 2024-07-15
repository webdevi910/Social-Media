import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type GetSkillsQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestSkillInputType;
}>;


export type GetSkillsQuery = { getSkills?: { listDto?: { items?: Array<{ id: string, title?: string | null } | null> | null } | null } | null };


export const GetSkillsDocument = `
    query getSkills($filter: GenericFilterRequestSkillInputType!) {
  getSkills(filter: $filter) {
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
    getSkills: build.query<GetSkillsQuery, GetSkillsQueryVariables>({
      query: (variables) => ({ document: GetSkillsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetSkillsQuery, useLazyGetSkillsQuery } = injectedRtkApi;

