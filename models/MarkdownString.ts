import { z } from 'zod'
import { getArraySchema } from 'libs/utils/zod'
import { isEqualSC } from 'libs/utils/lodash'
import { identity } from 'remeda'

export const MarkdownStringSchema = z.string().describe('MarkdownString')

export const MarkdownStringsSchema = getArraySchema(MarkdownStringSchema, identity)

export type MarkdownString = z.infer<typeof MarkdownStringSchema>

export const parseMarkdownString = (ms: MarkdownString): MarkdownString => MarkdownStringSchema.parse(ms)

export const parseMarkdownStrings = (mss: MarkdownString[]): MarkdownString[] => MarkdownStringsSchema.parse(mss)

export const isEqualMarkdownString = isEqualSC
