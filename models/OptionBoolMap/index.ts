import { boolean, map, ZodSchema } from 'zod'
import { ZodTypeDef } from 'zod/lib/types'

export const OptionBoolMap = <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(key: ZodSchema<Output, Def, Input>) => {
  return map(key, boolean().optional())
}
