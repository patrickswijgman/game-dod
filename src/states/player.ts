import { Flag, setFlag, setAnimation, Anim, posX, posY } from "@/data/entity.ts";
import { isInputDown } from "@/core/input.ts";
import { Input } from "@/consts.ts";
import { getDelta } from "@/core/loop.ts";
import { distance } from "@/core/utils.ts";

export function updatePlayerState(i: number) {
  let velX = 0;
  let velY = 0;

  if (isInputDown(Input.UP)) {
    velY -= 1;
  }
  if (isInputDown(Input.DOWN)) {
    velY += 1;
  }
  if (isInputDown(Input.LEFT)) {
    velX -= 1;
    setFlag(i, Flag.FLIPPED, true);
  }
  if (isInputDown(Input.RIGHT)) {
    velX += 1;
    setFlag(i, Flag.FLIPPED, false);
  }

  const v = distance(0, 0, velX, velY);
  if (v) {
    velX = (velX / v) * 0.75;
    velY = (velY / v) * 0.75;
    posX[i] += velX * getDelta();
    posY[i] += velY * getDelta();
    setAnimation(i, Anim.WALK);
  } else {
    setAnimation(i, Anim.BREATH);
  }
}
