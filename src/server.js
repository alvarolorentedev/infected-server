import express from 'express'
import apollo from 'apollo-server-express'
import typeDefs from './typeDefs/index.js'
import dataSource from './dataSources/index.js'
import resolvers from './resolvers/index.js'

const server = new apollo.ApolloServer(
    { 
        typeDefs, 
        resolvers,
        dataSources: () => dataSource,
        dataplayground: true, 
        introspection: true 
    });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 8080 }, () =>
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
);