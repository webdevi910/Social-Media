import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type DeleteUserEmailMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestUserEmailDeleteInputType;
}>;


export type DeleteUserEmailMutation = { deleteUserEmail?: { isSuccess?: boolean | null, messagingKey?: string | null } | null };


export const DeleteUserEmailDocument = `
    mutation deleteUserEmail($filter: GenericMutationRequestUserEmailDeleteInputType!) {
  deleteUserEmail(filter: $filter) {
    isSuccess
    messagingKey
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    deleteUserEmail: build.mutation<DeleteUserEmailMutation, DeleteUserEmailMutationVariables>({
      query: (variables) => ({ document: DeleteUserEmailDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeleteUserEmailMutation } = injectedRtkApi;

