import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type UpsertUserEmailMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestUserEmailInputType;
}>;


export type UpsertUserEmailMutation = { upsertUserEmail?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { items?: Array<{ id: string, userId: string, email?: string | null, audience?: ServerTypes.AudienceEnum | null, verificationCode?: string | null, status?: ServerTypes.VerificationStatusEnum | null } | null> | null } | null } | null };


export const UpsertUserEmailDocument = `
    mutation upsertUserEmail($filter: GenericMutationRequestUserEmailInputType!) {
  upsertUserEmail(filter: $filter) {
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
    upsertUserEmail: build.mutation<UpsertUserEmailMutation, UpsertUserEmailMutationVariables>({
      query: (variables) => ({ document: UpsertUserEmailDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpsertUserEmailMutation } = injectedRtkApi;

