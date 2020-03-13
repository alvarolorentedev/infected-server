import apollo from 'apollo-server-express'

export default apollo.gql`
    type Order {
        id: String!
    }

    extend type Query {
        orders: [Order]
    }

    extend type Mutation {
        registerOrder(
            id: String!
        ): Order!
        deleteOrder(
            id: String!
        ): String
    }
`