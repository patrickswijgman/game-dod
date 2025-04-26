import { setCameraPosition, updateCamera } from "@/core/camera.ts";
import { clearBackground, drawText, resetTransform, scaleTransform, translateTransform } from "@/core/canvas.ts";
import { loadFont } from "@/core/font.ts";
import { delta, fps, start } from "@/core/loop.ts";
import { loadTexture } from "@/core/texture.ts";
import { addVector } from "@/core/vector.ts";
import { newPlayer, updatePlayer } from "@/entities/player.ts";
import { posX, posY, Type, type, velX, velY } from "@/lib/entity.ts";
import { entities } from "@/lib/game.ts";

async function setup() {
  await loadTexture("textures/atlas.png");
  await loadFont("fonts/pixelmix.ttf");

  newPlayer(20, 20);
  setCameraPosition(20, 20);
}

function update() {
  resetTransform();
  clearBackground("gray");

  entities.sort(sortEntities);

  for (const i of entities) {
    switch (type[i]) {
      case Type.PLAYER:
        updatePlayer(i);
        updateCamera(posX[i], posY[i]);
        break;
    }

    addVector(i, posX, posY, i, velX, velY, delta);
  }

  resetTransform();
  translateTransform(2, 2);
  scaleTransform(0.5);
  drawText(fps.toString(), 0, 0);
}

function sortEntities(i: number, j: number) {
  return posY[i] - posY[j];
}

async function run() {
  await setup();
  start(update);
}

run();
