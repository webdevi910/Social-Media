import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type UpsertPhoneNumberMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestUserPhoneNumberInputType;
}>;


export type UpsertPhoneNumberMutation = { upsertPhoneNumber?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { count?: any | null, items?: Array<{ id: string, userId: string, phoneNumber?: string | null, audience?: ServerTypes.AudienceEnum | null, verificationCode?: string | null } | null> | null } | null } | null };


export const UpsertPhoneNumberDocument = `
    mutation upsertPhoneNumber($filter: GenericMutationRequestUserPhoneNumberInputType!) {
  upsertPhoneNumber(filter: $filter) {
    isSuccess
    messagingKey
    listDto {
      count
      items {
        id
        userId
        phoneNumber
        audience
        verificationCode
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    upsertPhoneNumber: build.mutation<UpsertPhoneNumberMutation, UpsertPhoneNumberMutationVariables>({
      query: (variables) => ({ document: UpsertPhoneNumberDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpsertPhoneNumberMutation } = injectedRtkApi;

