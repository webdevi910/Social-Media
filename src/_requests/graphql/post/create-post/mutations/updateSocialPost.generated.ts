import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Post';
export type UpdateSocialPostMutationVariables = ServerTypes.Exact<{
  socialPost: ServerTypes.GenericMutationRequestCreateSocialPostInputType;
}>;


export type UpdateSocialPostMutation = { updateSocialPost?: { isSuccess?: boolean | null, listDto?: { count?: any | null, items?: Array<{ id: string } | null> | null } | null } | null };


export const UpdateSocialPostDocument = `
    mutation updateSocialPost($socialPost: GenericMutationRequestCreateSocialPostInputType!) {
  updateSocialPost(socialpost: $socialPost) {
    listDto {
      items {
        id
      }
      count
    }
    isSuccess
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateSocialPost: build.mutation<UpdateSocialPostMutation, UpdateSocialPostMutationVariables>({
      query: (variables) => ({ document: UpdateSocialPostDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdateSocialPostMutation } = injectedRtkApi;

