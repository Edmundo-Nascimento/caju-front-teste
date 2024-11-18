export function removeCharacters(value: string) {
  if (!value) return
  return value.replace(/\D/g, '')
}