import { NotesSchema } from 'libs/generic/models/Notes'
import { isEqualByDC } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import { GeoLocationSchema } from '../GeoLocation'
import { NaturalNumberSchema } from '../NaturalNumber'

export const AreaSchema = z.object({
  center: GeoLocationSchema,
  radius: NaturalNumberSchema, // in meters
  notes: NotesSchema,
}).describe('Area')

export const AreaUidSchema = AreaSchema.pick({

})

export const AreasSchema = getArraySchema(AreaSchema, parseAreaUid)

export type Area = z.infer<typeof AreaSchema>

export type AreaUid = z.infer<typeof AreaUidSchema>

export function parseArea(area: Area): Area {
  return AreaSchema.parse(area)
}

export function parseAreas(areas: Area[]): Area[] {
  return AreasSchema.parse(areas)
}

export function parseAreaUid(areaUid: AreaUid): AreaUid {
  return AreaUidSchema.parse(areaUid)
}

export const isEqualArea = isEqualByDC(parseAreaUid)
