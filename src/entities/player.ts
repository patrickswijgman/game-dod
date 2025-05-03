import { Type } from "@/components/base.ts";
import { setEntityTransform } from "@/components/render.ts";
import { setState, State } from "@/components/state.ts";
import { drawRect } from "@/core/canvas.ts";
import { addEntity, setPlayer } from "@/data/game.ts";
import { newEntity } from "@/lib/entity.ts";

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
