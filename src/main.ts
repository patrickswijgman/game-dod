import { cam_set, cam_update } from "@/core/camera.ts";
import { g_clear, g_rect, g_text, HEIGHT, WIDTH, xf_reset, xf_scale, xf_translate } from "@/core/canvas.ts";
import { res_loadFont } from "@/core/font.ts";
import { delta, fps, start } from "@/core/loop.ts";
import { res_loadTexture } from "@/core/texture.ts";
import { v_add } from "@/core/vector.ts";
import { e_newPlayer, e_updatePlayer } from "@/entities/player.ts";
import { e_x, e_y, Type, e_type, e_velX, e_velY } from "@/lib/entity.ts";
import { entities } from "@/lib/game.ts";

async function setup() {
  await res_loadTexture("textures/atlas.png");
  await res_loadFont("fonts/pixelmix.ttf");

  e_newPlayer(20, 20);
  cam_set(20, 20);
}

function update() {
  xf_reset();
  g_clear();
  g_rect(0, 0, WIDTH, HEIGHT, "gray");

  entities.sort(sortEntities);

  for (const i of entities) {
    switch (e_type[i]) {
      case Type.PLAYER:
        e_updatePlayer(i);
        cam_update(e_x[i], e_y[i]);
        break;
    }

    v_add(i, e_x, e_y, i, e_velX, e_velY, delta);
  }

  xf_reset();
  xf_translate(2, 2);
  xf_scale(0.5);
  g_text(fps.toString(), 0, 0);
}

function sortEntities(i: number, j: number) {
  return e_y[i] - e_y[j];
}

async function run() {
  await setup();
  start(update);
}

run();
