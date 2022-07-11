import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { context } from './context'

export const server = new ApolloServer({
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  schema,
})
