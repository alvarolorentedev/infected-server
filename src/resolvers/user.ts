export default {
    Query: {
        user: async (_, { id }, { dataSources }) => (await dataSources.sqlAPI.getUserById(id))[0]
    },
    Mutation: {
        registerUser: async (_, { name }, { dataSources }) => {
            const user = (await dataSources.sqlAPI.createUser({ name }))[0]
            return { success: true , user }
        },
        deleteUser: async (_, { id }, { dataSources }) => {
            await dataSources.sqlAPI.removeUserById(id)
            return { success: true }
        }
    }
  }