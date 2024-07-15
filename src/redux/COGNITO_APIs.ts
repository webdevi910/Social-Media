import { api as singInApi } from 'src/_requests/graphql/cognito/mutations/singIn.generated' 
export const reducers = { 
  [singInApi.reducerPath]: singInApi.reducer, 
} 
export const middleware = [singInApi.middleware]