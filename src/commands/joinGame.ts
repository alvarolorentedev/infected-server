import sqlDatabase from "../dataSources/SqlDatabase"
import logger from '../utils/logger'
import { SimpleResponse } from '../types/simpleResponse';

export default async function joinGame(dataSource: sqlDatabase, gameId: string, userId: string): Promise<SimpleResponse> {
    try {
        await dataSource.joinGame(gameId, userId)
        return { success: true }
    } catch (error) {
        logger.error(error)
        return { success: false }
    }
    
}