import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type DeletePersonCollegeMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestPersonCollegeDeleteInputType;
}>;


export type DeletePersonCollegeMutation = { deletePersonCollege?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { items?: Array<{ id?: any | null } | null> | null } | null } | null };


export const DeletePersonCollegeDocument = `
    mutation deletePersonCollege($filter: GenericMutationRequestPersonCollegeDeleteInputType!) {
  deletePersonCollege(filter: $filter) {
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
    deletePersonCollege: build.mutation<DeletePersonCollegeMutation, DeletePersonCollegeMutationVariables>({
      query: (variables) => ({ document: DeletePersonCollegeDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeletePersonCollegeMutation } = injectedRtkApi;

