import { InputType, PickType } from '@nestjs/graphql'
import { TodoCreateInput } from 'src/generated/todo/todo-create.input'

@InputType()
export class CreateTodoInput extends PickType(TodoCreateInput, [
  'text',
  'status',
]) {}
