import apollo from 'apollo-server-express'
import order from './order.mjs'
import user from './user.mjs'

const base = apollo.gql`
    type Query {
        Health: String
    }

    type Mutation {
        Health: String
    }
`

export default [base,order,user]