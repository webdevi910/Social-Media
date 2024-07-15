import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type CreateSchoolMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestCreateSchoolInputType;
}>;


export type CreateSchoolMutation = { createSchool?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { items?: Array<{ id: string, title?: string | null } | null> | null } | null } | null };


export const CreateSchoolDocument = `
    mutation createSchool($filter: GenericMutationRequestCreateSchoolInputType!) {
  createSchool(filter: $filter) {
    isSuccess
    messagingKey
    listDto {
      items {
        id
        title
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    createSchool: build.mutation<CreateSchoolMutation, CreateSchoolMutationVariables>({
      query: (variables) => ({ document: CreateSchoolDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateSchoolMutation } = injectedRtkApi;

