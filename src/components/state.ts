import { Anim, setAnimation } from "@/components/animation.ts";
import { MAX_ENTITIES } from "@/consts.ts";

export const enum State {
  NONE,
  PLAYER,
}

export const state = new Uint8Array(MAX_ENTITIES);
export const stateNext = new Uint8Array(MAX_ENTITIES);
export const stateTime = new Uint32Array(MAX_ENTITIES);

export function setState(i: number, s: State) {
  stateNext[i] = s;
}

export function transitionState(i: number) {
  state[i] = stateNext[i];
  stateTime[i] = 0;
  setAnimation(i, Anim.NONE);
}
