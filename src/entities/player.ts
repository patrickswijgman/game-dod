import { drawSprite } from "@/core/canvas.ts";
import { Flag, newEntity, setFlag, Type, velX, velY, setEntityTransform, setAnimation, Anim } from "@/lib/entity.ts";
import { addEntity } from "@/lib/game.ts";
import { getVectorLength, normalizeVector, resetVector, scaleVector } from "@/core/vector.ts";
import { Input, isInputDown } from "@/core/input.ts";

export function newPlayer(x: number, y: number) {
  const i = newEntity(Type.PLAYER, x, y);
  setFlag(i, Flag.IS_PLAYER, true);
  addEntity(i);
  return i;
}

export function updatePlayer(i: number) {
  resetVector(i, velX, velY);

  if (isInputDown(Input.UP)) {
    velY[i] -= 1;
  }
  if (isInputDown(Input.DOWN)) {
    velY[i] += 1;
  }
  if (isInputDown(Input.LEFT)) {
    velX[i] -= 1;
    setFlag(i, Flag.IS_FLIPPED, true);
  }
  if (isInputDown(Input.RIGHT)) {
    velX[i] += 1;
    setFlag(i, Flag.IS_FLIPPED, false);
  }

  normalizeVector(i, velX, velY);
  scaleVector(i, velX, velY, 0.75);

  if (getVectorLength(i, velX, velY)) {
    setAnimation(i, Anim.WALK);
  } else {
    setAnimation(i, Anim.BREATH);
  }

  setEntityTransform(i, true);
  drawSprite(0, 16, 16, 16, 8, 15);
}
