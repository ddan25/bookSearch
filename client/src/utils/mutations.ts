import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

export const ADD_USER = gql`
mutation addUser($input: UserInput!) {
  addUser(input: $input) {
    token
    user {
      email
      _id
    }
  }
}
`;