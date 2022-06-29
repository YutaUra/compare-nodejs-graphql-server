import type { DateTimeResolvers } from '../../generate/graphql'
import { isoResolver } from './iso'

export const DateTimeResolver: DateTimeResolvers = {
  iso: isoResolver,
}
