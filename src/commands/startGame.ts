import sqlDatabase from "../dataSources/SqlDatabase"
import logger from '../utils/logger'
import { SimpleResponse } from '../types/simpleResponse';

export default async function startGame(dataSource: sqlDatabase, gameId: string): Promise<SimpleResponse> {
    try {
        await dataSource.startGame(gameId)
        return { success: true }
    } catch (error) {
        logger.error(error)
        return { success: false }
    }
    
}