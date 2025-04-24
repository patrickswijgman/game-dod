import { cam_translate } from "@/core/camera.ts";
import { xf_reset, xf_scale, xf_translate } from "@/core/canvas.ts";

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

export const e_type = new Uint8Array(MAX_ENTITIES);
export const e_x = new Float32Array(MAX_ENTITIES);
export const e_y = new Float32Array(MAX_ENTITIES);
export const e_velX = new Float32Array(MAX_ENTITIES);
export const e_velY = new Float32Array(MAX_ENTITIES);
export const e_flags = new Uint32Array(MAX_ENTITIES);

export function e_set(i: number, active: boolean) {
  e_type[i] = 0;
  e_x[i] = 0;
  e_y[i] = 0;
  e_velX[i] = 0;
  e_velY[i] = 0;
  e_flags[i] = 0;
  e_setFlag(i, Flag.IS_ACTIVE, active);
}

export function e_new(t: Type, x: number, y: number) {
  const i = e_next();
  e_set(i, true);
  e_type[i] = t;
  e_x[i] = x;
  e_y[i] = y;
  return i;
}

export function e_translate(i: number, cam: boolean) {
  xf_reset();
  if (cam) {
    cam_translate();
  }
  xf_translate(e_x[i], e_y[i]);
  if (e_isFlag(i, Flag.IS_FLIPPED)) {
    xf_scale(-1, 1);
  }
}

export function e_setFlag(i: number, flag: Flag, enabled: boolean) {
  if (enabled) {
    e_flags[i] |= flag;
  } else {
    e_flags[i] &= ~flag;
  }
}

export function e_isFlag(i: number, flag: Flag) {
  return (e_flags[i] & flag) !== 0;
}

function e_next() {
  for (let i = 0; i < MAX_ENTITIES; i++) {
    if (!e_isFlag(i, Flag.IS_ACTIVE)) {
      return i;
    }
  }
  throw new Error("Out of entities :(");
}
