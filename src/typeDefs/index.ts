import { gql } from 'apollo-server-express'
import order from './order'
import user from './user'

const base = gql`
    type Query {
        Health: String
    }

    type Mutation {
        Health: String
    }
`

export default [base,order,user]