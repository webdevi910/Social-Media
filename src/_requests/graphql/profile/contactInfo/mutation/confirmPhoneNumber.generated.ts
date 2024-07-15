import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type ConfirmPhoneNumberMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestConfirmPhoneNumberInputType;
}>;


export type ConfirmPhoneNumberMutation = { confirmPhoneNumber?: { isSuccess?: boolean | null, messagingKey?: string | null } | null };


export const ConfirmPhoneNumberDocument = `
    mutation confirmPhoneNumber($filter: GenericMutationRequestConfirmPhoneNumberInputType!) {
  confirmPhoneNumber(filter: $filter) {
    isSuccess
    messagingKey
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    confirmPhoneNumber: build.mutation<ConfirmPhoneNumberMutation, ConfirmPhoneNumberMutationVariables>({
      query: (variables) => ({ document: ConfirmPhoneNumberDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useConfirmPhoneNumberMutation } = injectedRtkApi;

