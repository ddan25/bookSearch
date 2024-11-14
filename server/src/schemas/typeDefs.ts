const typeDefs = `
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }
    type Book {
    _id: ID!
    bookId: String!
    title: String!
    authors: [String]
    description: String
    image: String
    link: String
    }

input UserInput {
    username: String!
    email: String!
    password: String!
  }

    input BookInput {
    authors: [String]
    description: String
    bookId: String!
    title: String!
    image: String
    link: String
  }

type Auth {
    token: ID!
    user: User
  }

    type Query {
    me: User
  }

    type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: ID!): User
  }

`;

export default typeDefs;