export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}
