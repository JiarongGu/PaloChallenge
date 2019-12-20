import { reduceMap } from './reduceMap';

export function reduceKeys<T>(keys: Array<string | number>, formatter: (key: string | number, index: number) => T) {
  return reduceMap(keys, key => key, formatter);
}
