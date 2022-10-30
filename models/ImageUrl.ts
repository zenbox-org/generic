import { z } from 'zod'
import { UrlSchema } from './Url'

export const ImageUrlSchema = UrlSchema

export type ImageUrl = z.infer<typeof ImageUrlSchema>
