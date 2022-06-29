import type { QueryResolvers } from '../../generate/graphql'
import { prisma } from '../../repository/prisma'

export const getTodoResolver: QueryResolvers['getTodo'] = async (_, { id }) => {
  const todo = await prisma.todo.findUnique({ where: { id } })

  if (!todo) {
    throw new Error(`Todo ${id} not found`)
  }
  return todo
}
