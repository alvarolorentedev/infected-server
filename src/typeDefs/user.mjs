import apollo from 'apollo-server-express'

export default apollo.gql`
    type User {
        id: String!
        name: String
    }

    extend type Query {
        user(id: String): User
    }

    extend type Mutation {
        registerUser(
            name: String
        ): User
        deleteUser(
            id: String
        ): String
    }
`