import { z } from 'zod'
import { IANAZone } from 'luxon'

export const TimezoneSchema = z.string().refine(IANAZone.isValidZone)

export type Timezone = z.infer<typeof TimezoneSchema>
