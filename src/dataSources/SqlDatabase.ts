/// <reference types="../../types/index" />
import { SQLDataSource } from "datasource-sql"
import { v4 } from "uuid"
import { Game } from '../typeDefs/game'

const MINUTE = 60
export default class sqlDatabase extends SQLDataSource {
    constructor(config: any){
        super(config)
    }

    public async getGameById(id: string): Promise<Game> {
        return (await this.db
            .select('*')
            .from('GAME')
            .where({ id })
            .cache(MINUTE))[0]
    }    
    
    public async createGame(): Promise<string> {
        const id = v4()
        await this.db.insert({id}).into('GAME')
        return id
    }

    public async joinGame(): Promise<void> {
        throw "Not Implemented";
    } 
}