import type * as ServerTypes from '../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Locality';
export type SearchPlacesQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestSearchPlacesInputType;
}>;


export type SearchPlacesQuery = { searchPlaces: { listDto?: { count?: any | null, items?: Array<{ status?: string | null, predictions?: Array<{ description?: string | null, placeId?: string | null, structuredFormatting?: { mainText?: string | null, secondaryText?: string | null } | null } | null> | null } | null> | null } | null } };


export const SearchPlacesDocument = `
    query searchPlaces($filter: GenericFilterRequestSearchPlacesInputType!) {
  searchPlaces(filter: $filter) {
    listDto {
      items {
        status
        predictions {
          description
          placeId
          structuredFormatting {
            mainText
            secondaryText
          }
        }
      }
      count
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    searchPlaces: build.query<SearchPlacesQuery, SearchPlacesQueryVariables>({
      query: (variables) => ({ document: SearchPlacesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSearchPlacesQuery, useLazySearchPlacesQuery } = injectedRtkApi;

