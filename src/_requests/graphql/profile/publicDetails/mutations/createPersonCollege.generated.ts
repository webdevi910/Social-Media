import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type AddPersonCollegeMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestPersonCollegeInputType;
}>;


export type AddPersonCollegeMutation = { addPersonCollege?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { items?: Array<{ id: string } | null> | null } | null } | null };


export const AddPersonCollegeDocument = `
    mutation addPersonCollege($filter: GenericMutationRequestPersonCollegeInputType!) {
  addPersonCollege(filter: $filter) {
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
    addPersonCollege: build.mutation<AddPersonCollegeMutation, AddPersonCollegeMutationVariables>({
      query: (variables) => ({ document: AddPersonCollegeDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useAddPersonCollegeMutation } = injectedRtkApi;

