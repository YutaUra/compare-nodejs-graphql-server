import { Field, ID, InputType, PickType } from '@nestjs/graphql'
import { TodoUpdateInput } from 'src/generated/todo/todo-update.input'

@InputType()
export class UpdateTodoInput extends PickType(TodoUpdateInput, [
  'text',
  'status',
]) {
  @Field(() => ID)
  id: string
}
