import type { TodoStatus } from '@prisma/client'
import { Service } from 'typedi'
import { PrismaService } from '../prisma/prisma.service'
import { nanoid } from 'nanoid/async'

@Service()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async get(id: string) {
    return this.prisma.todo.findUniqueOrThrow({ where: { id } })
  }

  async list() {
    return this.prisma.todo.findMany()
  }

  async create(data: { text: string; status?: TodoStatus }) {
    return this.prisma.todo.create({
      data: {
        id: await nanoid(),
        status: data.status ?? 'TODO',
        text: data.text,
      },
    })
  }

  async update(id: string, data: { text?: string; status?: TodoStatus }) {
    return this.prisma.todo.update({
      data: {
        status: data.status,
        text: data.text,
      },
      where: { id: id },
    })
  }

  async delete(id: string) {
    return this.prisma.todo.delete({ where: { id } })
  }
}
