import { api as createSocialPostApi } from 'src/_requests/graphql/post/create-post/mutations/createSocialPost.generated' 
import { api as updateSocialPostApi } from 'src/_requests/graphql/post/create-post/mutations/updateSocialPost.generated' 
import { api as getGifQueryApi } from 'src/_requests/graphql/post/create-post/queries/getGifQuery.generated' 
import { api as getUserQueryApi } from 'src/_requests/graphql/post/create-post/queries/getUserQuery.generated' 
import { api as searchTagApi } from 'src/_requests/graphql/post/create-post/queries/searchTag.generated' 
import { api as getHomePageSocialPostApi } from 'src/_requests/graphql/post/getHomePageSocialPost.generated' 
import { api as getLatLocationApi } from 'src/_requests/graphql/post/getLatLocation.generated' 
import { api as getSocialPostApi } from 'src/_requests/graphql/post/getSocialPost.generated' 
export const reducers = { 
  [createSocialPostApi.reducerPath]: createSocialPostApi.reducer, 
  [updateSocialPostApi.reducerPath]: updateSocialPostApi.reducer, 
  [getGifQueryApi.reducerPath]: getGifQueryApi.reducer, 
  [getUserQueryApi.reducerPath]: getUserQueryApi.reducer, 
  [searchTagApi.reducerPath]: searchTagApi.reducer, 
  [getHomePageSocialPostApi.reducerPath]: getHomePageSocialPostApi.reducer, 
  [getLatLocationApi.reducerPath]: getLatLocationApi.reducer, 
  [getSocialPostApi.reducerPath]: getSocialPostApi.reducer, 
} 
export const middleware = [createSocialPostApi.middleware, updateSocialPostApi.middleware, getGifQueryApi.middleware, getUserQueryApi.middleware, searchTagApi.middleware, getHomePageSocialPostApi.middleware, getLatLocationApi.middleware, getSocialPostApi.middleware]