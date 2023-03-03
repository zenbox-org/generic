import { z } from 'zod'
import { ascending } from '../../../../utils/comparator'
import { compareNumerals } from '../../../../utils/numeral/sort'
import { SchemaArraySorted } from '../../ArraySorted'

export const SchemaArrayNumberSortedAscending = SchemaArraySorted(z.number(), ascending(compareNumerals))

export type ArrayNumberSortedAscending = z.infer<typeof SchemaArrayNumberSortedAscending>
