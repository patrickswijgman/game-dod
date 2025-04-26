import { drawSprite } from "@/core/canvas.ts";
import { isDownHeld, isLeftHeld, isRightHeld, isUpHeld } from "@/core/input.ts";
import { Flag, newEntity, setFlag, Type, velX, velY, setEntityTransform } from "@/lib/entity.ts";
import { addEntity } from "@/lib/game.ts";
import { normalizeVector, resetVector, scaleVector } from "@/core/vector.ts";

export function newPlayer(x: number, y: number) {
  const i = newEntity(Type.PLAYER, x, y);
  setFlag(i, Flag.IS_PLAYER, true);
  addEntity(i);
  return i;
}

export function updatePlayer(i: number) {
  resetVector(i, velX, velY);

  if (isUpHeld) {
    velY[i] -= 1;
  }
  if (isDownHeld) {
    velY[i] += 1;
  }
  if (isLeftHeld) {
    velX[i] -= 1;
    setFlag(i, Flag.IS_FLIPPED, true);
  }
  if (isRightHeld) {
    velX[i] += 1;
    setFlag(i, Flag.IS_FLIPPED, false);
  }

  normalizeVector(i, velX, velY);
  scaleVector(i, velX, velY, 0.75);

  setEntityTransform(i, true);
  drawSprite(0, 16, 16, 16, 8, 15);
}
