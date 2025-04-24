export let texture: CanvasImageSource;

export async function res_loadTexture(url: string) {
  const img = new Image();
  img.src = url;
  await img.decode();
  texture = img;
}
