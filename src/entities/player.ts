import { g_sprite } from "@/core/canvas.ts";
import { isDownHeld, isLeftHeld, isRightHeld, isUpHeld } from "@/core/input.ts";
import { Flag, e_new, e_setFlag, Type, e_velX, e_velY, e_translate } from "@/lib/entity.ts";
import { addEntity } from "@/lib/game.ts";
import { v_normalize, v_reset, v_scale } from "@/core/vector.ts";

export function e_newPlayer(x: number, y: number) {
  const i = e_new(Type.PLAYER, x, y);
  e_setFlag(i, Flag.IS_PLAYER, true);
  addEntity(i);
  return i;
}

export function e_updatePlayer(i: number) {
  v_reset(i, e_velX, e_velY);

  if (isUpHeld) {
    e_velY[i] -= 1;
  }
  if (isDownHeld) {
    e_velY[i] += 1;
  }
  if (isLeftHeld) {
    e_velX[i] -= 1;
    e_setFlag(i, Flag.IS_FLIPPED, true);
  }
  if (isRightHeld) {
    e_velX[i] += 1;
    e_setFlag(i, Flag.IS_FLIPPED, false);
  }

  v_normalize(i, e_velX, e_velY);
  v_scale(i, e_velX, e_velY, 0.75);

  e_translate(i, true);
  g_sprite(0, 16, 16, 16, 8, 15);
}
