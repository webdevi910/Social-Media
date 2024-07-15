import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type CreateConcentrationMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestConcentrationCreateInputType;
}>;


export type CreateConcentrationMutation = { createConcentration?: { isSuccess?: boolean | null, messagingKey?: string | null, listDto?: { items?: Array<{ id: string, title?: string | null } | null> | null } | null } | null };


export const CreateConcentrationDocument = `
    mutation createConcentration($filter: GenericMutationRequestConcentrationCreateInputType!) {
  createConcentration(filter: $filter) {
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
    createConcentration: build.mutation<CreateConcentrationMutation, CreateConcentrationMutationVariables>({
      query: (variables) => ({ document: CreateConcentrationDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateConcentrationMutation } = injectedRtkApi;

