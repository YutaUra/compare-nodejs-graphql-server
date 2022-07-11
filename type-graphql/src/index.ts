import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { TodoResolver } from './modules/todo/todo.resolver'
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { Container } from 'typedi'

const bootstrap = async () => {
  const schema = await buildSchema({
    container: Container,
    resolvers: [TodoResolver],
  })

  const server = new ApolloServer({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    schema,
  })

  const { url } = await server.listen()
  console.info(`🚀 Server ready at ${url}`)
}

void bootstrap()
