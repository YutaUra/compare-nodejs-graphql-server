import type { DateTimeResolvers } from '../../generate/graphql'

export const isoResolver: DateTimeResolvers['iso'] = (date) => {
  return date.toISOString()
}
