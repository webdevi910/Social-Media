import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type DeleteWebSiteMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestUserWebSiteDeleteInputType;
}>;


export type DeleteWebSiteMutation = { deleteWebSite?: { isSuccess?: boolean | null, messagingKey?: string | null } | null };


export const DeleteWebSiteDocument = `
    mutation deleteWebSite($filter: GenericMutationRequestUserWebSiteDeleteInputType!) {
  deleteWebSite(filter: $filter) {
    isSuccess
    messagingKey
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    deleteWebSite: build.mutation<DeleteWebSiteMutation, DeleteWebSiteMutationVariables>({
      query: (variables) => ({ document: DeleteWebSiteDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeleteWebSiteMutation } = injectedRtkApi;

