import { boolean, record, ZodSchema } from 'zod'
import { ZodTypeDef } from 'zod/lib/types'

type RecordKey = string | number | symbol

export const OptionBoolRecord = <Def extends ZodTypeDef = ZodTypeDef>(key: ZodSchema<RecordKey, Def, RecordKey>) => {
  return record(key, boolean().optional(), {})
}
