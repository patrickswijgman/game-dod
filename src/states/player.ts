import { Flag, setFlag, setAnimation, Anim, posX, posY } from "@/data/entity.ts";
import { isInputDown } from "@/core/input.ts";
import { Input } from "@/consts.ts";
import { seek } from "@/lib/steering.ts";

export function updatePlayerState(i: number) {
  let x = posX[i];
  let y = posY[i];

  if (isInputDown(Input.UP)) {
    y -= 1;
  }
  if (isInputDown(Input.DOWN)) {
    y += 1;
  }
  if (isInputDown(Input.LEFT)) {
    x -= 1;
    setFlag(i, Flag.FLIPPED, true);
  }
  if (isInputDown(Input.RIGHT)) {
    x += 1;
    setFlag(i, Flag.FLIPPED, false);
  }

  if (seek(i, x, y, 0.75)) {
    setAnimation(i, Anim.WALK);
  } else {
    setAnimation(i, Anim.BREATH);
  }
}
