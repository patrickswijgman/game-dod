import { MAX_ENTITIES } from "@/consts.ts";
import { addCameraTransform } from "@/core/camera.ts";
import { resetTransform, scaleTransform, translateTransform } from "@/core/canvas.ts";

export const enum Type {
  NONE,
  PLAYER,
}

export const enum Flag {
  ACTIVE = 1 << 0,
  FLIPPED = 1 << 1,
}

export const enum State {
  NONE,
  PLAYER,
}

export const enum Anim {
  NONE,
  BREATH,
  WALK,
}

export const type = new Uint8Array(MAX_ENTITIES);
export const posX = new Float32Array(MAX_ENTITIES);
export const posY = new Float32Array(MAX_ENTITIES);
export const state = new Uint8Array(MAX_ENTITIES);
export const stateNext = new Uint8Array(MAX_ENTITIES);
export const stateTime = new Uint32Array(MAX_ENTITIES);
export const anim = new Uint8Array(MAX_ENTITIES);
export const animX = new Float32Array(MAX_ENTITIES);
export const animY = new Float32Array(MAX_ENTITIES);
export const animScaleX = new Float32Array(MAX_ENTITIES);
export const animScaleY = new Float32Array(MAX_ENTITIES);
export const animTime = new Uint32Array(MAX_ENTITIES);
export const flags = new Uint32Array(MAX_ENTITIES);

// TODO on entity clear/remove set freeIdx
// let freeIdx = 0;

export function newEntity(t: Type, x: number, y: number) {
  const i = nextEntity();
  type[i] = t;
  posX[i] = x;
  posY[i] = y;
  state[i] = State.NONE;
  stateNext[i] = State.NONE;
  stateTime[i] = 0;
  anim[i] = Anim.NONE;
  animX[i] = 0;
  animY[i] = 0;
  animScaleX[i] = 1;
  animScaleY[i] = 1;
  animTime[i] = 0;
  flags[i] = Flag.ACTIVE;
  return i;
}

export function setState(i: number, s: State) {
  stateNext[i] = s;
}

export function transitionState(i: number) {
  state[i] = stateNext[i];
  stateTime[i] = 0;
  setAnimation(i, Anim.NONE);
}

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

export function setEntityTransform(i: number, inWorld: boolean) {
  resetTransform();
  if (inWorld) {
    addCameraTransform();
  }
  translateTransform(posX[i], posY[i]);
  if (anim[i]) {
    translateTransform(animX[i], animY[i]);
    scaleTransform(animScaleX[i], animScaleY[i]);
  }
  if (isFlag(i, Flag.FLIPPED)) {
    scaleTransform(-1, 1);
  }
}

export function setFlag(i: number, flag: Flag, enabled: boolean) {
  if (enabled) {
    flags[i] |= flag;
  } else {
    flags[i] &= ~flag;
  }
}

export function isFlag(i: number, flag: Flag) {
  return (flags[i] & flag) !== 0;
}

function nextEntity() {
  for (let i = 0; i < MAX_ENTITIES; i++) {
    if (!isFlag(i, Flag.ACTIVE)) {
      return i;
    }
  }

  throw new Error("Out of entities :(");
}
