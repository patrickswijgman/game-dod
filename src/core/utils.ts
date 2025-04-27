export function tween(duration: number, elapsed: number): number {
  return 0.5 * (1 - Math.cos((Math.PI * (elapsed % (2 * duration))) / duration));
}

export function pythagoras(a: number, b: number) {
  return Math.sqrt(a * a + b * b);
}

export function distance(x1: number, y1: number, x2: number, y2: number) {
  return pythagoras(x2 - x1, y2 - y1);
}

export function basename(s: string, removeExtension = false) {
  const name = s.substring(s.lastIndexOf("/") + 1);
  if (removeExtension) {
    return name.substring(0, name.lastIndexOf("."));
  }
  return name;
}
