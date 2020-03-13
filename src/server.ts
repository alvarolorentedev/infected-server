import * as express from 'express';
import {ApolloServer} from 'apollo-server-express'
import typeDefs from './typeDefs/index'
import dataSource from './dataSources/index'
import resolvers from './resolvers/index'

const server = new ApolloServer(
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