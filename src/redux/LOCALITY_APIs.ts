import { api as searchCitiesApi } from 'src/_requests/graphql/locality/queries/searchCities.generated' 
import { api as searchPlacesApi } from 'src/_requests/graphql/locality/queries/searchPlaces.generated' 
export const reducers = { 
  [searchCitiesApi.reducerPath]: searchCitiesApi.reducer, 
  [searchPlacesApi.reducerPath]: searchPlacesApi.reducer, 
} 
export const middleware = [searchCitiesApi.middleware, searchPlacesApi.middleware]