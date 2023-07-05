export function filterBabyInput(baby: string, input: string): boolean {
  if (baby.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
    return true;
  } else {
    return false;
  }
}

export function filterBabyId(babyid: number, id: number): boolean {
  if (babyid !== id) {
    return true;
  } else {
    return false;
  }
}
