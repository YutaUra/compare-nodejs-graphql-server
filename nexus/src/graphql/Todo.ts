import { TodoStatus } from '@prisma/client'
import {
  enumType,
  extendType,
  idArg,
  inputObjectType,
  nonNull,
  objectType,
} from 'nexus'
import { nanoid } from 'nanoid/async'
import { DateScalar } from './Date'

const TodoStatusType = enumType({
  members: TodoStatus,
  name: 'TodoStatus',
})

export const Todo = objectType({
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('text')
    t.nonNull.field('status', { type: TodoStatusType })
    t.nonNull.field('createdAt', { type: DateScalar })
    t.nonNull.field('updatedAt', { type: DateScalar })
  },
  name: 'Todo',
})

export const TodoQuery = extendType({
  definition(t) {
    t.nonNull.field('getTodo', {
      args: {
        id: nonNull(idArg()),
      },
      resolve: async (_root, { id }, { prisma }) => {
        const todo = await prisma.todo.findUniqueOrThrow({ where: { id } })
        return todo
      },
      type: Todo,
    })

    t.nonNull.list.nonNull.field('listTodos', {
      resolve: async (_root, _args, { prisma }) => {
        const todo = await prisma.todo.findMany()
        return todo
      },
      type: Todo,
    })
  },
  type: 'Query',
})

const CreateTodoInput = inputObjectType({
  definition(t) {
    t.nonNull.string('text')
    t.field('status', { type: TodoStatusType })
  },
  name: 'CreateTodoInput',
})

const UpdateTodoInput = inputObjectType({
  definition(t) {
    t.nonNull.string('id')
    t.string('text')
    t.field('status', { type: TodoStatusType })
  },
  name: 'UpdateTodoInput',
})

export const TodoMutation = extendType({
  definition(t) {
    t.nonNull.field('createTodo', {
      args: { input: nonNull(CreateTodoInput) },
      async resolve(_root, { input }, { prisma }) {
        const todo = await prisma.todo.create({
          data: {
            id: await nanoid(),
            status: input.status ?? TodoStatus.TODO,
            text: input.text,
          },
        })
        return todo
      },
      type: Todo,
    })

    t.nonNull.field('updateTodo', {
      args: { input: nonNull(UpdateTodoInput) },
      async resolve(_root, { input }, { prisma }) {
        const todo = await prisma.todo.update({
          data: {
            status: input.status ?? undefined,
            text: input.text ?? undefined,
          },
          where: { id: input.id },
        })
        return todo
      },
      type: Todo,
    })

    t.nonNull.field('deleteTodo', {
      args: { id: nonNull(idArg()) },
      async resolve(_root, { id }, { prisma }) {
        const todo = await prisma.todo.delete({ where: { id } })
        return todo
      },
      type: Todo,
    })
  },
  type: 'Mutation',
})
