import apollo from 'apollo-server-express'
import order from './order.js'
import user from './user.js'

const base = apollo.gql`
    type Query {
        Health: String
    }

    type Mutation {
        Health: String
    }
`

export default [base,order,user]