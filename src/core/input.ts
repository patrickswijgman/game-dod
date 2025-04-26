import { SCALE } from "@/consts.ts";
import { cameraX, cameraY } from "@/core/camera.ts";
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

export const enum Pointer {
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
  pointer[Pointer.WORLD_X] = pointer[Pointer.X] + cameraX;
  pointer[Pointer.WORLD_Y] = pointer[Pointer.Y] + cameraY;
}

window.addEventListener("keydown", ({ code }) => {
  switch (code) {
    case "KeyW":
      inputsDown[Input.UP] = 1;
      inputsPressed[Input.UP] = 1;
      break;
    case "KeyS":
      inputsDown[Input.DOWN] = 1;
      inputsPressed[Input.DOWN] = 1;
      break;
    case "KeyA":
      inputsDown[Input.LEFT] = 1;
      inputsPressed[Input.LEFT] = 1;
      break;
    case "KeyD":
      inputsDown[Input.RIGHT] = 1;
      inputsPressed[Input.RIGHT] = 1;
      break;
  }
});

window.addEventListener("keyup", ({ code }) => {
  switch (code) {
    case "KeyW":
      inputsDown[Input.UP] = 0;
      inputsPressed[Input.UP] = 0;
      break;
    case "KeyS":
      inputsDown[Input.DOWN] = 0;
      inputsPressed[Input.DOWN] = 0;
      break;
    case "KeyA":
      inputsDown[Input.LEFT] = 0;
      inputsPressed[Input.LEFT] = 0;
      break;
    case "KeyD":
      inputsDown[Input.RIGHT] = 0;
      inputsPressed[Input.RIGHT] = 0;
      break;
  }
});

canvas.addEventListener("pointerdown", ({ clientX, clientY, button }) => {
  updatePointerPosition(clientX, clientY);
  switch (button) {
    case 0:
      inputsDown[Input.LMB] = 1;
      inputsPressed[Input.LMB] = 1;
      break;
    case 2:
      inputsDown[Input.RMB] = 1;
      inputsPressed[Input.RMB] = 1;
      break;
  }
});

canvas.addEventListener("pointerup", ({ clientX, clientY, button }) => {
  updatePointerPosition(clientX, clientY);
  switch (button) {
    case 0:
      inputsDown[Input.LMB] = 0;
      inputsPressed[Input.LMB] = 0;
      break;
    case 2:
      inputsDown[Input.RMB] = 0;
      inputsPressed[Input.RMB] = 0;
      break;
  }
});

canvas.addEventListener("pointermove", ({ clientX, clientY }) => {
  updatePointerPosition(clientX, clientY);
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
