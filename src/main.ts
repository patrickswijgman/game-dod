import { updateBreathAnimation } from "@/anims/breath.ts";
import { updateWalkAnimation } from "@/anims/walk.ts";
import { Color } from "@/consts.ts";
import { setCameraPosition, updateCamera } from "@/core/camera.ts";
import { clearBackground, drawText, resetTransform, scaleTransform, translateTransform } from "@/core/canvas.ts";
import { loadFont } from "@/core/font.ts";
import { updateInputs } from "@/core/input.ts";
import { delta, fps, start } from "@/core/loop.ts";
import { loadTexture } from "@/core/texture.ts";
import { addVector } from "@/core/vector.ts";
import { newPlayer, updatePlayer } from "@/entities/player.ts";
import { Anim, anim, posX, posY, state, stateNext, transitionState, Type, type, velX, velY } from "@/lib/entity.ts";
import { getEntities, sortEntities } from "@/lib/game.ts";

async function setup() {
  await loadTexture("textures/atlas.png");
  await loadFont("fonts/pixelmix.ttf");

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
        updatePlayer(i);
        updateCamera(posX[i], posY[i]);
        break;
    }

    if (stateNext[i] !== state[i]) {
      switch (state[i]) {
      }

      transitionState(i);

      switch (state[i]) {
      }
    }

    switch (state[i]) {
    }

    switch (anim[i]) {
      case Anim.BREATH:
        updateBreathAnimation(i);
        break;
      case Anim.WALK:
        updateWalkAnimation(i);
        break;
    }

    addVector(i, posX, posY, i, velX, velY, delta);
  }

  resetTransform();
  translateTransform(2, 2);
  scaleTransform(0.5);
  drawText(fps.toString(), 0, 0, Color.TEXT, "left", "top");
}

function sortEntitiesOnDepth(a: number, b: number) {
  return posY[a] - posY[b];
}

async function run() {
  await setup();
  start(update);
}

run();
