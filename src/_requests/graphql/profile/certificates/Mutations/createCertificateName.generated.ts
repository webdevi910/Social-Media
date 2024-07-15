import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type CreateCertificateNameMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestCreateCertificateNameInputType;
}>;


export type CreateCertificateNameMutation = { createCertificateName?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { items?: Array<{ id?: any | null, title?: string | null } | null> | null } | null } | null };


export const CreateCertificateNameDocument = `
    mutation createCertificateName($filter: GenericMutationRequestCreateCertificateNameInputType!) {
  createCertificateName(filter: $filter) {
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
    createCertificateName: build.mutation<CreateCertificateNameMutation, CreateCertificateNameMutationVariables>({
      query: (variables) => ({ document: CreateCertificateNameDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateCertificateNameMutation } = injectedRtkApi;

