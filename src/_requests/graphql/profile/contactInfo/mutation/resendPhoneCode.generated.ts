import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type ResendPhoneCodeMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestResendPhoneNumberCodeInputType;
}>;


export type ResendPhoneCodeMutation = { resendPhoneCode?: { isSuccess?: boolean | null, messagingKey?: string | null } | null };


export const ResendPhoneCodeDocument = `
    mutation resendPhoneCode($filter: GenericMutationRequestResendPhoneNumberCodeInputType!) {
  resendPhoneCode(filter: $filter) {
    isSuccess
    messagingKey
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    resendPhoneCode: build.mutation<ResendPhoneCodeMutation, ResendPhoneCodeMutationVariables>({
      query: (variables) => ({ document: ResendPhoneCodeDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useResendPhoneCodeMutation } = injectedRtkApi;

