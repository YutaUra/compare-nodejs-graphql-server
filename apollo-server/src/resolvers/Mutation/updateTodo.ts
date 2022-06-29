import type { MutationResolvers } from '../../generate/graphql'
import { prisma } from '../../repository/prisma'

export const updateTodoResolver: MutationResolvers['updateTodo'] = async (
  _,
  { input },
) => {
  const todo = await prisma.todo.update({
    data: {
      status: input.status ?? undefined,
      text: input.text ?? undefined,
    },
    where: { id: input.id },
  })
  return todo
}
