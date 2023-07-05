export function compareBaby(
  a: { name: string },
  b: { name: string }
): -1 | 0 | 1 {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  } else {
    return 0;
  }
}
