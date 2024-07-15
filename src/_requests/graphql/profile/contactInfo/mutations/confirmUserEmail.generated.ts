import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type ConfirmUserEmailMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestConfirmUserEmailInputType;
}>;


export type ConfirmUserEmailMutation = { confirmUserEmail?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { items?: Array<{ id: string, userId: string, email?: string | null, audience?: ServerTypes.AudienceEnum | null, verificationCode?: string | null, status?: ServerTypes.VerificationStatusEnum | null } | null> | null } | null } | null };


export const ConfirmUserEmailDocument = `
    mutation confirmUserEmail($filter: GenericMutationRequestConfirmUserEmailInputType!) {
  confirmUserEmail(filter: $filter) {
    isSuccess
    messagingKey
    listDto {
      items {
        id
        userId
        email
        audience
        verificationCode
        status
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    confirmUserEmail: build.mutation<ConfirmUserEmailMutation, ConfirmUserEmailMutationVariables>({
      query: (variables) => ({ document: ConfirmUserEmailDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useConfirmUserEmailMutation } = injectedRtkApi;

