import { Color, Texture, WIDTH } from "@/consts.ts";
import { font } from "@/core/font.ts";
import { textures } from "@/core/textures.ts";

const aspect = window.screen.width / window.screen.height;
const width = WIDTH;
const height = width / aspect;

export const canvas = document.createElement("canvas");
export const ctx = canvas.getContext("2d")!;
export const scale = window.screen.height / height;

export function resetTransform() {
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

export function translateTransform(x: number, y: number) {
  ctx.translate(x, y);
}

export function scaleTransform(x: number, y = x) {
  ctx.scale(x, y);
}

export function clearBackground() {
  drawRect(0, 0, width, height, Color.BG, true);
}

export function drawSprite(t: Texture, x: number, y: number, w: number, h: number, px: number, py: number) {
  ctx.drawImage(textures[t], x, y, w, h, -px, -py, w, h);
}

export function drawText(s: string, x: number, y: number, color = Color.TEXT, align: CanvasTextAlign = "left", baseline: CanvasTextBaseline = "top") {
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillStyle = color;
  ctx.fillText(s, x, y);
}

export function drawRect(x: number, y: number, w: number, h: number, color: string, filled: boolean) {
  if (filled) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  } else {
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
  }
}

export function setAlpha(a: number) {
  ctx.globalAlpha = a;
}

export function getWidth() {
  return canvas.width / scale;
}

export function getHeight() {
  return canvas.height / scale;
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
