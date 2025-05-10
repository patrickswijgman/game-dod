import { Anim, anim } from "@/components/animation.ts";
import { State, state, stateNext, transitionState } from "@/components/state.ts";
import { isActive, Type, type } from "@/components/base.ts";
import { clearBackground, drawText, resetTransform, scaleTransform, setAlpha, translateTransform } from "@/core/canvas.ts";
import { cleanupDestroyedEntities, entities, playerIdx } from "@/data/game.ts";
import { fps, start } from "@/core/loop.ts";
import { loadFont } from "@/core/font.ts";
import { loadTexture } from "@/core/textures.ts";
import { newPlayer, renderPlayer } from "@/entities/player.ts";
import { posX, posY } from "@/components/position.ts";
import { setCameraPosition, updateCamera } from "@/core/camera.ts";
import { updateBreathAnimation } from "@/anims/breath.ts";
import { updateInputs } from "@/core/input.ts";
import { updatePlayerState } from "@/states/player.ts";
import { updateWalkAnimation } from "@/anims/walk.ts";
import { Texture } from "@/consts.ts";

async function setup() {
  await Promise.all([
    // Textures
    loadTexture(Texture.ATLAS, "textures/atlas.png"),

    // Fonts
    loadFont("fonts/pixelmix.ttf"),

    // Sounds
  ]);

  newPlayer(20, 20);

  setCameraPosition(20, 20);
}

function update() {
  resetTransform();
  clearBackground();
  updateInputs();

  entities.sort(sortEntitiesOnDepth);

  for (const i of entities) {
    if (!isActive[i]) {
      continue;
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

    switch (type[i]) {
      case Type.PLAYER:
        renderPlayer(i);
        break;
    }
  }

  cleanupDestroyedEntities();

  resetTransform();
  translateTransform(1, 1);
  scaleTransform(0.25);
  setAlpha(0.5);
  drawText(fps.toString(), 0, 0);
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
