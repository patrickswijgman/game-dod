import { anim, animScaleX, animScaleY, animX, animY } from "@/components/animation.ts";
import { posX, posY } from "@/components/position.ts";
import { MAX_ENTITIES } from "@/consts.ts";
import { addCameraTransform } from "@/core/camera.ts";
import { resetTransform, scaleTransform, translateTransform } from "@/core/canvas.ts";

export const isFlipped = new Uint8Array(MAX_ENTITIES);

export function setEntityTransform(i: number, inWorld: boolean) {
  resetTransform();
  if (inWorld) {
    addCameraTransform();
  }
  translateTransform(posX[i], posY[i]);
  if (anim[i]) {
    translateTransform(animX[i], animY[i]);
    scaleTransform(animScaleX[i], animScaleY[i]);
  }
  if (isFlipped[i]) {
    scaleTransform(-1, 1);
  }
}
