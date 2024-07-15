import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type CreateCollegeMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestCreateCollegeInputType;
}>;


export type CreateCollegeMutation = { createCollege?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { items?: Array<{ id: string, name?: string | null } | null> | null } | null } | null };


export const CreateCollegeDocument = `
    mutation createCollege($filter: GenericMutationRequestCreateCollegeInputType!) {
  createCollege(filter: $filter) {
    isSuccess
    messagingKey
    listDto {
      items {
        id
        name
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    createCollege: build.mutation<CreateCollegeMutation, CreateCollegeMutationVariables>({
      query: (variables) => ({ document: CreateCollegeDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateCollegeMutation } = injectedRtkApi;

