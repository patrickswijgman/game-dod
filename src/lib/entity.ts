import { addCameraTransform } from "@/core/camera.ts";
import { resetTransform, scaleTransform, translateTransform } from "@/core/canvas.ts";

export const enum Type {
  NONE,
  PLAYER,
}

export const enum Flag {
  IS_ACTIVE = 1 << 0,
  IS_PLAYER = 1 << 1,
  IS_FLIPPED = 1 << 2,
}

const MAX_ENTITIES = 2048;

export const type = new Uint8Array(MAX_ENTITIES);
export const posX = new Float32Array(MAX_ENTITIES);
export const posY = new Float32Array(MAX_ENTITIES);
export const velX = new Float32Array(MAX_ENTITIES);
export const velY = new Float32Array(MAX_ENTITIES);
export const flags = new Uint32Array(MAX_ENTITIES);

export function newEntity(t: Type, x: number, y: number) {
  const i = nextEntity();
  type[i] = t;
  posX[i] = x;
  posY[i] = y;
  velX[i] = 0;
  velY[i] = 0;
  flags[i] = Flag.IS_ACTIVE;
  return i;
}

export function setEntityTransform(i: number, cam: boolean) {
  resetTransform();
  if (cam) {
    addCameraTransform();
  }
  translateTransform(posX[i], posY[i]);
  if (isFlag(i, Flag.IS_FLIPPED)) {
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
    if (!isFlag(i, Flag.IS_ACTIVE)) {
      return i;
    }
  }
  throw new Error("Out of entities :(");
}
