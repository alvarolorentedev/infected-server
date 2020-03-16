import MyDatabase from "../dataSources/SqlDatabase";

/**
 * This is a query, queries can read from different normalized models (for example, User and Game) to generate a snapshot of the data for a single view.
 * Creating new query models should be fairly cheap as they do not contain business logic (they must not generate side-effects), so we can create different
 * query models for different scenarios.
 * 
 * A single query has no side-effects, and there are some recommended rules:
 * * Queries should be cacheable
 * * Getting information from different sources should be concurrent (for example, querying two tables)
 * * Queries should not depend on other queries NOR commands
 * 
 * Queries conventions are, by definition, nouns (what data they represent) more than actions.
 * 
 * @param dataSource DB with normalized information
 * @param username Username of the user to create
 */
export default async function userWithId(dataSource: MyDatabase, id: string): Promise<{ result: 'ok' | 'not-found', user: any }> {
    return await dataSource.getUserById(id)
}