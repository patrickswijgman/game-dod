import { Input } from "@/consts.ts";
import { cameraX, cameraY } from "@/core/camera.ts";
import { canvas, scale } from "@/core/canvas.ts";

const inputsDown = new Map<string, boolean>();
const inputsPressed = new Map<string, boolean>();
const inputsReleased = new Map<string, boolean>();

export let pointerX = 0;
export let pointerY = 0;
export let pointerWorldX = 0;
export let pointerWorldY = 0;

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

function updatePointerPosition(x: number, y: number) {
  pointerX = x / scale;
  pointerY = y / scale;
  updatePointerWorldPosition();
}

function updatePointerWorldPosition() {
  pointerWorldX = pointerX + cameraX;
  pointerWorldY = pointerY + cameraY;
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
