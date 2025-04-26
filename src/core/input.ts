import { SCALE } from "@/consts.ts";
import { getCameraX, getCameraY } from "@/core/camera.ts";
import { getCanvas } from "@/core/canvas.ts";

export const enum Input {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  LMB,
  RMB,
  MAX,
}

const enum Pointer {
  X,
  Y,
  WORLD_X,
  WORLD_Y,
  MAX,
}

const inputsDown = new Uint8Array(Input.MAX);
const inputsPressed = new Uint8Array(Input.MAX);
const pointer = new Float32Array(Pointer.MAX);

const canvas = getCanvas();

export function setInput(i: Input, state: number) {
  inputsDown[i] = state;
  inputsPressed[i] = state;
}

export function updateInputs() {
  updatePointerWorldPosition();
  inputsPressed.fill(0);
}

export function isInputDown(i: Input) {
  return inputsDown[i] === 1;
}

export function isInputPressed(i: Input) {
  return inputsPressed[i] === 1;
}

function updatePointerPosition(x: number, y: number) {
  pointer[Pointer.X] = x / SCALE;
  pointer[Pointer.Y] = y / SCALE;
  updatePointerWorldPosition();
}

function updatePointerWorldPosition() {
  pointer[Pointer.WORLD_X] = pointer[Pointer.X] + getCameraX();
  pointer[Pointer.WORLD_Y] = pointer[Pointer.Y] + getCameraY();
}

function onKeyEvent(code: string, state: number) {
  switch (code) {
    case "KeyW":
      setInput(Input.UP, state);
      break;
    case "KeyS":
      setInput(Input.DOWN, state);
      break;
    case "KeyA":
      setInput(Input.LEFT, state);
      break;
    case "KeyD":
      setInput(Input.RIGHT, state);
      break;
  }
}

function onPointerEvent(button: number, state: number) {
  switch (button) {
    case 0:
      setInput(Input.LMB, state);
      break;
    case 2:
      setInput(Input.RMB, state);
      break;
  }
}

window.addEventListener("keydown", ({ code }) => {
  onKeyEvent(code, 1);
});

window.addEventListener("keyup", ({ code }) => {
  onKeyEvent(code, 0);
});

canvas.addEventListener("pointerdown", ({ clientX, clientY, button }) => {
  updatePointerPosition(clientX, clientY);
  onPointerEvent(button, 1);
});

canvas.addEventListener("pointerup", ({ clientX, clientY, button }) => {
  updatePointerPosition(clientX, clientY);
  onPointerEvent(button, 0);
});

canvas.addEventListener("pointermove", ({ clientX, clientY }) => {
  updatePointerPosition(clientX, clientY);
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
