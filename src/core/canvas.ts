import { font } from "@/core/font.ts";
import { texture } from "@/core/texture.ts";

export const ASPECT_RATIO = window.screen.width / window.screen.height;
export const WIDTH = 320;
export const HEIGHT = WIDTH / ASPECT_RATIO;
export const SCALE = window.screen.width / WIDTH;

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d")!;

export function xf_reset() {
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
}

export function xf_translate(x: number, y: number) {
  ctx.translate(x, y);
}

export function xf_scale(x: number, y = x) {
  ctx.scale(x, y);
}

export function g_clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function g_sprite(x: number, y: number, w: number, h: number, px = 0, py = 0) {
  ctx.drawImage(texture, x, y, w, h, -px, -py, w, h);
}

export function g_text(s: string, x: number, y: number, color = "white", align: CanvasTextAlign = "left", baseline: CanvasTextBaseline = "top") {
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillStyle = color;
  ctx.fillText(s, x, y);
}

export function g_rect(x: number, y: number, w: number, h: number, color = "white", filled = true) {
  if (filled) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  } else {
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
  }
}

export function g_width() {
  return canvas.width / SCALE;
}

export function g_height() {
  return canvas.height / SCALE;
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.imageSmoothingEnabled = false;
  ctx.textRendering = "optimizeSpeed";
}

resize();
window.addEventListener("resize", resize);
document.body.appendChild(canvas);
