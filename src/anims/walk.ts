import { getTime } from "@/core/loop.ts";
import { tween } from "@/core/utils.ts";
import { animTime, animY } from "@/lib/entity.ts";

export function updateWalkAnimation(i: number) {
  animTime[i] += getTime();
  animY[i] = -1 * tween(100, animTime[i]);
}
