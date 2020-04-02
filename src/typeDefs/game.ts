import { gql } from 'apollo-server-express'

export type GameCreateResponse = {
    success: boolean,
    id?: string
}

export type GameJoinResponse = {
    success: boolean
}

export type Player = {
    name: string
}

export type Game = {
    id: string,
    status: string
    players: Player[]
}

export default gql`
    type Player {
        name: String!
    }

    type Game {
        id: String!
        status: String!
        players: [Player!]!
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