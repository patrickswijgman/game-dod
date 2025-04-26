import { basename } from "@/core/utils.ts";

export let font: string;

export async function loadFont(url: string) {
  const family = basename(url, true);
  const ff = new FontFace(family, `url(${url})`);
  await ff.load();
  document.fonts.add(ff);
  font = `8px ${family}`;
}
