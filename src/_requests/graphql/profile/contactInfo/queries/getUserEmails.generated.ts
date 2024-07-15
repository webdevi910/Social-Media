import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type GetUserEmailsQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestUserEmailGetAllInputType;
}>;


export type GetUserEmailsQuery = { getUserEmails?: { listDto?: { items?: Array<{ id: string, userId: string, email?: string | null, audience?: ServerTypes.AudienceEnum | null, verificationCode?: string | null, status?: ServerTypes.VerificationStatusEnum | null } | null> | null } | null } | null };


export const GetUserEmailsDocument = `
    query getUserEmails($filter: GenericFilterRequestUserEmailGetAllInputType!) {
  getUserEmails(filter: $filter) {
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
    getUserEmails: build.query<GetUserEmailsQuery, GetUserEmailsQueryVariables>({
      query: (variables) => ({ document: GetUserEmailsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetUserEmailsQuery, useLazyGetUserEmailsQuery } = injectedRtkApi;

