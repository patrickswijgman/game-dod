import { getHeight, getWidth, translateTransform } from "@/core/canvas.ts";
import { delta } from "@/core/loop.ts";
import { distance } from "@/core/utils.ts";

export let cameraX = 0;
export let cameraY = 0;

export function updateCamera(targetX: number, targetY: number) {
  const tx = targetX - getWidth() / 2;
  const ty = targetY - getHeight() / 2;
  const dx = tx - cameraX;
  const dy = ty - cameraY;
  const d = distance(0, 0, dx, dy);
  const vx = dx * 0.1 * delta;
  const vy = dy * 0.1 * delta;
  const v = distance(0, 0, vx, vy);
  if (v > d) {
    cameraX += (vx / v) * d;
    cameraY += (vy / v) * d;
  } else {
    cameraX += vx;
    cameraY += vy;
  }
}

export function addCameraTransform() {
  translateTransform(-cameraX, -cameraY);
}

export function setCameraPosition(targetX: number, targetY: number) {
  cameraX = targetX - getWidth() / 2;
  cameraY = targetY - getHeight() / 2;
}
