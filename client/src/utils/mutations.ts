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
export const SAVE_BOOK = gql`
mutation Mutation($input: BookInput!) {
  saveBook(input: $input) {
    _id
    username
    email
    password
    savedBooks {
      title
      _id
    }
  }
}
  `;

  export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      savedBooks {
        authors
        bookId
      }
      email
      username
    }
  }
    `;