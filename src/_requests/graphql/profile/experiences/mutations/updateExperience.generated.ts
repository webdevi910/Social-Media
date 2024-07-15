import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type UpdateExperienceMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestPersonExperienceInputType;
}>;


export type UpdateExperienceMutation = { updateExperience?: { isSuccess?: boolean | null } | null };

export type DeleteExperienceMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestExperienceDeleteInputType;
}>;


export type DeleteExperienceMutation = { deleteExperience?: { isSuccess?: boolean | null } | null };


export const UpdateExperienceDocument = `
    mutation updateExperience($filter: GenericMutationRequestPersonExperienceInputType!) {
  updateExperience(filter: $filter) {
    isSuccess
  }
}
    `;
export const DeleteExperienceDocument = `
    mutation deleteExperience($filter: GenericMutationRequestExperienceDeleteInputType!) {
  deleteExperience(filter: $filter) {
    isSuccess
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateExperience: build.mutation<UpdateExperienceMutation, UpdateExperienceMutationVariables>({
      query: (variables) => ({ document: UpdateExperienceDocument, variables })
    }),
    deleteExperience: build.mutation<DeleteExperienceMutation, DeleteExperienceMutationVariables>({
      query: (variables) => ({ document: DeleteExperienceDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdateExperienceMutation, useDeleteExperienceMutation } = injectedRtkApi;

