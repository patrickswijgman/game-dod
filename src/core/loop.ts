import { TARGET_FRAME_TIME } from "@/consts.ts";

let last = 0;
let now = 0;
let delta = 0;
let time = 0;
let elapsed = 0;
let frames = 0;
let framesTime = 0;
let fps = 0;

export function start(update: () => void) {
  last = performance.now();
  now = performance.now();

  const tick = () => {
    last = now;
    now = performance.now();

    time = now - last;
    delta = time / TARGET_FRAME_TIME;
    elapsed += time;

    frames++;
    framesTime += time;
    if (framesTime >= 1000) {
      fps = frames;
      frames = 0;
      framesTime = 0;
    }

    update();
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

export function getDelta() {
  return delta;
}

export function getTime() {
  return time;
}

export function getFramesPerSecond() {
  return fps;
}
