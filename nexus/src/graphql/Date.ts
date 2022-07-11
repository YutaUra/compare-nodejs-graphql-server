import { scalarType } from 'nexus'
import { Kind } from 'graphql'

export const DateScalar = scalarType<'Date'>({
  asNexusMethod: 'date',
  description: 'Date custom scalar type',
  name: 'Date',
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }
    return null
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value)
    }
    return null
  },
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString()
    }
    return null
  },
})
