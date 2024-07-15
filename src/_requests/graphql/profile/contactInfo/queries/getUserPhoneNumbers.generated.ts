import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type GetUserPhoneNumbersQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestUserPhoneNumberGetAllInputType;
}>;


export type GetUserPhoneNumbersQuery = { getUserPhoneNumbers?: { listDto?: { items?: Array<{ id: string, userId: string, phoneNumber?: string | null, audience?: ServerTypes.AudienceEnum | null, verificationCode?: string | null, status?: ServerTypes.VerificationStatusEnum | null } | null> | null } | null } | null };


export const GetUserPhoneNumbersDocument = `
    query getUserPhoneNumbers($filter: GenericFilterRequestUserPhoneNumberGetAllInputType!) {
  getUserPhoneNumbers(filter: $filter) {
    listDto {
      items {
        id
        userId
        phoneNumber
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
    getUserPhoneNumbers: build.query<GetUserPhoneNumbersQuery, GetUserPhoneNumbersQueryVariables>({
      query: (variables) => ({ document: GetUserPhoneNumbersDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetUserPhoneNumbersQuery, useLazyGetUserPhoneNumbersQuery } = injectedRtkApi;

