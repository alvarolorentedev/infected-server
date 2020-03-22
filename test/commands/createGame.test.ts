import createGame from "../../src/commands/createGame"
import * as faker from "faker"

describe('createGame', () => {
    const sqlDataSource = {
        createGame: jest.fn(),
    }
    describe('generates game correctly', () => {
        let result
        let expectedId = faker.random.uuid()
        beforeAll(async () => {
            sqlDataSource.createGame.mockResolvedValue(expectedId)
            //@ts-ignore
            result = await createGame(sqlDataSource)
        });
        test('should call database', () => {
            expect(sqlDataSource.createGame).toHaveBeenCalled()
        });        
        
        test('should return success response with expected id', () => {
            expect(result).toEqual({result: 'ok', id: expectedId})
        });
        
    });
})