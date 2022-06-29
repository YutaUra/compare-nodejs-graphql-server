import type { MutationResolvers } from '../../generate/graphql'
import { createTodoResolver } from './createTodo'
import { deleteTodoResolver } from './deleteTodo'
import { updateTodoResolver } from './updateTodo'

export const MutationResolver: MutationResolvers = {
  createTodo: createTodoResolver,
  deleteTodo: deleteTodoResolver,
  updateTodo: updateTodoResolver,
}
