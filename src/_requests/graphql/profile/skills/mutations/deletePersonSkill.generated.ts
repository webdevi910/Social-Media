import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type DeletePersonSkillMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestPersonSkillDeleteInputType;
}>;


export type DeletePersonSkillMutation = { deletePersonSkill?: { isSuccess?: boolean | null, messagingKey?: string | null } | null };


export const DeletePersonSkillDocument = `
    mutation deletePersonSkill($filter: GenericMutationRequestPersonSkillDeleteInputType!) {
  deletePersonSkill(filter: $filter) {
    isSuccess
    messagingKey
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    deletePersonSkill: build.mutation<DeletePersonSkillMutation, DeletePersonSkillMutationVariables>({
      query: (variables) => ({ document: DeletePersonSkillDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeletePersonSkillMutation } = injectedRtkApi;

