import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs/index'
import dataSource from './dataSources/index'
import resolvers from './resolvers/index'

const server = new ApolloServer(
    { 
        typeDefs, 
        resolvers,
        dataSources: () => dataSource,
        playground: true,
        introspection: true 
    });

const app = express();

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 8080 }, () =>
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT || "8080"}${server.graphqlPath}`)
);