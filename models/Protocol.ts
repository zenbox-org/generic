import { z } from 'zod'

export const ProtocolSchema = z.enum([
  'http',
  'https',
  'mailto',
  'tel',
  'tg', // Telegram
  'skype',
])

// export const { http, https, mailto, tel, tg } = ProtocolSchema.enum

export type Protocol = z.infer<typeof ProtocolSchema>
