const mockDeal = jest.fn()

jest.mock('../../src/utils/deal', () => ({
    __esModule: true,
    default: mockDeal
}))

import sqlDatabase from '../../src/dataSources/SqlDatabase'
import { Card, PlayerStatus, GameStatus } from '../../src/typeDefs/game'
import * as faker from "faker"

describe('sqlDatabase', () => {
    const config = {
        client: "sqlite3",
        connection: {
            filename: ":memory:"
        }
    };
    let subject = new sqlDatabase(config)
    beforeAll(async () => {
        await subject.db.schema.createTable('GAME', (table) => {
            table.string("id", 36)
            table.text("status")
          })
    });

    describe('generates game correctly', () => {
        let gameId: string
        let userId: string = faker.random.uuid()
        let userId2: string = faker.random.uuid()
        test('should return an id', async () => {
            gameId = await subject.createGame()
            expect(gameId).toBeTruthy()
        });

        test('should be able to join existing game', async () => {
            mockDeal.mockReturnValue(Card.Infected)
            await subject.joinGame(gameId, userId)
            expect(mockDeal).toHaveBeenCalledWith({infected: 0, total: 0})
        });

        test('should not allow to join with the same userId', async () => {
            try {
                await subject.joinGame(gameId, userId)
                fail()
            } catch (_) {
            }
        });

        test('should allow to join with other same userId', async () => {
            mockDeal.mockReturnValue(Card.Healthy)
            await subject.joinGame(gameId, userId2)
            expect(mockDeal).toHaveBeenCalledWith({infected: 1, total: 1})
        });

        test('should be able to return game with correct data', async () => {
            const game = await subject.getGameById(gameId)
            expect(game.id).toEqual(gameId)
            expect(game.status).toEqual(GameStatus.NotStarted)
            expect(game.players[0]).toEqual({name: userId, status: PlayerStatus.Free, card: Card.Infected})
            expect(game.players[1]).toEqual({name: userId2, status: PlayerStatus.Free, card: Card.Healthy})
        });
    })
})