import { drawSprite } from "@/core/canvas.ts";
import { Flag, newEntity, setEntityTransform, setFlag, setState, State, Type } from "@/data/entity.ts";
import { addEntity, setPlayer } from "@/data/game.ts";

export function newPlayer(x: number, y: number) {
  const i = newEntity(Type.PLAYER, x, y);
  setFlag(i, Flag.PLAYER, true);
  setState(i, State.PLAYER);
  setPlayer(i);
  addEntity(i);
  return i;
}

export function renderPlayer(i: number) {
  setEntityTransform(i, true);
  drawSprite(0, 16, 16, 16, 8, 15);
}
