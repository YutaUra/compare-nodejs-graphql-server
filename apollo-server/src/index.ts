import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server'
import { loadSchema } from '@graphql-tools/load'
import { join } from 'path'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import type { Resolvers } from './generate/graphql'
import { DateTimeResolver } from './resolvers/DateTime'
import { MutationResolver } from './resolvers/Mutation'
import { QueryResolver } from './resolvers/Query'

const createServer = async () => {
  const resolvers: Resolvers = {
    DateTime: DateTimeResolver,
    Mutation: MutationResolver,
    Query: QueryResolver,
  }

  return new ApolloServer({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    schema: await loadSchema(join(__dirname, '..', 'schema.graphql'), {
      loaders: [new GraphQLFileLoader()],
      resolvers,
    }),
  })
}

void createServer()
  .then((server) => server.listen(3000))
  .then(() =>
    console.info(`🚀🚀🚀 graphql server is listening on http://localhost:3000`),
  )
