import { gql } from 'apollo-server-express'

export default gql`
    type User {
        id: String!
        username: String
    }

    extend type Query {
        user(id: String): User
    }

    type UserResponse {
        result: String!
        id: String
    }

    extend type Mutation {
        registerUser(
            name: String
        ): UserResponse!
        deleteUser(
            id: String
        ): UserResponse!
    }
`