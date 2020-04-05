const mockErrorLogger = jest.fn()

jest.mock('../../src/utils/logger', () => ({
    __esModule: true,
    default: {
        error: mockErrorLogger
    }
}))

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
            sqlDataSource.createGame.mockReset()
            sqlDataSource.createGame.mockResolvedValue(expectedId)
            //@ts-ignore
            result = await createGame(sqlDataSource)
        })
        test('should call database', () => {
            expect(sqlDataSource.createGame).toHaveBeenCalled()
        })        
        
        test('should return success response with expected id', () => {
            expect(result).toEqual({success: true, id: expectedId})
        })
        
    })    
    
    describe('error creating game', () => {
        let result
        const expectedError = faker.random.uuid()
        beforeAll(async () => {
            sqlDataSource.createGame.mockReset()
            sqlDataSource.createGame.mockRejectedValue(expectedError)
            mockErrorLogger.mockReset()
            //@ts-ignore
            result = await createGame(sqlDataSource)
        })
        test('should call database', () => {
            expect(sqlDataSource.createGame).toHaveBeenCalled()
        })        
        
        test('should call error logger with error', () => {
            expect(mockErrorLogger).toHaveBeenCalledWith(expectedError)
        })        
        
        test('should return success response with expected id', () => {
            expect(result).toEqual({success: false})
        })
        
    })
})