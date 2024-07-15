import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Post';
export type GetGifQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestGifReqType;
}>;


export type GetGifQuery = { getGifsQuery: { listDto?: { items?: Array<{ id?: string | null, title?: string | null, gifUrl?: string | null, type?: string | null } | null> | null } | null } };


export const GetGifDocument = `
    query getGif($filter: GenericFilterRequestGifReqType!) {
  getGifsQuery(filter: $filter) {
    listDto {
      items {
        id
        title
        gifUrl
        type
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGif: build.query<GetGifQuery, GetGifQueryVariables>({
      query: (variables) => ({ document: GetGifDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetGifQuery, useLazyGetGifQuery } = injectedRtkApi;

