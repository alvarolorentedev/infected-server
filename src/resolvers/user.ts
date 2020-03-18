import createUser from '../commands/createUser'
import userWithId from '../queries/userWithId'

export default {
    Query: {
        user: async (_, { id }, { dataSources }) => await userWithId(dataSources.sqlAPI, id)
    },
    Mutation: {
        registerUser: async (_, { name }, { dataSources }) => {
            const result = await createUser(dataSources.sqlAPI, name)
            return result
        },
        deleteUser: async (_, { id }, { dataSources }) => {
            await dataSources.sqlAPI.removeUserById(id)
            return { success: true }
        }
    }
  }