import { z } from 'zod'
import { ascending } from '../../../../utils/comparator'
import { compareArraysByLength } from '../../Array.comparators'
import { SchemaArraySorted } from '../../ArraySorted'

export const SchemaArrayArrayStringSortedAscendingByLength = SchemaArraySorted(z.array(z.string()), ascending(compareArraysByLength))

export type ArrayArrayStringSortedAscendingByLength = z.infer<typeof SchemaArrayArrayStringSortedAscendingByLength>
