export function tween(x: number) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

export function distance(x1: number, y1: number, x2: number, y2: number) {
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
}

export function basename(s: string, removeExtension = false) {
  const name = s.substring(s.lastIndexOf("/") + 1);
  return removeExtension ? name.substring(0, name.lastIndexOf(".")) : name;
}
