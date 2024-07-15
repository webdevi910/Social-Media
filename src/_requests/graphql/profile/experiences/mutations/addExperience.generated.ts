import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type AddExperienceMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestPersonExperienceInputType;
}>;


export type AddExperienceMutation = { addExperience?: { isSuccess?: boolean | null } | null };


export const AddExperienceDocument = `
    mutation addExperience($filter: GenericMutationRequestPersonExperienceInputType!) {
  addExperience(filter: $filter) {
    isSuccess
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    addExperience: build.mutation<AddExperienceMutation, AddExperienceMutationVariables>({
      query: (variables) => ({ document: AddExperienceDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useAddExperienceMutation } = injectedRtkApi;

