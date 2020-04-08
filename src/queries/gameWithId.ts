import sqlDatabase from "../dataSources/SqlDatabase"
import { Game } from "../types/game"

export default async function gameWithId(dataSource: sqlDatabase, id: string): Promise<Game> {
    return await dataSource.getGameById(id)
}