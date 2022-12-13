import { IANAZone } from 'luxon'
import { z } from 'zod'

export const TimezoneSchema = z.string().refine(IANAZone.isValidZone)

export type Timezone = z.infer<typeof TimezoneSchema>
