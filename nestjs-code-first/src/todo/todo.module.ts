import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { TodoResolver } from './todo.resolver'
import { TodoService } from './todo.service'

@Module({
  imports: [PrismaModule],
  providers: [TodoResolver, TodoService],
})
export class TodoModule {}
