import type * as ServerTypes from '../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Post';
export type GetLastLocationsQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestPlaceReqType;
}>;


export type GetLastLocationsQuery = { getLatestLocationsQuery: { listDto?: { count?: any | null, items?: Array<{ id: string, name: string, cityName?: string | null, cityPlaceId?: string | null, countryName?: string | null, countryPlaceId?: string | null, mainText?: string | null, secondaryText?: string | null, description?: string | null } | null> | null } | null } };


export const GetLastLocationsDocument = `
    query getLastLocations($filter: GenericFilterRequestPlaceReqType!) {
  getLatestLocationsQuery(filter: $filter) {
    listDto {
      items {
        id
        name
        cityName
        cityPlaceId
        countryName
        countryPlaceId
        mainText
        secondaryText
        description
      }
      count
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLastLocations: build.query<GetLastLocationsQuery, GetLastLocationsQueryVariables>({
      query: (variables) => ({ document: GetLastLocationsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetLastLocationsQuery, useLazyGetLastLocationsQuery } = injectedRtkApi;

