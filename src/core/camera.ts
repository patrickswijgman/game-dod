import { getHeight, getWidth, translateTransform } from "@/core/canvas.ts";
import { getDelta } from "@/core/loop.ts";
import { pythagoras } from "@/core/utils.ts";

let x = 0;
let y = 0;
let smoothing = 1;

export function updateCamera(targetX: number, targetY: number) {
  const tx = targetX - getWidth() / 2;
  const ty = targetY - getHeight() / 2;
  const dx = tx - x;
  const dy = ty - y;
  const d = pythagoras(dx, dy);
  const vx = dx * smoothing * getDelta();
  const vy = dy * smoothing * getDelta();
  const v = pythagoras(vx, vy);
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

export function setCameraPosition(targetX: number, targetY: number) {
  x = targetX - getWidth() / 2;
  y = targetY - getHeight() / 2;
}

export function setCameraSmoothing(s: number) {
  smoothing = s;
}

export function getCameraX() {
  return x;
}

export function getCameraY() {
  return y;
}
