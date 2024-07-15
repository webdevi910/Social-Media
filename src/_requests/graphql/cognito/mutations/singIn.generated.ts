import type * as ServerTypes from '../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Cognito';
export type SingInMutationVariables = ServerTypes.Exact<{
  data: ServerTypes.GenericMutationRequestLoginInputType;
}>;


export type SingInMutation = { login?: { isSuccess?: boolean | null, listDto?: { items?: Array<{ token: string, refreshToken: string, expiry: any } | null> | null } | null } | null };


export const SingInDocument = `
    mutation singIn($data: GenericMutationRequestLoginInputType!) {
  login(login: $data) {
    listDto {
      items {
        token
        refreshToken
        expiry
      }
    }
    isSuccess
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    singIn: build.mutation<SingInMutation, SingInMutationVariables>({
      query: (variables) => ({ document: SingInDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSingInMutation } = injectedRtkApi;

