import { isEqualSC } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { identity } from 'remeda'
import { z } from 'zod'

export const SeedSchema = z.number().describe('Seed')

export const SeedsSchema = getArraySchema(SeedSchema, identity)

export type Seed = z.infer<typeof SeedSchema>

export const parseSeed = (seed: Seed): Seed => SeedSchema.parse(seed)

export const parseSeeds = (seeds: Seed[]): Seed[] => SeedsSchema.parse(seeds)

export const isEqualSeed = isEqualSC
