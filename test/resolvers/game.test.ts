const mockCreateGame = jest.fn()
const mockJoinGame = jest.fn()
const mockStartGame = jest.fn()
const mockVotePlayer = jest.fn()
const mockGameWithId = jest.fn()

jest.mock('../../src/queries/gameWithId', () => ({
    __esModule: true,
    default: mockGameWithId
}))
jest.mock('../../src/commands/joinGame', () => ({
    __esModule: true,
    default: mockJoinGame
}))
jest.mock('../../src/commands/createGame', () => ({
    __esModule: true,
    default: mockCreateGame
}))
jest.mock('../../src/commands/startGame', () => ({
    __esModule: true,
    default: mockStartGame
}))
jest.mock('../../src/commands/votePlayer', () => ({
    __esModule: true,
    default: mockVotePlayer
}))

import resolvers from '../../src/resolvers/game'
import * as faker from "faker"

describe('game resolvers', () => {
    const gameId = faker.random.uuid()
    const userId = faker.random.uuid()
    const from = faker.random.uuid()
    const to = faker.random.uuid()
    const dataSources = {
        sqlAPI: faker.random.uuid()
    }

    beforeAll(() => {
        mockCreateGame.mockReset()
        mockJoinGame.mockReset()
        mockGameWithId.mockReset()
    })

    describe('Query', () => {

        test('should have query to game that calls sqlDatabase with parameters', async () => {
            await resolvers.Query.game(undefined, { id: gameId }, { dataSources })
            expect(mockGameWithId).toHaveBeenCalledWith(dataSources.sqlAPI, gameId)
        })
    })

    describe('mutations', () => {
        test('should have create game that calls sqlDatabase with parameters', async () => {
            await resolvers.Mutation.createGame(undefined, undefined, { dataSources })
            expect(mockCreateGame).toHaveBeenCalledWith(dataSources.sqlAPI)

        })
        test('should have join game that calls sqlDatabase with parameters', async () => {
            await resolvers.Mutation.joinGame(undefined, { gameId, userId }, { dataSources })
            expect(mockJoinGame).toHaveBeenCalledWith(dataSources.sqlAPI, gameId, userId)
        })

        test('should have start game that calls sqlDatabase with parameters', async () => {
            await resolvers.Mutation.startGame(undefined, { gameId }, { dataSources })
            expect(mockStartGame).toHaveBeenCalledWith(dataSources.sqlAPI, gameId)
        })

        test('should have start game that calls sqlDatabase with parameters', async () => {
            await resolvers.Mutation.votePlayer(undefined, { gameId, from, to }, { dataSources })
            expect(mockVotePlayer).toHaveBeenCalledWith(dataSources.sqlAPI, gameId, from, to)
        })
        
    })
})