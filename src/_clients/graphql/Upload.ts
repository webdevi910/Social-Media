import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient } from 'graphql-request';
import { getSession } from 'next-auth/react';

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_UPLOAD_ENDPOINT as string);

export async function UploadBaseQuery(args: any, api: any, extraOptions: any) {
  const data = await getSession();
  // client.setHeader('authorization', `Bearer ${(data as any).accessToken}`);
  const rawBaseQuery = graphqlRequestBaseQuery({ client });
  const result = await rawBaseQuery(args, api, extraOptions);
  return result;
}

export const api = createApi({
  baseQuery: UploadBaseQuery,
  reducerPath: 'upload',
  endpoints: () => ({}),
});

export default client;
