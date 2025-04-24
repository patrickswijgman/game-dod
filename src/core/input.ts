const UP = "KeyW";
const DOWN = "KeyS";
const LEFT = "KeyA";
const RIGHT = "KeyD";

export let isUpHeld = false;
export let isDownHeld = false;
export let isLeftHeld = false;
export let isRightHeld = false;

window.addEventListener("keydown", ({ code }) => {
  switch (code) {
    case UP:
      isUpHeld = true;
      break;
    case DOWN:
      isDownHeld = true;
      break;
    case LEFT:
      isLeftHeld = true;
      break;
    case RIGHT:
      isRightHeld = true;
      break;
  }
});

window.addEventListener("keyup", ({ code }) => {
  switch (code) {
    case UP:
      isUpHeld = false;
      break;
    case DOWN:
      isDownHeld = false;
      break;
    case LEFT:
      isLeftHeld = false;
      break;
    case RIGHT:
      isRightHeld = false;
      break;
  }
});
