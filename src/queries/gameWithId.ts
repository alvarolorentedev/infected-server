import MyDatabase from "../dataSources/SqlDatabase"

export default async function gameWithId(dataSource: MyDatabase, id: string): Promise<{ result: 'ok' | 'not-found', user: any }> {
    return await dataSource.getGameById(id)
}