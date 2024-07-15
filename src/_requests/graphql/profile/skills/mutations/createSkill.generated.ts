import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type CreateSkillMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestSkillInputType;
}>;


export type CreateSkillMutation = { createSkill?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { items?: Array<{ id: string, title?: string | null } | null> | null } | null } | null };


export const CreateSkillDocument = `
    mutation createSkill($filter: GenericMutationRequestSkillInputType!) {
  createSkill(filter: $filter) {
    isSuccess
    messagingKey
    listDto {
      items {
        id
        title
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    createSkill: build.mutation<CreateSkillMutation, CreateSkillMutationVariables>({
      query: (variables) => ({ document: CreateSkillDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateSkillMutation } = injectedRtkApi;

