import { MAX_ENTITIES } from "@/consts.ts";

export const enum Anim {
  NONE,
  BREATH,
  WALK,
}

export const anim = new Uint8Array(MAX_ENTITIES);
export const animX = new Float32Array(MAX_ENTITIES);
export const animY = new Float32Array(MAX_ENTITIES);
export const animScaleX = new Float32Array(MAX_ENTITIES);
export const animScaleY = new Float32Array(MAX_ENTITIES);
export const animTime = new Uint32Array(MAX_ENTITIES);

export function setAnimation(i: number, a: Anim) {
  if (a !== anim[i]) {
    anim[i] = a;
    animX[i] = 0;
    animY[i] = 0;
    animScaleX[i] = 1;
    animScaleY[i] = 1;
    animTime[i] = 0;
  }
}
