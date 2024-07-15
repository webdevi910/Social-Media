import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type DeleteUserSocialMediaMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestUserSocialMediaDeleteInputType;
}>;


export type DeleteUserSocialMediaMutation = { deleteUserSocialMedia?: { isSuccess?: boolean | null } | null };


export const DeleteUserSocialMediaDocument = `
    mutation deleteUserSocialMedia($filter: GenericMutationRequestUserSocialMediaDeleteInputType!) {
  deleteUserSocialMedia(filter: $filter) {
    isSuccess
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    deleteUserSocialMedia: build.mutation<DeleteUserSocialMediaMutation, DeleteUserSocialMediaMutationVariables>({
      query: (variables) => ({ document: DeleteUserSocialMediaDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeleteUserSocialMediaMutation } = injectedRtkApi;

