import { PrismaClient } from '@prisma/client'

export const context = {
  prisma: new PrismaClient(),
} as const

export type Context = typeof context
