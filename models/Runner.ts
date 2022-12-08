import { todo } from 'libs/utils/todo'
import { every } from 'lodash-es'

export type Runner<Ctx, Res> = (context: Ctx) => Promise<Res>

export const TodoRunner = async () => todo()

export function isEveryFinished<Ctx, Val>(reports: { result: { isFinished: boolean } }[]) {
  return every(reports.map(r => r.result.isFinished))
}
