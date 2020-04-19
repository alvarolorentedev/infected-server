/// <reference types="../../types/index" />
import { SQLDataSource } from "datasource-sql"
import { v4 } from "uuid"
import { Card } from "../types/card"
import { PlayerStatus } from "../types/playerStatus"
import { GameStatus } from "../types/gameStatus"
import { Game } from "../types/game"
import deal from "../utils/deal"
import { RoundStatus } from "../types/roundStatus"

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
        const status = JSON.stringify({ id, status: GameStatus.NotStarted, round: RoundStatus.Other, players: [] })
        await this.db.insert({id, status}).into('GAME')
        return id
    }

    public async joinGame(gameId: string, userId: string): Promise<void> {
        const gameStatus = await this.getGameById(gameId)
        if(gameStatus.players.some(player => player.name === userId ))
            return Promise.reject("This player is already in the game")
        const infected = gameStatus.players.filter(player => player.card === Card.Infected).length
        gameStatus.players.push({ name: userId, status: PlayerStatus.Free, card: deal({ infected, total: gameStatus.players.length}) })
        await this.db('GAME').where({ id: gameId }).update({ status: JSON.stringify(gameStatus) })
    } 

    public async startGame(gameId: string): Promise<void> {
        const gameStatus = await this.getGameById(gameId)
        if(gameStatus.status !== GameStatus.NotStarted)
            return Promise.reject("game has already started")
        gameStatus.status = GameStatus.Started
        gameStatus.round = RoundStatus.Join
        await this.db('GAME').where({ id: gameId }).update({ status: JSON.stringify(gameStatus) })
    } 

    public async votePlayer(gameId: string, userId: string): Promise<void> {
        const gameStatus = await this.getGameById(gameId)
        const votedPlayer = gameStatus.players.find(player => player.name === userId)
        if(votedPlayer.card !== Card.Infected)
            return Promise.reject("game has already started")
        return Promise.resolve()
    } 

}