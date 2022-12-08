import { z } from 'zod'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { identity } from 'lodash-es'

export const AbsolutePathSchema = z.string().regex(new RegExp('^(/[^\\s/]+)+$')).describe('AbsolutePath')

export const AbsolutePathsSchema = z.array(AbsolutePathSchema)
  .superRefine(getDuplicatesRefinement('AbsolutePath', identity))

export type AbsolutePath = z.infer<typeof AbsolutePathSchema>

export function parseAbsolutePath(absolutePath: AbsolutePath): AbsolutePath {
  return AbsolutePathSchema.parse(absolutePath)
}

export function parseAbsolutePaths(absolutePaths: AbsolutePath[]): AbsolutePath[] {
  return AbsolutePathsSchema.parse(absolutePaths)
}

export const isEqualAbsolutePath = (a: AbsolutePath) => (b: AbsolutePath) => a === b
