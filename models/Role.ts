import { isEqualByD } from 'zenbox-util/lodash'
import { getArraySchema } from 'zenbox-util/zod'
import { z } from 'zod'
import { PermissionsSchema } from './Permission'
import { PersonSchema } from './Person'

export const RoleSchema = z.object({
  person: PersonSchema,
  permissions: PermissionsSchema,
}).describe('Role')

export const RoleUidSchema = RoleSchema.pick({

})

export const RolesSchema = getArraySchema(RoleSchema, parseRoleUid)

export type Role = z.infer<typeof RoleSchema>

export type RoleUid = z.infer<typeof RoleUidSchema>

export function parseRole(role: Role): Role {
  return RoleSchema.parse(role)
}

export function parseRoles(roles: Role[]): Role[] {
  return RolesSchema.parse(roles)
}

export function parseRoleUid(roleUid: RoleUid): RoleUid {
  return RoleUidSchema.parse(roleUid)
}

export const isEqualRole = (a: Role) => (b: Role) => isEqualByD(a, b, parseRoleUid)
