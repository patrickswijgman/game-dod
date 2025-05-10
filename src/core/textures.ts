import { MAX_TEXTURES } from "@/consts.ts";

export const textures = new Array<CanvasImageSource>(MAX_TEXTURES);

export async function loadTexture(id: number, url: string) {
  const img = new Image();
  img.src = url;
  await img.decode();
  textures[id] = img;
}
