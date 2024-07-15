import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type CreatePersonSkillMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestPersonSkillsInputType;
}>;


export type CreatePersonSkillMutation = { createPersonSkill?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { items?: Array<{ id: string, personId?: any | null, skill?: { id: string, title?: string | null } | null } | null> | null } | null } | null };


export const CreatePersonSkillDocument = `
    mutation createPersonSkill($filter: GenericMutationRequestPersonSkillsInputType!) {
  createPersonSkill(filter: $filter) {
    isSuccess
    messagingKey
    listDto {
      items {
        id
        skill {
          id
          title
        }
        personId
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    createPersonSkill: build.mutation<CreatePersonSkillMutation, CreatePersonSkillMutationVariables>({
      query: (variables) => ({ document: CreatePersonSkillDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreatePersonSkillMutation } = injectedRtkApi;

