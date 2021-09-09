export interface Operation<T> {
  execute(...params: any): T;
}
