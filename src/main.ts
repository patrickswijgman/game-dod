import { updateBreathAnimation } from "@/anims/breath.ts";
import { updateWalkAnimation } from "@/anims/walk.ts";
import { Color, Input } from "@/consts.ts";
import { setCameraPosition, updateCamera } from "@/core/camera.ts";
import { clearBackground, drawText, resetTransform, scaleTransform, translateTransform } from "@/core/canvas.ts";
import { loadFont } from "@/core/font.ts";
import { setBinding, updateInputs } from "@/core/input.ts";
import { getDelta, getFramesPerSecond, start } from "@/core/loop.ts";
import { loadTexture } from "@/core/texture.ts";
import { addVector } from "@/core/vector.ts";
import { newPlayer } from "@/entities/player.ts";
import { Anim, anim, posX, posY, State, state, stateNext, transitionState, Type, type, velX, velY } from "@/lib/entity.ts";
import { getEntities, sortEntities } from "@/lib/game.ts";
import { updatePlayerState } from "@/states/player.ts";

async function setup() {
  await Promise.all([
    // Textures
    loadTexture("textures/atlas.png"),

    // Fonts
    loadFont("fonts/pixelmix.ttf"),

    // Sounds
  ]);

  setBinding(Input.UP, "KeyW");
  setBinding(Input.DOWN, "KeyS");
  setBinding(Input.LEFT, "KeyA");
  setBinding(Input.RIGHT, "KeyD");

  newPlayer(20, 20);
  setCameraPosition(20, 20);
}

function update() {
  resetTransform();
  clearBackground();
  updateInputs();
  sortEntities(sortEntitiesOnDepth);

  for (const i of getEntities()) {
    switch (type[i]) {
      case Type.PLAYER:
        updateCamera(posX[i], posY[i]);
        break;
    }

    if (stateNext[i] !== state[i]) {
      transitionState(i);
    }

    switch (state[i]) {
      case State.PLAYER:
        updatePlayerState(i);
        break;
    }

    switch (anim[i]) {
      case Anim.BREATH:
        updateBreathAnimation(i);
        break;
      case Anim.WALK:
        updateWalkAnimation(i);
        break;
    }

    addVector(i, posX, posY, i, velX, velY, getDelta());
  }

  resetTransform();
  translateTransform(2, 2);
  scaleTransform(0.5);
  drawText(getFramesPerSecond().toString(), 0, 0, Color.TEXT, "left", "top");
}

function sortEntitiesOnDepth(a: number, b: number) {
  return posY[a] - posY[b];
}

async function run() {
  await setup();
  start(update);
}

run();
