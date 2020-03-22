import sqlDatabase from "../dataSources/SqlDatabase"

export default async function createGame(dataSource: sqlDatabase): Promise<{ result: 'ok' | 'err', id: string | null }> {
    const id = await dataSource.createGame()
    return { result: 'ok', id }
}