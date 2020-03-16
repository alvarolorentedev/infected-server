import MyDatabase from "../dataSources/SqlDatabase";

/**
 * This is a command, this is used to generate side-effects on the system. For example, writing to a database or to a queue.
 * A single command can generate different side-effects and they can depend on other classes, however, there are some recommended rules:
 * * Where side-effects happen should be clear (least number of layers possible)
 * * Commands should not depend on other commands (atomicity)
 * * Commands should not read from a query model, but from normalized models (for example, they do not read information from the game to get the user info, but from the User table)
 * 
 * @param dataSource DB with normalized information
 * @param username Username of the user to create
 */
export default async function createUser(dataSource: MyDatabase, username: string): Promise<{ result: 'ok' | 'err', id: string | null }> {
    const user = await dataSource.createUser({ name: username })
    return { result: 'ok', id: user.id }
}