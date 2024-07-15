import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type UpsertWebsiteMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestUserWebSiteInputType;
}>;


export type UpsertWebsiteMutation = { upsertWebSite?: { isSuccess?: boolean | null, messagingKey?: string | null } | null };


export const UpsertWebsiteDocument = `
    mutation upsertWebsite($filter: GenericMutationRequestUserWebSiteInputType!) {
  upsertWebSite(filter: $filter) {
    isSuccess
    messagingKey
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    upsertWebsite: build.mutation<UpsertWebsiteMutation, UpsertWebsiteMutationVariables>({
      query: (variables) => ({ document: UpsertWebsiteDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpsertWebsiteMutation } = injectedRtkApi;

