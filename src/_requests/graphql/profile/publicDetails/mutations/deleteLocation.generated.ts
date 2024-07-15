import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type DeleteLocationMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestLocationDeleteInputType;
}>;


export type DeleteLocationMutation = { deleteLocation?: { isSuccess?: boolean | null, messagingKey?: string | null } | null };


export const DeleteLocationDocument = `
    mutation deleteLocation($filter: GenericMutationRequestLocationDeleteInputType!) {
  deleteLocation(filter: $filter) {
    isSuccess
    messagingKey
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    deleteLocation: build.mutation<DeleteLocationMutation, DeleteLocationMutationVariables>({
      query: (variables) => ({ document: DeleteLocationDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeleteLocationMutation } = injectedRtkApi;

