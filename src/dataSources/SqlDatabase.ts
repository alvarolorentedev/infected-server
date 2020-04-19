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
        const status = JSON.stringify({ id, status: GameStatus.NotStarted, round: RoundStatus.Other, players: [], rounds: [] })
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
        gameStatus.rounds.push({type:RoundStatus.Join, votes: []})
        await this.db('GAME').where({ id: gameId }).update({ status: JSON.stringify(gameStatus) })
    } 

    public async votePlayer(gameId: string, from: string, to: string): Promise<void> {
        const gameStatus = await this.getGameById(gameId)
        const infectedPlayers = gameStatus.players.filter(player => player.card === Card.Infected && player.status === PlayerStatus.Free)
        const freePlayers = gameStatus.players.filter(player => player.status === PlayerStatus.Free)
        const votingPlayer = gameStatus.players.find(player => player.name === from)
        const currentRound = gameStatus.rounds[gameStatus.rounds.length-1]
        if(currentRound.type === RoundStatus.Join && votingPlayer.card === Card.Healthy)
            return Promise.reject("this player cant vote in this round")
        currentRound.votes.push({from, to})
        if(currentRound.type === RoundStatus.Join && currentRound.votes.length === infectedPlayers.length){
            const res = currentRound.votes.reduce((acc, value) => {return {...acc, [value.to]: (acc[value.to]? acc[value.to]: 0)+1 }},{})
            const userToquarentain = Object.entries(res).reduce((acc, [name, votes]) =>votes>acc.votes? {name, votes} : acc,{name: "",votes: 0})
            gameStatus.players.find(player => player.name === userToquarentain.name).status = PlayerStatus.Quarentained
            gameStatus.rounds.push({type:RoundStatus.Separated, votes: []})
        }
        else if(currentRound.type === RoundStatus.Separated && currentRound.votes.length === freePlayers.length){
            const res = currentRound.votes.reduce((acc, value) => {return {...acc, [value.to]: (acc[value.to]? acc[value.to]: 0)+1 }},{})
            const userToquarentain = Object.entries(res).reduce((acc, [name, votes]) =>votes>acc.votes? {name, votes} : acc,{name: "",votes: 0})
            gameStatus.players.find(player => player.name === userToquarentain.name).status = PlayerStatus.Quarentained
            gameStatus.rounds.push({type:RoundStatus.Join, votes: []})
        }
        const freeHealthy = gameStatus.players.filter(player => player.status === PlayerStatus.Free && player.card === Card.Healthy)
        const freeInfected = gameStatus.players.filter(player => player.status === PlayerStatus.Free && player.card === Card.Infected)
        if(freeHealthy.length === 0 || freeInfected.length === 0)
            gameStatus.status = GameStatus.Ended
        await this.db('GAME').where({ id: gameId }).update({ status: JSON.stringify(gameStatus) })
    } 

}