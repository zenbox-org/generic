/* eslint-disable @typescript-eslint/no-explicit-any */
import { z, ZodAny, ZodFunction, ZodTuple } from 'zod'

export type GenericFunctionRaw = (...args: any[]) => any

const GenericFunctionLazySchema: z.ZodType<GenericFunctionRaw> = z.lazy(() => z.function(z.tuple([z.any()]).rest(z.any()), z.any()))

export type GenericFunctionLazy = z.infer<typeof GenericFunctionLazySchema>

export const GenericFunctionSchema = z.function(z.tuple([z.any()]).rest(z.any()), z.any())

export type GenericFunction = z.infer<typeof GenericFunctionSchema>

export type ZodGenericFunction = ZodFunction<ZodTuple<[ZodAny], ZodAny>, ZodAny>
