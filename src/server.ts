import * as express from 'express'
import * as auth from 'express-basic-auth'
import { ApolloServer } from 'apollo-server-express'
import * as cors from "cors"
import dataSource from './dataSources/index'
import resolvers from './resolvers/index'
import logger from './utils/logger'
import * as morgan from "morgan"
import { importSchema } from 'graphql-import'
import { gql } from 'apollo-server-express'

const server = new ApolloServer({ 
    typeDefs: gql(importSchema(`${__dirname}/schemas/schemas.graphql`)),
    resolvers,
    dataSources: () => dataSource,
    playground: true,
    introspection: true 
})

class MyStream {
  write(text: string) {
    logger.info(text)
  }
}
let stream = new MyStream()

const app = express()
app.use(cors())
app.use(auth({
  users: { 'admin': 'supersecret' }
})) 
app.use(morgan('tiny', { stream }))

server.applyMiddleware({ app })

app.listen({ port: process.env.PORT || 8080 }, () =>
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT || "8080"}${server.graphqlPath}`)
)