import { Flag, newEntity, setFlag, setState, State, Type } from "@/lib/entity.ts";
import { addEntity } from "@/lib/game.ts";

export function newPlayer(x: number, y: number) {
  const i = newEntity(Type.PLAYER, x, y);
  setFlag(i, Flag.IS_PLAYER, true);
  setState(i, State.PLAYER);
  addEntity(i);
  return i;
}
