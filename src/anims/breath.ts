import { tween } from "@/core/utils.ts";
import { animScaleX, animScaleY, animTime } from "@/data/entity.ts";
import { tick } from "@/lib/timer.ts";

export function updateBreathAnimation(i: number) {
  tick(i, animTime, Infinity);
  animScaleX[i] = 1 + 0.1 * tween(animTime[i] / 2000);
  animScaleY[i] = 1 + 0.1 * tween(animTime[i] / 2000);
}
