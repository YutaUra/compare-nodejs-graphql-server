import { server } from './server'

void server.listen().then(({ url }) => {
  console.info(`🚀 Server ready at ${url}`)
})
