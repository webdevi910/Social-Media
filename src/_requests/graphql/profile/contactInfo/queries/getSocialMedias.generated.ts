import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type GetSocialMediasQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestSocialMediaInputType;
}>;


export type GetSocialMediasQuery = { getSocialMedias?: { listDto?: { items?: Array<{ id: string, title?: string | null } | null> | null } | null } | null };


export const GetSocialMediasDocument = `
    query getSocialMedias($filter: GenericFilterRequestSocialMediaInputType!) {
  getSocialMedias(filter: $filter) {
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
    getSocialMedias: build.query<GetSocialMediasQuery, GetSocialMediasQueryVariables>({
      query: (variables) => ({ document: GetSocialMediasDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetSocialMediasQuery, useLazyGetSocialMediasQuery } = injectedRtkApi;

