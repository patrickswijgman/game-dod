import { time } from "@/core/loop.ts";
import { tween } from "@/core/utils.ts";
import { animScaleX, animScaleY, animTime } from "@/lib/entity.ts";

export function updateBreathAnimation(i: number) {
  animTime[i] += time;
  animScaleX[i] = 1 + 0.1 * tween(2000, animTime[i]);
  animScaleY[i] = 1 + 0.1 * tween(2000, animTime[i]);
}
