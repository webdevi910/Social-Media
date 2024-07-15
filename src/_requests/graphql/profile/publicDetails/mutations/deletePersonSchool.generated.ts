import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type DeletePersonSchoolMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestPersonSchoolDeleteInputType;
}>;


export type DeletePersonSchoolMutation = { deletePersonSchool?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { items?: Array<{ id?: any | null } | null> | null } | null } | null };


export const DeletePersonSchoolDocument = `
    mutation deletePersonSchool($filter: GenericMutationRequestPersonSchoolDeleteInputType!) {
  deletePersonSchool(filter: $filter) {
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
    deletePersonSchool: build.mutation<DeletePersonSchoolMutation, DeletePersonSchoolMutationVariables>({
      query: (variables) => ({ document: DeletePersonSchoolDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeletePersonSchoolMutation } = injectedRtkApi;

