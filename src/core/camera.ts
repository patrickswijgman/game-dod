import { getHeight, getWidth, translateTransform } from "@/core/canvas.ts";
import { delta } from "@/core/loop.ts";
import { distance } from "@/core/utils.ts";

let x = 0;
let y = 0;

export function setCameraPosition(targetX: number, targetY: number) {
  x = targetX - getWidth() / 2;
  y = targetY - getHeight() / 2;
}

export function updateCamera(targetX: number, targetY: number) {
  const tx = targetX - getWidth() / 2;
  const ty = targetY - getHeight() / 2;
  const dx = tx - x;
  const dy = ty - y;
  const d = distance(0, 0, dx, dy);
  const vx = dx * 0.1 * delta;
  const vy = dy * 0.1 * delta;
  const v = distance(0, 0, vx, vy);
  if (v > d) {
    x += (vx / v) * d;
    y += (vy / v) * d;
  } else {
    x += vx;
    y += vy;
  }
}

export function addCameraTransform() {
  translateTransform(-x, -y);
}
