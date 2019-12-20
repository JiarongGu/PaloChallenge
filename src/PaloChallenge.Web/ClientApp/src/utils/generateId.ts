export function generateId() {
  const part1 = Date.now().toString(34);
  const part2 = Math.random()
    .toString(34)
    .replace('0.', '');
  return `${part1}${part2}`.toUpperCase();
}
