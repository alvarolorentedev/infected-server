const mockDeal = jest.fn()

jest.mock('../../src/utils/deal', () => ({
    __esModule: true,
    default: mockDeal
}))

import sqlDatabase from '../../src/dataSources/SqlDatabase'
import * as faker from "faker"
import { Card } from '../../src/types/card'
import { GameStatus } from '../../src/types/gameStatus';
import { PlayerStatus } from '../../src/types/playerStatus';
import { RoundStatus } from '../../src/types/roundStatus';

describe('sqlDatabase', () => {
    const config = {
        client: "sqlite3",
        connection: {
            filename: ":memory:"
        }
    }
    let subject = new sqlDatabase(config)
    beforeAll(async () => {
        await subject.db.schema.createTable('GAME', (table) => {
            table.string("id", 36)
            table.text("status")
          })
    })

    afterAll(() => {
        subject.db.destroy()
    })

    describe('generates game correctly', () => {
        let gameId: string
        let userId: string = faker.random.uuid()
        let userId2: string = faker.random.uuid()
        let userId3: string = faker.random.uuid()
        let userId4: string = faker.random.uuid()
        test('should return an id', async () => {
            gameId = await subject.createGame()
            expect(gameId).toBeTruthy()
        })

        test('should be able to join existing game', async () => {
            mockDeal.mockReturnValue(Card.Infected)
            await subject.joinGame(gameId, userId)
            expect(mockDeal).toHaveBeenCalledWith({infected: 0, total: 0})
        })

        test('should not allow to join with the same userId', async () => {
            try {
                await subject.joinGame(gameId, userId)
                fail()
            } catch (_) {
            }
        })

        test('should allow to join other players', async () => {
            mockDeal.mockReturnValue(Card.Healthy)
            await subject.joinGame(gameId, userId2)
            expect(mockDeal).toHaveBeenCalledWith({infected: 1, total: 1})
            await subject.joinGame(gameId, userId3)
            expect(mockDeal).toHaveBeenCalledWith({infected: 1, total: 2})
            mockDeal.mockReturnValue(Card.Infected)
            await subject.joinGame(gameId, userId4)
            expect(mockDeal).toHaveBeenCalledWith({infected: 1, total: 3})
        })

        test('should be able to return game with correct data', async () => {
            const game = await subject.getGameById(gameId)
            expect(game.id).toEqual(gameId)
            expect(game.status).toEqual(GameStatus.NotStarted)
            expect(game.round).toEqual(RoundStatus.Other)
            expect(game.players[0]).toEqual({name: userId, status: PlayerStatus.Free, card: Card.Infected})
            expect(game.players[1]).toEqual({name: userId2, status: PlayerStatus.Free, card: Card.Healthy})
            expect(game.players[2]).toEqual({name: userId3, status: PlayerStatus.Free, card: Card.Healthy})
            expect(game.players[3]).toEqual({name: userId4, status: PlayerStatus.Free, card: Card.Infected})
        })

        test('should be able to start game that exist', async () => {
            try {
                await subject.startGame(gameId)
            } catch (error) {
                fail()                
            }
        })

        test('should have game started', async () => {
            const game = await subject.getGameById(gameId)
            expect(game.id).toEqual(gameId)
            expect(game.status).toEqual(GameStatus.Started)
            expect(game.round).toEqual(RoundStatus.Join)
        })

        test('should not be able to start game that is already started', async () => {
            try {
                await subject.startGame(gameId)
                fail()     
            } catch (error) {           
            }
        })

        test('when join vote state not allow vote to infected players', async () => {
            try {
                await subject.votePlayer(gameId, userId2)
                fail()     
            } catch (error) {           
            }
        })

        test('when join state allow vote from infected players', async () => {
                await subject.votePlayer(gameId, userId)
        })


        test('game should be state in join game ', async () => {
            const game = await subject.getGameById(gameId)
            expect(game.id).toEqual(gameId)
            expect(game.status).toEqual(GameStatus.Started)
            expect(game.round).toEqual(RoundStatus.Join)
        })
    })
})