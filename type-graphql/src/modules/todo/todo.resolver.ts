import { TodoStatus } from '@prisma/client'
import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql'
import { Service } from 'typedi'
import { TodoType } from './todo.model'
import { TodoService } from './todo.service'

@InputType()
class CreateTodoInput {
  @Field()
  text: string

  @Field((type) => TodoStatus, { nullable: true })
  status?: TodoStatus
}

@InputType()
class UpdateTodoInput {
  @Field((type) => ID)
  id: string

  @Field()
  text: string

  @Field((type) => TodoStatus, { nullable: true })
  status?: TodoStatus
}

@Service()
@Resolver(TodoType)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query((returns) => TodoType)
  async getTodo(@Arg('id') id: string): Promise<TodoType> {
    try {
      const todo = await this.todoService.get(id)
      return todo
    } catch (err) {
      console.error(err)
      throw new Error('Could not find todo')
    }
  }

  @Query((returns) => [TodoType])
  listTodos(): Promise<TodoType[]> {
    return this.todoService.list()
  }

  @Mutation((returns) => TodoType)
  createTodo(@Arg('input') input: CreateTodoInput): Promise<TodoType> {
    return this.todoService.create({ status: input.status, text: input.text })
  }

  @Mutation((returns) => TodoType)
  async updateTodo(@Arg('input') input: UpdateTodoInput) {
    return this.todoService.update(input.id, {
      status: input.status,
      text: input.text,
    })
  }

  @Mutation((returns) => TodoType)
  async deleteTodo(@Arg('id') id: string) {
    return this.todoService.delete(id)
  }
}
