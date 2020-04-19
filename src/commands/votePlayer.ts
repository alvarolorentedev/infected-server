import sqlDatabase from "../dataSources/SqlDatabase"
import logger from '../utils/logger'
import { SimpleResponse } from '../types/simpleResponse'

export default async function votePlayer(dataSource: sqlDatabase, gameId: string, from: string, to: string): Promise<SimpleResponse> {
    try {
        await dataSource.votePlayer(gameId, from, to)
        return { success: true }
    } catch (error) {
        logger.error(error)
        return { success: false }
    }
}