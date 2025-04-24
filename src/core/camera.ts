import { g_height, g_width, xf_translate } from "@/core/canvas.ts";
import { delta } from "@/core/loop.ts";
import { distance } from "@/core/utils.ts";

let x = 0;
let y = 0;

export function cam_set(targetX: number, targetY: number) {
  x = targetX - g_width() / 2;
  y = targetY - g_height() / 2;
}

export function cam_update(targetX: number, targetY: number) {
  const tx = targetX - g_width() / 2;
  const ty = targetY - g_height() / 2;
  const dx = tx - x;
  const dy = ty - y;
  const d = distance(0, 0, dx, dy);
  const vx = dx * 0.1 * delta;
  const vy = dy * 0.1 * delta;
  const v = distance(0, 0, vx, vy);
  if (v < d) {
    x += vx;
    y += vy;
  }
}

export function cam_translate() {
  xf_translate(-x, -y);
}
