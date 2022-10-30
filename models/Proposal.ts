import { z } from 'zod'

/**
 * NOTE: Use events instead of statuses + automatic event creation
 */

export const ProposalStatusSchema = z.enum(['Accepted', 'Rejected'])

export const ProposalSchema = z.object({
  status: ProposalStatusSchema.nullable(),
  iteration: z.number().positive(),
})

export type ProposalStatus = z.infer<typeof ProposalStatusSchema>
