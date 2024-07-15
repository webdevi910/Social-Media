import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type UpdatePersonCollegeMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestPersonCollegeInputType;
}>;


export type UpdatePersonCollegeMutation = { updatePersonCollege?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { items?: Array<{ id: string } | null> | null } | null } | null };


export const UpdatePersonCollegeDocument = `
    mutation updatePersonCollege($filter: GenericMutationRequestPersonCollegeInputType!) {
  updatePersonCollege(filter: $filter) {
    isSuccess
    messagingKey
    listDto {
      items {
        id
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    updatePersonCollege: build.mutation<UpdatePersonCollegeMutation, UpdatePersonCollegeMutationVariables>({
      query: (variables) => ({ document: UpdatePersonCollegeDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdatePersonCollegeMutation } = injectedRtkApi;

