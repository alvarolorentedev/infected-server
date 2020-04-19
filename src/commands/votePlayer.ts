import sqlDatabase from "../dataSources/SqlDatabase"
import logger from '../utils/logger'
import { SimpleResponse } from '../types/simpleResponse'

export default async function votePlayer(dataSource: sqlDatabase, gameId: string, userId: string): Promise<SimpleResponse> {
    try {
        await dataSource.votePlayer(gameId, userId)
        return { success: true }
    } catch (error) {
        logger.error(error)
        return { success: false }
    }
}