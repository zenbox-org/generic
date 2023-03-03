import { z } from 'zod'
import { descending } from '../../../../utils/comparator'
import { compareNumerals } from '../../../../utils/numeral/sort'
import { SchemaArraySorted } from '../../ArraySorted'

export const SchemaArrayNumberSortedDescending = SchemaArraySorted(z.number(), descending(compareNumerals))

export type ArrayNumberSortedDescending = z.infer<typeof SchemaArrayNumberSortedDescending>
