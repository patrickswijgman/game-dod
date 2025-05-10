import { remove } from "@/core/utils.ts";

export const entities: Array<number> = [];
export const destroyed: Array<number> = [];

export function addEntity(i: number) {
  entities.push(i);
}

export function destroyEntity(i: number) {
  destroyed.push(i);
}

export function cleanupDestroyedEntities() {
  if (!destroyed.length) {
    return;
  }

  for (const i of destroyed) {
    remove(entities, i);
  }

  destroyed.length = 0;
}
