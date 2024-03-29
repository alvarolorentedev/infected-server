const mockErrorLogger = jest.fn()

jest.mock('../../src/utils/logger', () => ({
    __esModule: true,
    default: {
        error: mockErrorLogger
    }
}))

import joinGame from "../../src/commands/joinGame"
import * as faker from "faker"

describe('joinGame', () => {
    const sqlDataSource = {
        joinGame: jest.fn(),
    }

    describe('generates game correctly', () => {
        let result
        const gameId = faker.random.uuid()
        const userId = faker.random.uuid()
        beforeAll(async () => {
            sqlDataSource.joinGame.mockReset()
            sqlDataSource.joinGame.mockResolvedValue(undefined)
            //@ts-ignore
            result = await joinGame(sqlDataSource, gameId, userId)
        })
        test('should call database', () => {
            expect(sqlDataSource.joinGame).toHaveBeenCalledWith(gameId, userId)
        })        
        
        test('should return success response with expected id', () => {
            expect(result).toEqual({success: true})
        })
        
    })    
    
    describe('error creating game', () => {
        let result
        const expectedError = faker.random.uuid()
        const gameId = faker.random.uuid()
        const userId = faker.random.uuid()
        beforeAll(async () => {
            sqlDataSource.joinGame.mockReset()
            mockErrorLogger.mockReset()
            sqlDataSource.joinGame.mockRejectedValue(expectedError)
            //@ts-ignore
            result = await joinGame(sqlDataSource, gameId, userId)
        })
        test('should call database', () => {
            expect(sqlDataSource.joinGame).toHaveBeenCalledWith(gameId, userId)
        })        
        
        test('should call error logger with error', () => {
            expect(mockErrorLogger).toHaveBeenCalledWith(expectedError)
        })        
        
        test('should return success response with expected id', () => {
            expect(result).toEqual({success: false})
        })
        
    })
})