/* eslint-disable unicorn/filename-case */
export interface Operation {
  execute(...params: unknown[]): unknown;
}
