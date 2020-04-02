import sqlDatabase from '../../src/dataSources/SqlDatabase';
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
        test('should return an id', async () => {
            gameId = await subject.createGame()
            expect(gameId).toBeTruthy()
        });

        test('should be able to join existing game', async () => {
            await subject.joinGame(gameId, userId)
        });
        test('should not allow to join with the same userId', async () => {
            try {
                await subject.joinGame(gameId, userId)
                fail()
            } catch (error) {
            }
        });

        test('should be able to return game with correct data', async () => {
            const game = await subject.getGameById(gameId)
            expect(game.id).toEqual(gameId)
            expect(game.status).toEqual("NOT_STARTED")
            expect(game.players).toEqual([{name: userId}])
        });
    })
})