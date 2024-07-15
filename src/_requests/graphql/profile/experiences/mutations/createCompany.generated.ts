import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type CreateCompanyMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestCreateCompanyInputType;
}>;


export type CreateCompanyMutation = { createCompany?: { isSuccess?: boolean | null, listDto?: { items?: Array<{ id?: any | null, title?: string | null } | null> | null } | null } | null };


export const CreateCompanyDocument = `
    mutation createCompany($filter: GenericMutationRequestCreateCompanyInputType!) {
  createCompany(filter: $filter) {
    isSuccess
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
    createCompany: build.mutation<CreateCompanyMutation, CreateCompanyMutationVariables>({
      query: (variables) => ({ document: CreateCompanyDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateCompanyMutation } = injectedRtkApi;

