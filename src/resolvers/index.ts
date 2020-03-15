import user from './user'

const Query = { ...user.Query }
const Mutation = { ...user.Mutation }

export default {
    Query,
    Mutation
  }