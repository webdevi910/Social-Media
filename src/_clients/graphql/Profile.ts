import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient } from 'graphql-request';
import { getSession } from 'next-auth/react';

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_PROFILE_ENDPOINT as string);
const token ="eyJraWQiOiJPckZDZ05LVFh2d3lpZE4yelNqMmF5YjIwczk3cDRBTWF2QkZOM2lNK2pVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjZWEyY2U0OC00ZTQ1LTQ5Y2YtOWE2ZC03YzY4NzJjNTkxOTQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfUnc4VnVvYm9EIiwiY3VzdG9tOlVzZXJJZCI6IjYyMTQxNDJlLTIwZGUtNGMzMS1hZWJmLTg3YTcwNWU4N2IyYSIsImNvZ25pdG86dXNlcm5hbWUiOiJtaXNzbWFkZW8xOTk3QGdtYWlsLmNvbSIsIm9yaWdpbl9qdGkiOiI4YTYxNmM2Ni0zYzJjLTRiNzQtOTdjYS1lZWE4MjZhYzQ2NmQiLCJhdWQiOiIzZjVwYWI2OW10bzQ3M2xmbTJjMDlpdmM3ayIsImV2ZW50X2lkIjoiMDAzZDUxZjktZjc5MC00NDMwLTlmY2ItMDc4MWI4ZjZiNTE1IiwiY3VzdG9tOlVzZXJUeXBlIjoiTm9ybWFsIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NDg1MzM0MjQsImV4cCI6MTY0ODUzNzAyNCwiaWF0IjoxNjQ4NTMzNDI0LCJlbWFpbCI6Im1pc3NtYWRlbzE5OTdAZ21haWwuY29tIiwianRpIjoiNjcyNzc4MWQtYzRjZS00ZDdiLWI4YWEtNDE5YTZiODk5NzMzIn0.LDwus-tPVhNmOkFffL_k5_n8cB7t4R7Nwt3zPl2O_u7NaaaTfttUDh6ukgv99sB4fHD_CEXh-WuVO9jZHQGxcXfHn6WUJV3hCMuixh_xf5lIkBFHPJuju-e6YVASQhWK0JPz3zjyR6qwp7nHFgkC2ky2Q7-LM5pqg1SAI5R4q4Ipt6oJWPCTsBcqRf2PfPgZQo9-d-w2sIB9C367A-VbUpJDv256Zq5IR4Krj4dTVirgkIBkrpvOYzM5RVSul4vbXx87OnPB9eMUc4XROIW-CXuK16BLYBodytgJoQdwI6giwE5_uiO346b1ARAJGzJgjKGkpHm0-nGUKVK2eJOK5g"
// process.env.NEXT_PUBLIC_PROFILE_TOKEN;

export async function ProfileBaseQuery(args: any, api: any, extraOptions: any) {
  const data = await getSession();
  client.setHeader('authorization', `Bearer ${token}`);
  // client.setHeader('authorization', `Bearer ${(data as any).accessToken}`);
  const rawBaseQuery = graphqlRequestBaseQuery({ client });
  const result = await rawBaseQuery(args, api, extraOptions);
  return result;
}

export const api = createApi({
  baseQuery: ProfileBaseQuery,
  reducerPath: 'profile',
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
});

export default client;
