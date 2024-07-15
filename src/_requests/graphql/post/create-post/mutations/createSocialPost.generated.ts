import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Post';
export type CreateSocialPostMutationVariables = ServerTypes.Exact<{
  post: ServerTypes.GenericMutationRequestCreateSocialPostInputType;
}>;


export type CreateSocialPostMutation = { createSocialPost?: { listDto?: { items?: Array<{ id: string } | null> | null } | null } | null };


export const CreateSocialPostDocument = `
    mutation createSocialPost($post: GenericMutationRequestCreateSocialPostInputType!) {
  createSocialPost(socialpost: $post) {
    listDto {
      items {
        id
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    createSocialPost: build.mutation<CreateSocialPostMutation, CreateSocialPostMutationVariables>({
      query: (variables) => ({ document: CreateSocialPostDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateSocialPostMutation } = injectedRtkApi;

