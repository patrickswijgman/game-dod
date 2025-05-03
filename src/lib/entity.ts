import { Anim, anim, animScaleX, animScaleY, animTime, animX, animY } from "@/components/animation.ts";
import { isActive, Type, type } from "@/components/base.ts";
import { posX, posY } from "@/components/position.ts";
import { isFlipped } from "@/components/render.ts";
import { State, state, stateNext, stateTime } from "@/components/state.ts";
import { MAX_ENTITIES } from "@/consts.ts";

export function newEntity(t: Type, x: number, y: number) {
  const i = nextEntity();

  type[i] = t;

  posX[i] = x;
  posY[i] = y;

  state[i] = State.NONE;
  stateNext[i] = State.NONE;
  stateTime[i] = 0;

  anim[i] = Anim.NONE;
  animX[i] = 0;
  animY[i] = 0;
  animScaleX[i] = 1;
  animScaleY[i] = 1;
  animTime[i] = 0;

  isActive[i] = 1;
  isFlipped[i] = 0;

  return i;
}

function nextEntity() {
  for (let i = 0; i < MAX_ENTITIES; i++) {
    if (isActive[i] === 0) {
      return i;
    }
  }

  throw new Error("Out of entities :(");
}
