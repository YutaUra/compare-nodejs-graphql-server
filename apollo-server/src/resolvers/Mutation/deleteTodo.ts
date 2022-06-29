import type { MutationResolvers } from '../../generate/graphql'
import { prisma } from '../../repository/prisma'

export const deleteTodoResolver: MutationResolvers['deleteTodo'] = async (
  _,
  { id },
) => {
  const todo = await prisma.todo.delete({ where: { id } })
  return todo
}
