import sqlDatabase from "../dataSources/SqlDatabase"
import { GameCreateResponse } from '../typeDefs/game'
import logger from '../utils/logger'

export default async function createGame(dataSource: sqlDatabase): Promise<GameCreateResponse> {
    try {
        const id = await dataSource.createGame()
        return { success: true, id }
    } catch (error) {
        logger.error(error)
        return { success: false }
    }
    
}