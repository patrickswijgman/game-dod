import { getTime } from "@/core/loop.ts";

export function tick(i: number, t: Uint32Array, duration: number) {
  if (t[i] >= duration) {
    return false;
  }

  t[i] += getTime();

  return t[i] >= duration;
}
