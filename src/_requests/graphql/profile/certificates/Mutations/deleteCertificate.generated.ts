import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type DeleteCertificateMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestCertificateDeleteInputType;
}>;


export type DeleteCertificateMutation = { deleteCertificate?: { isSuccess?: boolean | null, messagingKey?: string | null } | null };


export const DeleteCertificateDocument = `
    mutation deleteCertificate($filter: GenericMutationRequestCertificateDeleteInputType!) {
  deleteCertificate(filter: $filter) {
    isSuccess
    messagingKey
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    deleteCertificate: build.mutation<DeleteCertificateMutation, DeleteCertificateMutationVariables>({
      query: (variables) => ({ document: DeleteCertificateDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeleteCertificateMutation } = injectedRtkApi;

