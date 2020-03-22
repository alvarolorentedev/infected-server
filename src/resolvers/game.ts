import createGame from '../commands/createGame'
import gameWithId from '../queries/gameWithId'

export default {
    Query: {
        game: async (_, { id }, { dataSources }) => await gameWithId(dataSources.sqlAPI, id)
    },
    Mutation: {
        createGame: async (_, __, { dataSources }) => await createGame(dataSources.sqlAPI)
    }
  }