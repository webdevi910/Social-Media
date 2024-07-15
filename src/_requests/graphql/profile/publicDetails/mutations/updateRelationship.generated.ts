import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type UpdateRelationshipMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestRelationshipInputType;
}>;


export type UpdateRelationshipMutation = { updateRelationship?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { count?: any | null, items?: Array<{ personId?: any | null, audience?: ServerTypes.AudienceEnum | null, relationshipStatus?: { id?: any | null, title?: string | null } | null } | null> | null } | null } | null };


export const UpdateRelationshipDocument = `
    mutation updateRelationship($filter: GenericMutationRequestRelationshipInputType!) {
  updateRelationship(filter: $filter) {
    isSuccess
    messagingKey
    listDto {
      count
      items {
        personId
        audience
        relationshipStatus {
          id
          title
        }
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateRelationship: build.mutation<UpdateRelationshipMutation, UpdateRelationshipMutationVariables>({
      query: (variables) => ({ document: UpdateRelationshipDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdateRelationshipMutation } = injectedRtkApi;

