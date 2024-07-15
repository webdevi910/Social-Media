import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type GetUserWebSitesQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestUserWebSiteGetAllInputType;
}>;


export type GetUserWebSitesQuery = { getUserWebSites?: { listDto?: { items?: Array<{ id: string, userId: string, webSiteUrl?: string | null, audience?: ServerTypes.AudienceEnum | null } | null> | null } | null } | null };


export const GetUserWebSitesDocument = `
    query getUserWebSites($filter: GenericFilterRequestUserWebSiteGetAllInputType!) {
  getUserWebSites(filter: $filter) {
    listDto {
      items {
        id
        userId
        webSiteUrl
        audience
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserWebSites: build.query<GetUserWebSitesQuery, GetUserWebSitesQueryVariables>({
      query: (variables) => ({ document: GetUserWebSitesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetUserWebSitesQuery, useLazyGetUserWebSitesQuery } = injectedRtkApi;

