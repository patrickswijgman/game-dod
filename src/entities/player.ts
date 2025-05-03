import { drawRect } from "@/core/canvas.ts";
import { newEntity, setEntityTransform, setState, State, Type } from "@/data/entity.ts";
import { addEntity, setPlayer } from "@/data/game.ts";

export function newPlayer(x: number, y: number) {
  const i = newEntity(Type.PLAYER, x, y);
  setState(i, State.PLAYER);
  setPlayer(i);
  addEntity(i);
  return i;
}

export function renderPlayer(i: number) {
  setEntityTransform(i, true);
  drawRect(-4, -10, 8, 10, "blue", true);
}
