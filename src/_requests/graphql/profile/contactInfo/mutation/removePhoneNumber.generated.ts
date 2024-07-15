import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type RemovePhoneNumberMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestUserPhoneNumberDeleteInputType;
}>;


export type RemovePhoneNumberMutation = { deletePhoneNumber?: { isSuccess?: boolean | null, messagingKey?: string | null } | null };


export const RemovePhoneNumberDocument = `
    mutation removePhoneNumber($filter: GenericMutationRequestUserPhoneNumberDeleteInputType!) {
  deletePhoneNumber(filter: $filter) {
    isSuccess
    messagingKey
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    removePhoneNumber: build.mutation<RemovePhoneNumberMutation, RemovePhoneNumberMutationVariables>({
      query: (variables) => ({ document: RemovePhoneNumberDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useRemovePhoneNumberMutation } = injectedRtkApi;

