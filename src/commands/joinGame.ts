import sqlDatabase from "../dataSources/SqlDatabase"
import { GameJoinResponse } from '../typeDefs/game'
import logger from '../utils/logger'

export default async function joinGame(dataSource: sqlDatabase): Promise<GameJoinResponse> {
    try {
        await dataSource.joinGame()
        return { success: true }
    } catch (error) {
        logger.error(error)
        return { success: false }
    }
    
}