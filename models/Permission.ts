import { IdSchema } from 'libs/generic/models/Id'
import { NotesSchema } from 'libs/generic/models/Notes'
import { isEqualBy } from 'zenbox-util/lodash'
import { getArraySchema } from 'zenbox-util/zod'
import { z } from 'zod'

export const PermissionSchema = z.object({
  id: IdSchema,
  notes: NotesSchema,
}).describe('Permission')

export const PermissionsSchema = getArraySchema(PermissionSchema, parsePermissionUid)

export const PermissionUidSchema = PermissionSchema.pick({
  id: true,
})

export type Permission = z.infer<typeof PermissionSchema>

export type PermissionUid = z.infer<typeof PermissionUidSchema>

export function parsePermission(permission: Permission): Permission {
  return PermissionSchema.parse(permission)
}

export function parsePermissions(permissions: Permission[]): Permission[] {
  return PermissionsSchema.parse(permissions)
}

export function parsePermissionUid(permissionUid: PermissionUid): PermissionUid {
  return PermissionUidSchema.parse(permissionUid)
}

export const isEqualPermission = (a: Permission) => (b: Permission) => isEqualBy(a, b, parsePermissionUid)
