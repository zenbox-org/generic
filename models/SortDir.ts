import { getDuplicatesRefinement } from 'libs/utils/zod'
import { identity } from 'remeda'
import { z } from 'zod'

export const SortDirSchema = z.enum(['ASC', 'DESC']).describe('SortDir')

export const { ASC, DESC } = SortDirSchema.enum

export const SortDirsSchema = z.array(SortDirSchema)
  .superRefine(getDuplicatesRefinement('SortDir', identity))

export type SortDir = z.infer<typeof SortDirSchema>

export function parseSortDir(sortDir: SortDir): SortDir {
  return SortDirSchema.parse(sortDir)
}

export function parseSortDirs(sortDirs: SortDir[]): SortDir[] {
  return SortDirsSchema.parse(sortDirs)
}

export const isEqualSortDir = (a: SortDir) => (b: SortDir) => a === b
