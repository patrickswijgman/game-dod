import { animTime, animY } from "@/components/animation.ts";
import { tween } from "@/core/utils.ts";
import { tick } from "@/lib/timer.ts";

export function updateWalkAnimation(i: number) {
  tick(i, animTime, Infinity);
  animY[i] = -1 * tween(animTime[i] / 100);
}
