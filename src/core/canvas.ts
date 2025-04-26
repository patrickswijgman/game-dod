import { font } from "@/core/font.ts";
import { texture } from "@/core/texture.ts";

const ASPECT_RATIO = window.screen.width / window.screen.height;
const WIDTH = 320;
const HEIGHT = WIDTH / ASPECT_RATIO;
const SCALE = window.screen.height / HEIGHT;

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d")!;

export function resetTransform() {
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
}

export function translateTransform(x: number, y: number) {
  ctx.translate(x, y);
}

export function scaleTransform(x: number, y = x) {
  ctx.scale(x, y);
}

export function clearBackground(color: string) {
  drawRect(0, 0, WIDTH, HEIGHT, color);
}

export function drawSprite(x: number, y: number, w: number, h: number, px = 0, py = 0) {
  ctx.drawImage(texture, x, y, w, h, -px, -py, w, h);
}

export function drawText(s: string, x: number, y: number, color = "white", align: CanvasTextAlign = "left", baseline: CanvasTextBaseline = "top") {
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillStyle = color;
  ctx.fillText(s, x, y);
}

export function drawRect(x: number, y: number, w: number, h: number, color = "white", filled = true) {
  if (filled) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  } else {
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
  }
}

export function getWidth() {
  return canvas.width / SCALE;
}

export function getHeight() {
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
