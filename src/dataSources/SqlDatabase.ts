/// <reference types="../../types/index" />
import { SQLDataSource } from "datasource-sql"
import { v4 } from "uuid"

const MINUTE = 60
export default class sqlDatabase extends SQLDataSource {
    constructor(config: any){
        super(config)
    }

    async getGameById(id: string) {
        return (await this.db
            .select('*')
            .from('GAME')
            .where({ id })
            .cache(MINUTE))[0]
    }    
    
    async createGame() {
        const id = v4()
        await this.db('GAME').insert({id})
        return id
    } 
}