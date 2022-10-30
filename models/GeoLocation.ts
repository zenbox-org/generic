import { z } from 'zod'
import { Id } from './Id'

export const GeoLocationSchema = z.object({
  lat: z.number(),
  lon: z.number(),
})

export type GeoLocation = z.infer<typeof GeoLocationSchema>

export function validateGeoLocation(location: GeoLocation) {
  return GeoLocationSchema.parse(location)
}

export function getGeoLocationUid(location: GeoLocation): Id {
  return JSON.stringify(location)
}
