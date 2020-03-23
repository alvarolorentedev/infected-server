import sqlDatabase from "../dataSources/SqlDatabase"
import { GameResponse } from '../typeDefs/game';

export default async function gameWithId(dataSource: sqlDatabase, id: string): Promise<GameResponse> {
    const game = await dataSource.getGameById(id)
    return { success: true, game }
}