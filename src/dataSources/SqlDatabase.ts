/// <reference types="../../types/index" />
import { SQLDataSource } from "datasource-sql"
import { v4 } from "uuid"
import { Game } from '../typeDefs/game'

export default class sqlDatabase extends SQLDataSource {
    constructor(config: any){
        super(config)
    }

    public async getGameById(id: string): Promise<Game> {
        const queryResult = (await this.db
            .select('*')
            .from('GAME')
            .where({ id }))[0]
        return JSON.parse(queryResult.status)
    }    
    
    public async createGame(): Promise<string> {
        const id = v4()
        const status = JSON.stringify({ id, status: "NOT_STARTED", players: [] })
        await this.db.insert({id, status}).into('GAME')
        return id
    }

    public async joinGame(gameId: string, userId: string): Promise<void> {
        const gameStatus = await this.getGameById(gameId)
        if(gameStatus.players.some(player => player.name === userId ))
            throw new Error("This player is already in the game")
        gameStatus.players.push({name: userId})
        await this.db('GAME').where({ id: gameId }).update({ status: JSON.stringify(gameStatus) })
    } 
}