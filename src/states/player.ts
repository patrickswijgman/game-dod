import { isInputDown } from "@/core/input.ts";
import { Input } from "@/consts.ts";
import { seek } from "@/lib/steering.ts";
import { posX, posY } from "@/components/position.ts";
import { isFlipped } from "@/components/render.ts";
import { Anim, setAnimation } from "@/components/animation.ts";

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
    isFlipped[i] = 1;
  }
  if (isInputDown(Input.RIGHT)) {
    x += 1;
    isFlipped[i] = 0;
  }

  if (seek(i, x, y, 0.75)) {
    setAnimation(i, Anim.WALK);
  } else {
    setAnimation(i, Anim.BREATH);
  }
}
