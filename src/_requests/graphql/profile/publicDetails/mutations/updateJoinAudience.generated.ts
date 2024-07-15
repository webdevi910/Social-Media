import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type UpdateJoinAudienceMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestPersonJoinInputType;
}>;


export type UpdateJoinAudienceMutation = { updateJoinAudience?: { isSuccess?: boolean | null, listDto?: { items?: Array<{ joinAudience?: ServerTypes.AudienceEnum | null } | null> | null } | null } | null };


export const UpdateJoinAudienceDocument = `
    mutation updateJoinAudience($filter: GenericMutationRequestPersonJoinInputType!) {
  updateJoinAudience(filter: $filter) {
    isSuccess
    listDto {
      items {
        joinAudience
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateJoinAudience: build.mutation<UpdateJoinAudienceMutation, UpdateJoinAudienceMutationVariables>({
      query: (variables) => ({ document: UpdateJoinAudienceDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdateJoinAudienceMutation } = injectedRtkApi;

