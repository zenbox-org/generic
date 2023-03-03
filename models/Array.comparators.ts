import { compareNumeralsBy } from '../../utils/numeral/sort'
import { getLength } from './Array'

export const compareArraysByLength = compareNumeralsBy(getLength)
