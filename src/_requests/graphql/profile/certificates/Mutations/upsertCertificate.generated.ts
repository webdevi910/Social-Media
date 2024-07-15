import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type UpsertCertificateMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestCertificateInputType;
}>;


export type UpsertCertificateMutation = { upsertCertificate?: { isSuccess?: boolean | null, messagingKey?: string | null } | null };


export const UpsertCertificateDocument = `
    mutation upsertCertificate($filter: GenericMutationRequestCertificateInputType!) {
  upsertCertificate(filter: $filter) {
    isSuccess
    messagingKey
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    upsertCertificate: build.mutation<UpsertCertificateMutation, UpsertCertificateMutationVariables>({
      query: (variables) => ({ document: UpsertCertificateDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpsertCertificateMutation } = injectedRtkApi;

