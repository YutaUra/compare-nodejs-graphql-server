import { Injectable } from '@nestjs/common'
import type { TodoStatus } from '@prisma/client'
import { nanoid } from 'nanoid/async'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async get(id: string) {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id,
      },
    })
    return todo
  }

  async list() {
    const todos = await this.prisma.todo.findMany()
    return todos
  }

  async create(obj: { text: string; status: TodoStatus }) {
    return this.prisma.todo.create({
      data: {
        id: await nanoid(),
        status: obj.status,
        text: obj.text,
      },
    })
  }

  async update(obj: { id: string; text?: string; status?: TodoStatus }) {
    return this.prisma.todo.update({
      data: {
        status: obj.status,
        text: obj.text,
      },
      where: {
        id: obj.id,
      },
    })
  }

  async delete(id: string) {
    return this.prisma.todo.delete({
      where: {
        id,
      },
    })
  }
}
