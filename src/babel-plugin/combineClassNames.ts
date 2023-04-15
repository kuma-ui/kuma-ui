export function combineClassNames(
  existing: string | undefined = "",
  newClass: string | undefined = ""
) {
  if (!existing) {
    return newClass;
  }
  if (!newClass) {
    return existing;
  }
  return `${existing} ${newClass}`;
}
