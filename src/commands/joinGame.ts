import sqlDatabase from "../dataSources/SqlDatabase"
import { GameJoinResponse } from "../types/gameJoinResponse"
import logger from '../utils/logger'

export default async function joinGame(dataSource: sqlDatabase, gameId: string, userId: string): Promise<GameJoinResponse> {
    try {
        await dataSource.joinGame(gameId, userId)
        return { success: true }
    } catch (error) {
        logger.error(error)
        return { success: false }
    }
    
}