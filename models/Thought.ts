import { isArray, isString } from 'lodash-es'
import { z } from 'zod'
import { isEqualByD } from '../../utils/lodash'
import { getDuplicatesRefinement } from '../../utils/zod'
import { Id } from './Id'

export interface Thought {
  title: string
  children: Thought[]
}

export type ThoughtLike = Thought | string | [string] | [string, ThoughtLike[]]

export const ThoughtTitleSchema = z.string().min(1)

export const ThoughtSchema: z.ZodSchema<Thought> = z.lazy(() => z.object({
  title: ThoughtTitleSchema,
  children: z.array(ThoughtSchema),
}).describe('Thought'))

export const ThoughtsSchema = z.array(ThoughtSchema)
  .superRefine(getDuplicatesRefinement('Thought', validateThoughtUid))

export function validateThought(thought: Thought): Thought {
  return ThoughtSchema.parse(thought)
}

export function validateThoughts(thoughts: Thought[]): Thought[] {
  return ThoughtsSchema.parse(thoughts)
}

export function getThoughtUid(thought: Thought): Id {
  return thought.title
}

export const ThoughtUidSchema = z.object({
  title: ThoughtTitleSchema,
})

export type ThoughtUid = z.infer<typeof ThoughtUidSchema>

export function validateThoughtUid(thoughtUid: ThoughtUid): ThoughtUid {
  return ThoughtUidSchema.parse(thoughtUid)
}

export const isEqualThought = (a: Thought) => (b: Thought) => isEqualByD(a, b, validateThoughtUid)

export function thought(title: string, children: ThoughtLike[] = []): Thought {
  return validateThought({ title, children: children.map(thoughtLike) })
}

export function thoughtLikes(thoughtLikes: ThoughtLike[]) {
  return thoughtLikes.map(thoughtLike)
}

export function thoughtLike(t: ThoughtLike): Thought {
  if (isString(t)) {
    return thought(t)
  }
  if (isArray(t)) {
    const [title, children] = t
    return thought(title, children ?? [])
  }
  return validateThought(t)
}

/**
 * level starts at 0
 */
export const renderThoughtMDAtLevel = (level: number) => (t: Thought): string => {
  return [
    `${'  '.repeat(level)}* ${t.title}`,
    ...t.children.map(renderThoughtMDAtLevel(level + 1)),
  ].join('\n')
}

export const renderThoughtsMDAtLevel = (level: number) => (ts: Thought[]) => {
  return ts.map(renderThoughtMDAtLevel(level)).join('\n')
}

export const renderThoughtLikesMDAtLevel = (level: number) => (tls: ThoughtLike[]) => {
  return renderThoughtsMDAtLevel(level)(thoughtLikes(tls))
}

export const renderThoughtLikeMDAtLevel = (level: number) => (tl: ThoughtLike) => {
  return renderThoughtMDAtLevel(level)(thoughtLike(tl))
}

export const renderThoughtMD = renderThoughtMDAtLevel(0)

export const renderThoughtsMD = renderThoughtsMDAtLevel(0)

export const renderThoughtLikeMD = renderThoughtLikeMDAtLevel(0)

export const renderThoughtLikesMD = renderThoughtLikesMDAtLevel(0)

export const $t = thought

export const $tl = thoughtLike

export const $ts = thoughtLikes

export const $tmd = renderThoughtMD

export const $tsmd = renderThoughtsMD

export const $tlmd = renderThoughtLikeMD

export const $tlsmd = renderThoughtLikesMD
