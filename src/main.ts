import { updateBreathAnimation } from "@/anims/breath.ts";
import { updateWalkAnimation } from "@/anims/walk.ts";
import { Color } from "@/consts.ts";
import { setCameraPosition, setCameraSmoothing, updateCamera } from "@/core/camera.ts";
import { clearBackground, drawText, resetTransform, scaleTransform, setAlpha, translateTransform } from "@/core/canvas.ts";
import { loadFont } from "@/core/font.ts";
import { updateInputs } from "@/core/input.ts";
import { getFramesPerSecond, start } from "@/core/loop.ts";
import { loadTexture } from "@/core/texture.ts";
import { newPlayer, renderPlayer } from "@/entities/player.ts";
import { Anim, anim, posX, posY, State, state, stateNext, transitionState, Type, type } from "@/data/entity.ts";
import { getEntities, getPlayer, sortEntities } from "@/data/game.ts";
import { updatePlayerState } from "@/states/player.ts";

async function setup() {
  await Promise.all([
    // Textures
    loadTexture("textures/atlas.png"),

    // Fonts
    loadFont("fonts/pixelmix.ttf"),

    // Sounds
  ]);

  newPlayer(20, 20);

  setCameraPosition(20, 20);
  setCameraSmoothing(0.1);
}

function update() {
  resetTransform();
  clearBackground();
  updateInputs();
  sortEntities(sortEntitiesOnDepth);

  for (const i of getEntities()) {
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

    switch (type[i]) {
      case Type.PLAYER:
        renderPlayer(i);
        break;
    }
  }

  const i = getPlayer();
  updateCamera(posX[i], posY[i]);

  resetTransform();
  translateTransform(1, 1);
  scaleTransform(0.25);
  setAlpha(0.5);
  drawText(getFramesPerSecond().toString(), 0, 0, Color.TEXT, "left", "top");
  setAlpha(1);
}

function sortEntitiesOnDepth(a: number, b: number) {
  return posY[a] - posY[b];
}

async function run() {
  await setup();
  start(update);
}

run();
