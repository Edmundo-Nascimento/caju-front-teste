export function formatData(value: string) {
  if (!value) return ""
  const [ano, mes, dia] = value.split('-');
  return `${dia}/${mes}/${ano}`;
}