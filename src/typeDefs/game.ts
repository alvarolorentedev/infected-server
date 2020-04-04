import { gql } from 'apollo-server-express'

export enum Card {
    Infected = "Infected",
    Healthy = "Healthy"
}

export enum PlayerStatus {
    Free = "Free",
    Quarentained = "Quarentained"
}

export enum GameStatus {
    NotStarted = "NotStarted",
    Started = "Started",
    Ended = "Ended"
}

export type GameCreateResponse = {
    success: boolean,
    id?: string
}

export type GameJoinResponse = {
    success: boolean
}

export type Player = {
    name: string,
    card: Card,
    status: PlayerStatus
}

export type Game = {
    id: string,
    status: GameStatus
    players: Player[]
}

export default gql`
    enum Card {
        Infected
        Healthy
    }

    enum PlayerStatus {
        Free
        Quarentained
    }

    enum GameStatus {
        NotStarted
        Started
        Ended
    }

    type Player {
        name: String!
        card: Card!
        status: PlayerStatus!
    }

    type Game {
        id: String!
        status: GameStatus!
        players: [Player!]!
    }

    extend type Query {
        game(id: String): Game
    }

    type GameCreateResponse {
        success: Boolean!
        id: String
    }

    type GameJoinResponse {
        success: Boolean!
    }

    extend type Mutation {
        createGame: GameCreateResponse!
        joinGame(gameId: String!, userId: String!): GameJoinResponse!
    }
`