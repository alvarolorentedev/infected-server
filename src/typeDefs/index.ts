import { gql } from 'apollo-server-express'
import game from './game'

const base = gql`
    type Query {
        Health: String
    }

    type Mutation {
        Health: String
    }
`

export default [base,game]