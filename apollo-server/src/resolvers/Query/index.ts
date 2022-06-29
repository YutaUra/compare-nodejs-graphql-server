import type { QueryResolvers } from '../../generate/graphql'
import { getTodoResolver } from './getoTodo'
import { listTodosResolver } from './listTodos'

export const QueryResolver: QueryResolvers = {
  getTodo: getTodoResolver,
  listTodos: listTodosResolver,
}
