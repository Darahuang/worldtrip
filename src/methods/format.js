export function dollarSignThousandth(dollar) {
  const el = new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', minimumFractionDigits: 0 }).format(dollar);
  return `TWD ${el}`;
}
export function date(time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString('zh-TW');
}
