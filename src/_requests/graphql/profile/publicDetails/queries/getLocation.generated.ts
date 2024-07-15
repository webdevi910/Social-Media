import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type GetLocationQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestLocationGetInputType;
}>;


export type GetLocationQuery = { getLocation?: { listDto?: { items?: Array<{ id: string, personId: string, cityId: string, locationType?: ServerTypes.LocationTypeEnum | null, audience?: ServerTypes.AudienceEnum | null, city?: { id?: any | null, name?: string | null, placeId?: string | null, countryId?: any | null } | null } | null> | null } | null } | null };


export const GetLocationDocument = `
    query getLocation($filter: GenericFilterRequestLocationGetInputType!) {
  getLocation(filter: $filter) {
    listDto {
      items {
        id
        personId
        cityId
        locationType
        audience
        city {
          id
          name
          placeId
          countryId
        }
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLocation: build.query<GetLocationQuery, GetLocationQueryVariables>({
      query: (variables) => ({ document: GetLocationDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetLocationQuery, useLazyGetLocationQuery } = injectedRtkApi;

