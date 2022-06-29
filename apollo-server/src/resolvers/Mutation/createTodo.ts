import { nanoid } from 'nanoid/async'
import type { MutationResolvers } from '../../generate/graphql'
import { TodoStatus } from '../../generate/graphql'
import { prisma } from '../../repository/prisma'

export const createTodoResolver: MutationResolvers['createTodo'] = async (
  _,
  { input },
) => {
  const todo = await prisma.todo.create({
    data: {
      id: await nanoid(),
      status: input.status ?? TodoStatus.TODO,
      text: input.text,
    },
  })
  return todo
}
