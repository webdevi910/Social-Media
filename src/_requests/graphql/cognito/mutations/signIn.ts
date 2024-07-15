import { gql } from 'graphql-request';

export const SIGN_IN_MUTATION = gql`
  mutation ($data: GenericMutationRequestLoginInputType!) {
    login(login: $data) {
      listDto {
        items {
          token
          refreshToken
          expiry
        }
      }
      isSuccess
    }
  }
`;
