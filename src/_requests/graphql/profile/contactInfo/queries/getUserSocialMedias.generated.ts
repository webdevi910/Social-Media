import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type GetUserSocialMediasQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestUserSocialMediaGetAllInputType;
}>;


export type GetUserSocialMediasQuery = { getUserSocialMedias?: { listDto?: { items?: Array<{ id: string, userName?: string | null, userId?: any | null, audience?: ServerTypes.AudienceEnum | null, socialMediaDto?: { id: string, title?: string | null } | null } | null> | null } | null } | null };


export const GetUserSocialMediasDocument = `
    query getUserSocialMedias($filter: GenericFilterRequestUserSocialMediaGetAllInputType!) {
  getUserSocialMedias(filter: $filter) {
    listDto {
      items {
        id
        userName
        userId
        audience
        socialMediaDto {
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
    getUserSocialMedias: build.query<GetUserSocialMediasQuery, GetUserSocialMediasQueryVariables>({
      query: (variables) => ({ document: GetUserSocialMediasDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetUserSocialMediasQuery, useLazyGetUserSocialMediasQuery } = injectedRtkApi;

