export function reduceMap<V, T, K extends string | number = string>(
  array: Array<V>,
  selectKey: (value: V, index: number) => K,
  selectValue: (value: V, index: number) => T
) {
  return array.reduce((accumulate, element, index) => {
    const key = selectKey(element, index);
    const value = selectValue(element, index);
    accumulate[key] = value;
    return accumulate;
  }, {} as { [key in K]: T });
}
