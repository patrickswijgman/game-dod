import { addAnimationTransform } from "@/components/animation.ts";
import { Type } from "@/components/base.ts";
import { setEntityTransform } from "@/components/render.ts";
import { setState, State } from "@/components/state.ts";
import { SHADOW_ALPHA, Texture } from "@/consts.ts";
import { drawSprite, setAlpha } from "@/core/canvas.ts";
import { addEntity } from "@/data/game.ts";
import { newEntity } from "@/lib/entity.ts";

export function newPlayer(x: number, y: number) {
  const i = newEntity(Type.PLAYER, x, y);
  setState(i, State.PLAYER);
  addEntity(i);
  return i;
}

export function renderPlayer(i: number) {
  setEntityTransform(i, true);
  setAlpha(SHADOW_ALPHA);
  drawSprite(Texture.ATLAS, 0, 32, 16, 16, 8, 13);
  setAlpha(1);
  addAnimationTransform(i);
  drawSprite(Texture.ATLAS, 0, 16, 16, 16, 8, 15);
}
