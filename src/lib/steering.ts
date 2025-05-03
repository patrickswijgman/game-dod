import { getDelta } from "@/core/loop.ts";
import { distance } from "@/core/utils.ts";
import { posX, posY } from "@/data/entity.ts";

export function seek(i: number, x: number, y: number, speed: number) {
  const dx = x - posX[i];
  const dy = y - posY[i];
  const d = distance(0, 0, dx, dy);

  if (d) {
    const vx = (dx / d) * speed;
    const vy = (dy / d) * speed;
    const v = distance(0, 0, vx, vy);

    if (v) {
      posX[i] += vx * getDelta();
      posY[i] += vy * getDelta();
      return v;
    }
  }

  return 0;
}
