import { api as createFileApi } from 'src/_requests/graphql/upload/mutations/createFile.generated' 
export const reducers = { 
  [createFileApi.reducerPath]: createFileApi.reducer, 
} 
export const middleware = [createFileApi.middleware]