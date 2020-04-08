import sqlDatabase from "../dataSources/SqlDatabase"
import logger from '../utils/logger'
import { GameJoinResponse } from '../types/gameJoinResponse'

export default async function joinGame(dataSource: sqlDatabase, gameId: string, userId: string): Promise<GameJoinResponse> {
    try {
        await dataSource.joinGame(gameId, userId)
        return { success: true }
    } catch (error) {
        logger.error(error)
        return { success: false }
    }
    
}