export default {
    Query: {
        user: async (_, { id }, { dataSources }) => await dataSources.sqlAPI.getUserById(id)
    },
    Mutation: {
        registerUser: async (_, { name }, { dataSources }) => await dataSources.sqlAPI.createUser({ name }),
        deleteUser: async (_, { id }, { dataSources }) => await dataSources.sqlAPI.removeUserById(id)
    }
  }