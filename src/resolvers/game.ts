import createGame from '../commands/createGame'
import joinGame from '../commands/joinGame'
import votePlayer from '../commands/votePlayer'
import startGame from '../commands/startGame'
import gameWithId from '../queries/gameWithId'

export default {
    Query: {
        game: async (_, { id }, { dataSources }) => await gameWithId(dataSources.sqlAPI, id)
    },
    Mutation: {
        createGame: async (_, __, { dataSources }) => await createGame(dataSources.sqlAPI),
        joinGame: async (_, { gameId, userId }, { dataSources }) => await joinGame(dataSources.sqlAPI, gameId, userId),
        startGame: async (_, { gameId }, { dataSources }) => await startGame(dataSources.sqlAPI, gameId),
        votePlayer: async (_, { gameId, userId }, { dataSources }) => await votePlayer(dataSources.sqlAPI, gameId, userId),
    }
  }