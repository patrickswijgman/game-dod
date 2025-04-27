import { Input, MAX_INPUTS, SCALE } from "@/consts.ts";
import { getCameraX, getCameraY } from "@/core/camera.ts";
import { getCanvas } from "@/core/canvas.ts";

type Binding = string | number;

const inputsDown = new Uint8Array(MAX_INPUTS);
const inputsPressed = new Uint8Array(MAX_INPUTS);
const inputsReleased = new Uint8Array(MAX_INPUTS);
const bindings = new Array<Binding>(MAX_INPUTS);

let pointerX = 0;
let pointerY = 0;
let pointerWorldX = 0;
let pointerWorldY = 0;

const canvas = getCanvas();

export function setInput(i: Input, state: boolean) {
  inputsDown[i] = state ? 1 : 0;
  inputsPressed[i] = state ? 1 : 0;
  inputsReleased[i] = state ? 0 : 1;
}

export function setBinding(i: Input, b: string) {
  bindings[i] = b;
}

export function updateInputs() {
  updatePointerWorldPosition();
  inputsPressed.fill(0);
  inputsReleased.fill(0);
}

export function isInputDown(i: Input) {
  return inputsDown[i] === 1;
}

export function isInputPressed(i: Input) {
  return inputsPressed[i] === 1;
}

export function isInputReleased(i: Input) {
  return inputsReleased[i] === 1;
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
  pointerX = x / SCALE;
  pointerY = y / SCALE;
  updatePointerWorldPosition();
}

function updatePointerWorldPosition() {
  pointerWorldX = pointerX + getCameraX();
  pointerWorldY = pointerY + getCameraY();
}

function onKeyEvent(code: string, state: boolean) {
  for (let i = 0; i < bindings.length; i++) {
    if (code === bindings[i]) {
      setInput(i, state);
    }
  }
}

function onPointerEvent(button: number, state: boolean) {
  for (let i = 0; i < bindings.length; i++) {
    if (button === bindings[i]) {
      setInput(i, state);
    }
  }
}

window.addEventListener("keydown", ({ code, repeat }) => {
  if (repeat) return;
  onKeyEvent(code, true);
});

window.addEventListener("keyup", ({ code }) => {
  onKeyEvent(code, false);
});

canvas.addEventListener("pointerdown", ({ clientX, clientY, button }) => {
  updatePointerPosition(clientX, clientY);
  onPointerEvent(button, true);
});

canvas.addEventListener("pointerup", ({ clientX, clientY, button }) => {
  updatePointerPosition(clientX, clientY);
  onPointerEvent(button, false);
});

canvas.addEventListener("pointermove", ({ clientX, clientY }) => {
  updatePointerPosition(clientX, clientY);
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
