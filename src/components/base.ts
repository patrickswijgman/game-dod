import { MAX_ENTITIES } from "@/consts.ts";

export const enum Type {
  NONE,
  PLAYER,
}

export const type = new Uint8Array(MAX_ENTITIES);
export const isActive = new Uint8Array(MAX_ENTITIES);
