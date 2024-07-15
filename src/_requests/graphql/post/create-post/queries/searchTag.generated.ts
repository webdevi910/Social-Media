import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Post';
export type SearchTagQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestTagReqType;
}>;


export type SearchTagQuery = { recommendedTags: { listDto?: { items?: Array<{ id: string, title?: string | null, count: number } | null> | null } | null } };


export const SearchTagDocument = `
    query searchTag($filter: GenericFilterRequestTagReqType!) {
  recommendedTags(filter: $filter) {
    listDto {
      items {
        id
        title
        count
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    searchTag: build.query<SearchTagQuery, SearchTagQueryVariables>({
      query: (variables) => ({ document: SearchTagDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSearchTagQuery, useLazySearchTagQuery } = injectedRtkApi;

