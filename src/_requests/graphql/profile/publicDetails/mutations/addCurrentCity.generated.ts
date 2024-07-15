import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type UpsertLocationMutationVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericMutationRequestLocationInputType;
}>;


export type UpsertLocationMutation = { upsertLocation?: { isSuccess?: boolean | null, listDto?: { count?: any | null, items?: Array<{ id: string, personId: string, cityId: string, locationType?: ServerTypes.LocationTypeEnum | null, audience?: ServerTypes.AudienceEnum | null, city?: { id?: any | null, name?: string | null, placeId?: string | null, countryId?: any | null } | null } | null> | null } | null } | null };


export const UpsertLocationDocument = `
    mutation upsertLocation($filter: GenericMutationRequestLocationInputType!) {
  upsertLocation(filter: $filter) {
    isSuccess
    listDto {
      count
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
    upsertLocation: build.mutation<UpsertLocationMutation, UpsertLocationMutationVariables>({
      query: (variables) => ({ document: UpsertLocationDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpsertLocationMutation } = injectedRtkApi;

