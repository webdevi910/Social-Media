import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type AddPersonSchoolMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestPersonSchoolInputType;
}>;


export type AddPersonSchoolMutation = { addPersonSchool?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { items?: Array<{ id: string } | null> | null } | null } | null };


export const AddPersonSchoolDocument = `
    mutation addPersonSchool($filter: GenericMutationRequestPersonSchoolInputType!) {
  addPersonSchool(filter: $filter) {
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
    addPersonSchool: build.mutation<AddPersonSchoolMutation, AddPersonSchoolMutationVariables>({
      query: (variables) => ({ document: AddPersonSchoolDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useAddPersonSchoolMutation } = injectedRtkApi;

