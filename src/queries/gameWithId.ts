import sqlDatabase from "../dataSources/SqlDatabase"

export default async function gameWithId(dataSource: sqlDatabase, id: string): Promise<{ result: 'ok' | 'not-found', user: any }> {
    return await dataSource.getGameById(id)
}