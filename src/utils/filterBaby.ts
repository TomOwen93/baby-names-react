export function filterBabyInput(baby: string, input: string): boolean {
  if (baby.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
    return true;
  } else {
    return false;
  }
}
