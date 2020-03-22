import { gql } from 'apollo-server-express'

export default gql`
    type Game {
        id: String!
    }

    extend type Query {
        game(id: String): Game
    }

    type GameResponse {
        result: String!
        id: String
    }

    extend type Mutation {
        createGame: GameResponse!
    }
`