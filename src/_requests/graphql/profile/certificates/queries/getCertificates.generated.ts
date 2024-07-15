import type * as ServerTypes from '../../../../../@types/sections/serverTypes';

import { api } from 'src/_clients/graphql/Profile';
export type GetCertificatesQueryVariables = ServerTypes.Exact<{
  filter: ServerTypes.GenericFilterRequestCertificateGetAllInputType;
}>;


export type GetCertificatesQuery = { getCertificates?: { listDto?: { items?: Array<{ id: string, credentialDoesExpire?: boolean | null, issueDate?: any | null, expirationDate?: any | null, credentialID?: string | null, credentialUrl?: string | null, certificateName?: { id?: any | null, title?: string | null } | null, issuingOrganization?: { id?: any | null, title?: string | null } | null } | null> | null } | null } | null };


export const GetCertificatesDocument = `
    query getCertificates($filter: GenericFilterRequestCertificateGetAllInputType!) {
  getCertificates(filter: $filter) {
    listDto {
      items {
        id
        credentialDoesExpire
        issueDate
        expirationDate
        credentialID
        credentialUrl
        certificateName {
          id
          title
        }
        issuingOrganization {
          id
          title
        }
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCertificates: build.query<GetCertificatesQuery, GetCertificatesQueryVariables>({
      query: (variables) => ({ document: GetCertificatesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetCertificatesQuery, useLazyGetCertificatesQuery } = injectedRtkApi;

