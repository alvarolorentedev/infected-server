const mockErrorLogger = jest.fn()

jest.mock('../../src/utils/logger', () => ({
    __esModule: true,
    default: {
        error: mockErrorLogger
    }
}))

import votePlayer from "../../src/commands/votePlayer"
import * as faker from "faker"

describe('votePlayer', () => {
    const sqlDataSource = {
        votePlayer: jest.fn(),
    }


    describe('start game correctly', () => {
        let result
        let gameId = faker.random.uuid()
        let userId = faker.random.uuid()
        beforeAll(async () => {
            sqlDataSource.votePlayer.mockReset()
            sqlDataSource.votePlayer.mockResolvedValue(undefined)
            //@ts-ignore
            result = await votePlayer(sqlDataSource, gameId, userId)
        })
        test('should call database', () => {
            expect(sqlDataSource.votePlayer).toHaveBeenCalledWith(gameId, userId)
        })        
        
        test('should return success response with expected id', () => {
            expect(result).toEqual({success: true})
        })
        
    })    
    
    describe('error creating game', () => {
        let result
        const expectedError = faker.random.uuid()
        let gameId = faker.random.uuid()
        let userId = faker.random.uuid()
        beforeAll(async () => {
            sqlDataSource.votePlayer.mockReset()
            sqlDataSource.votePlayer.mockRejectedValue(expectedError)
            mockErrorLogger.mockReset()
            //@ts-ignore
            result = await votePlayer(sqlDataSource, gameId, userId)
        })
        test('should call database', () => {
            expect(sqlDataSource.votePlayer).toHaveBeenCalledWith(gameId, userId)
        })        
        
        test('should call error logger with error', () => {
            expect(mockErrorLogger).toHaveBeenCalledWith(expectedError)
        })        
        
        test('should return success response with expected id', () => {
            expect(result).toEqual({success: false})
        })
        
    })
})