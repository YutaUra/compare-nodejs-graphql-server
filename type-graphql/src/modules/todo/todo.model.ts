import { TodoStatus } from '@prisma/client'
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql'

registerEnumType(TodoStatus, { name: 'TodoStatus' })

@ObjectType()
export class TodoType {
  @Field((type) => ID)
  id: string

  @Field((type) => TodoStatus)
  status: TodoStatus

  @Field()
  text: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
