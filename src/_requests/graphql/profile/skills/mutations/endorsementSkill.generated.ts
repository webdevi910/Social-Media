import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type EndorsementSkillMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestEndorsementSkillInputType;
}>;


export type EndorsementSkillMutation = { endorsementSkill?: { isSuccess?: boolean | null, messagingKey?: string | null } | null };


export const EndorsementSkillDocument = `
    mutation endorsementSkill($filter: GenericMutationRequestEndorsementSkillInputType!) {
  endorsementSkill(filter: $filter) {
    isSuccess
    messagingKey
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    endorsementSkill: build.mutation<EndorsementSkillMutation, EndorsementSkillMutationVariables>({
      query: (variables) => ({ document: EndorsementSkillDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useEndorsementSkillMutation } = injectedRtkApi;

