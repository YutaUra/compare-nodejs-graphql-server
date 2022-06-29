import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Todo } from '../generated/todo/todo.model'
import { CreateTodoInput } from './models/create-todo.input'
import { UpdateTodoInput } from './models/update-todo.input'
import { TodoService } from './todo.service'

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => Todo)
  async getTodo(@Args('id', { type: () => ID }) id: string): Promise<Todo> {
    const todo = await this.todoService.get(id)
    if (!todo) {
      throw new Error('Todo not found')
    }
    return todo
  }

  @Query(() => [Todo])
  async listTodos(): Promise<Todo[]> {
    const todos = await this.todoService.list()
    return todos
  }

  @Mutation(() => Todo)
  async createTodo(@Args('input') input: CreateTodoInput): Promise<Todo> {
    const todo = await this.todoService.create(input)
    return todo
  }

  @Mutation(() => Todo)
  async updateTodo(@Args('input') input: UpdateTodoInput): Promise<Todo> {
    const todo = await this.todoService.update(input)
    return todo
  }

  @Mutation(() => Todo)
  async deleteTodo(@Args('id', { type: () => ID }) id: string): Promise<Todo> {
    const todo = await this.todoService.delete(id)
    return todo
  }
}
