export function basename(s: string, removeExtension = false) {
  const name = s.substring(s.lastIndexOf("/") + 1);
  if (removeExtension) {
    return name.substring(0, name.lastIndexOf("."));
  }
  return name;
}

export function tween(t: number, duration: number): number {
  return 0.5 * (1 - Math.cos((Math.PI * (t % (2 * duration))) / duration));
}

export function distance(x1: number, y1: number, x2: number, y2: number) {
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
}
