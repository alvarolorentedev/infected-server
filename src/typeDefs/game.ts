import { gql } from 'apollo-server-express'

export type GameCreateResponse = {
    success: boolean,
    id: string
}

export type Game = {
    id: string
}
export type GameResponse = {
    success: boolean,
    game: Game
}

export default gql`
    type Game {
        id: String!
    }

    type GameResponse {
        success: Boolean!
        game: Game
    }

    extend type Query {
        game(id: String): Game
    }

    type GameCreateResponse {
        success: Boolean!
        id: String
    }

    extend type Mutation {
        createGame: GameCreateResponse!
    }
`