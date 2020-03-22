import user from './game'

const Query = { ...user.Query }
const Mutation = { ...user.Mutation }

export default {
    Query,
    Mutation
  }