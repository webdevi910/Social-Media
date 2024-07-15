import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type CreateIssuingOrganizationMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestCreateIssuingOrganizationInputType;
}>;


export type CreateIssuingOrganizationMutation = { createIssuingOrganization?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { items?: Array<{ id?: any | null, title?: string | null } | null> | null } | null } | null };


export const CreateIssuingOrganizationDocument = `
    mutation createIssuingOrganization($filter: GenericMutationRequestCreateIssuingOrganizationInputType!) {
  createIssuingOrganization(filter: $filter) {
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
    createIssuingOrganization: build.mutation<CreateIssuingOrganizationMutation, CreateIssuingOrganizationMutationVariables>({
      query: (variables) => ({ document: CreateIssuingOrganizationDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateIssuingOrganizationMutation } = injectedRtkApi;

