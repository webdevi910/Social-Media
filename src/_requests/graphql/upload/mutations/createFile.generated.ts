import type * as ServerTypes from '../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Upload';
export type UploadImageMutationVariables = ServerTypes.Exact<{
  file: ServerTypes.GenericMutationRequestFileInputType;
}>;


export type UploadImageMutation = { createFile?: { isSuccess?: boolean | null, listDto?: { count?: any | null, items?: Array<{ url?: string | null } | null> | null } | null } | null };


export const UploadImageDocument = `
    mutation uploadImage($file: GenericMutationRequestFileInputType!) {
  createFile(file: $file) {
    listDto {
      items {
        url
      }
      count
    }
    isSuccess
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.mutation<UploadImageMutation, UploadImageMutationVariables>({
      query: (variables) => ({ document: UploadImageDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUploadImageMutation } = injectedRtkApi;

