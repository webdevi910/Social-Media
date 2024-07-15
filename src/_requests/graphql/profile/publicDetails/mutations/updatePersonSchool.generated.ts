import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type UpdatePersonSchoolMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestPersonSchoolInputType;
}>;


export type UpdatePersonSchoolMutation = { updatePersonSchool?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { items?: Array<{ id: string } | null> | null } | null } | null };


export const UpdatePersonSchoolDocument = `
    mutation updatePersonSchool($filter: GenericMutationRequestPersonSchoolInputType!) {
  updatePersonSchool(filter: $filter) {
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
    updatePersonSchool: build.mutation<UpdatePersonSchoolMutation, UpdatePersonSchoolMutationVariables>({
      query: (variables) => ({ document: UpdatePersonSchoolDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdatePersonSchoolMutation } = injectedRtkApi;

