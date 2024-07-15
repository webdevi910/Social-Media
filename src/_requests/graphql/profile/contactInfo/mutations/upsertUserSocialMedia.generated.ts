import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type UpsertUserSocialMediaMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestUserSocialMediaInputType;
}>;


export type UpsertUserSocialMediaMutation = { upsertUserSocialMedia?: { isSuccess?: boolean | null, messagingKey?: string | null } | null };


export const UpsertUserSocialMediaDocument = `
    mutation upsertUserSocialMedia($filter: GenericMutationRequestUserSocialMediaInputType!) {
  upsertUserSocialMedia(filter: $filter) {
    isSuccess
    messagingKey
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    upsertUserSocialMedia: build.mutation<UpsertUserSocialMediaMutation, UpsertUserSocialMediaMutationVariables>({
      query: (variables) => ({ document: UpsertUserSocialMediaDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpsertUserSocialMediaMutation } = injectedRtkApi;

