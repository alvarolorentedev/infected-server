import { gql } from 'apollo-server-express'

export default gql`
    type User {
        id: String!
        name: String
    }

    extend type Query {
        user(id: String): User
    }

    type UserResponse {
        success: Boolean!
        user: User
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