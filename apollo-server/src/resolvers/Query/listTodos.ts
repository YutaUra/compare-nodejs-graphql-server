import type { QueryResolvers } from '../../generate/graphql'
import { prisma } from '../../repository/prisma'

export const listTodosResolver: QueryResolvers['listTodos'] = async () => {
  const todos = prisma.todo.findMany()
  return todos
}
