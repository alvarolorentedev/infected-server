const mockErrorLogger = jest.fn()

jest.mock('../../src/utils/logger', () => ({
    __esModule: true,
    default: {
        error: mockErrorLogger
    }
}))

import startGame from "../../src/commands/startGame"
import * as faker from "faker"

describe('startGame', () => {
    const sqlDataSource = {
        startGame: jest.fn(),
    }


    describe('start game correctly', () => {
        let result
        let gameId = faker.random.uuid()
        beforeAll(async () => {
            sqlDataSource.startGame.mockReset()
            sqlDataSource.startGame.mockResolvedValue(undefined)
            //@ts-ignore
            result = await startGame(sqlDataSource, gameId)
        })
        test('should call database', () => {
            expect(sqlDataSource.startGame).toHaveBeenCalledWith(gameId)
        })        
        
        test('should return success response with expected id', () => {
            expect(result).toEqual({success: true})
        })
        
    })    
    
    describe('error creating game', () => {
        let result
        const expectedError = faker.random.uuid()
        let gameId = faker.random.uuid()
        beforeAll(async () => {
            sqlDataSource.startGame.mockReset()
            sqlDataSource.startGame.mockRejectedValue(expectedError)
            mockErrorLogger.mockReset()
            //@ts-ignore
            result = await startGame(sqlDataSource, gameId)
        })
        test('should call database', () => {
            expect(sqlDataSource.startGame).toHaveBeenCalledWith(gameId)
        })        
        
        test('should call error logger with error', () => {
            expect(mockErrorLogger).toHaveBeenCalledWith(expectedError)
        })        
        
        test('should return success response with expected id', () => {
            expect(result).toEqual({success: false})
        })
        
    })
})