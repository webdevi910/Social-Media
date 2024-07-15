import type * as ServerTypes from '../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Post';
export type GetHomePageSocialPostsQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestSocialPostReqType;
}>;


export type GetHomePageSocialPostsQuery = { getHomePageSocialPosts: { listDto?: { count?: any | null, items?: Array<{ id: string, body?: string | null, ownerUserId: string, audience?: ServerTypes.Audience | null, status?: ServerTypes.PostStatus | null, isDeleted?: boolean | null, location?: string | null, tagIds?: Array<string> | null, mentionedUserIds?: Array<string> | null, videoUrls?: Array<string | null> | null, pictureUrls?: Array<string | null> | null, createdDateTime?: string | null, firstName?: string | null, fullName?: string | null, lastName?: string | null, userName?: string | null, userAvatarUrl?: string | null, countOfComments?: string | null, countOfLikes?: string | null, countOfShared?: string | null, countOfViews?: string | null } | null> | null } | null } };


export const GetHomePageSocialPostsDocument = `
    query getHomePageSocialPosts($filter: GenericFilterRequestSocialPostReqType!) {
  getHomePageSocialPosts(filter: $filter) {
    listDto {
      items {
        id
        body
        ownerUserId
        audience
        status
        isDeleted
        location
        tagIds
        mentionedUserIds
        videoUrls
        pictureUrls
        createdDateTime
        firstName
        fullName
        lastName
        userName
        userAvatarUrl
        countOfComments
        countOfLikes
        countOfShared
        countOfViews
      }
      count
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getHomePageSocialPosts: build.query<GetHomePageSocialPostsQuery, GetHomePageSocialPostsQueryVariables>({
      query: (variables) => ({ document: GetHomePageSocialPostsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetHomePageSocialPostsQuery, useLazyGetHomePageSocialPostsQuery } = injectedRtkApi;

