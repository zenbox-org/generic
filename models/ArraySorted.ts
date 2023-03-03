import { z, ZodType } from 'zod'
import { ZodTypeDef } from 'zod/lib/types'
import { Comparator } from '../../utils/comparator'

export const SchemaArraySorted = <Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(schema: ZodType<Output, Def, Input>, comparator: Comparator<Output>) => z.array(schema).refine(a => a.sort(comparator)).brand('Ascending')

export const SchemaPairSorted = <Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(schema: ZodType<Output, Def, Input>, comparator: Comparator<Output>) => z.tuple([schema, schema]).refine(a => a.sort(comparator)).brand('Ascending')
