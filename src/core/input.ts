import { Input } from "@/consts.ts";
import { getCameraX, getCameraY } from "@/core/camera.ts";
import { getCanvas, getScale } from "@/core/canvas.ts";

const inputsDown = new Map<string, boolean>();
const inputsPressed = new Map<string, boolean>();
const inputsReleased = new Map<string, boolean>();

let pointerX = 0;
let pointerY = 0;
let pointerWorldX = 0;
let pointerWorldY = 0;

const canvas = getCanvas();

export function updateInputs() {
  updatePointerWorldPosition();
  inputsPressed.clear();
  inputsReleased.clear();
}

export function setInput(i: string, state: boolean) {
  inputsDown.set(i, state);
  inputsPressed.set(i, state);
  inputsReleased.set(i, !state);
}

export function isInputDown(i: Input) {
  return inputsDown.get(i);
}

export function isInputPressed(i: Input) {
  return inputsPressed.get(i);
}

export function isInputReleased(i: Input) {
  return inputsReleased.get(i);
}

export function getPointerX() {
  return pointerX;
}

export function getPointerY() {
  return pointerY;
}

export function getPointerWorldX() {
  return pointerWorldX;
}

export function getPointerWorldY() {
  return pointerWorldY;
}

function updatePointerPosition(x: number, y: number) {
  pointerX = x / getScale();
  pointerY = y / getScale();
  updatePointerWorldPosition();
}

function updatePointerWorldPosition() {
  pointerWorldX = pointerX + getCameraX();
  pointerWorldY = pointerY + getCameraY();
}

window.addEventListener("keydown", ({ code, repeat }) => {
  if (repeat) return;
  setInput(code, true);
});

window.addEventListener("keyup", ({ code }) => {
  setInput(code, false);
});

canvas.addEventListener("pointerdown", ({ clientX, clientY, button }) => {
  updatePointerPosition(clientX, clientY);
  setInput(button.toString(), true);
});

canvas.addEventListener("pointerup", ({ clientX, clientY, button }) => {
  updatePointerPosition(clientX, clientY);
  setInput(button.toString(), false);
});

canvas.addEventListener("pointermove", ({ clientX, clientY }) => {
  updatePointerPosition(clientX, clientY);
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
